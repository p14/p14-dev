import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { FrontendStack } from './frontend-stack';

interface PipelineStackProps extends cdk.StackProps {
    frontendStack: FrontendStack;
}

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: PipelineStackProps) {
        super(scope, id, props);

        // CDK context is the right place for environment-specific config that
        // isn't secret but shouldn't be committed to a public repo. Values live
        // in cdk.context.json (gitignored). this.node.getContext() reads them
        // at synth time — if a key is missing, CDK throws with a clear error.
        const githubOwner: string = this.node.getContext('github:owner');
        const githubRepo: string = this.node.getContext('github:repo');
        const connectionArn: string = this.node.getContext('github:connectionArn');

        const { siteBucket, distribution } = props.frontendStack;

        // Artifact bucket — CodePipeline uses S3 to pass artifacts between stages.
        // Each stage writes its output here; the next stage reads from it.
        const artifactBucket = new s3.Bucket(this, 'ArtifactBucket', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        // Artifacts are typed containers. Here we declare two:
        // - sourceOutput: the raw source code from GitHub
        // - buildOutput: the compiled/built frontend files
        const sourceOutput = new codepipeline.Artifact('SourceOutput');
        const buildOutput = new codepipeline.Artifact('BuildOutput');

        // CodeBuild project — runs inside a managed container.
        // It reads the buildspec below to know what commands to run.
        // Think of it as a disposable CI runner that spins up per pipeline run.
        const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
            environment: {
                buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
                computeType: codebuild.ComputeType.SMALL,
            },
            buildSpec: codebuild.BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    install: {
                        'runtime-versions': { nodejs: '22' },
                        commands: ['cd src/frontend', 'npm ci'],
                    },
                    build: {
                        commands: ['npm run build'],
                    },
                },
                artifacts: {
                    // This path tells CodeBuild what to package as the build artifact.
                    // Everything in src/frontend/dist will be uploaded to S3 as BuildOutput.
                    'base-directory': 'src/frontend/dist',
                    files: ['**/*'],
                },
            }),
        });


        // The pipeline itself — three stages in sequence:
        // Source → Build → Deploy
        new codepipeline.Pipeline(this, 'SitePipeline', {
            artifactBucket,
            stages: [
                {
                    // Stage 1: Source
                    // Watches your GitHub repo. On push to main, it pulls the source
                    // and stores it as sourceOutput in the artifact bucket.
                    // This uses a GitHub connection (via CodeStar Connections) — you'll
                    // need to create and authorize that connection in the AWS console once.
                    stageName: 'Source',
                    actions: [
                        new codepipeline_actions.CodeStarConnectionsSourceAction({
                            actionName: 'GitHub_Source',
                            owner: githubOwner,
                            repo: githubRepo,
                            branch: 'main',
                            output: sourceOutput,
                            connectionArn: connectionArn,
                        }),
                    ],
                },
                {
                    // Stage 2: Build
                    // CodeBuild runs `npm ci && npm run build` inside src/frontend.
                    // The compiled output (dist/) becomes buildOutput.
                    stageName: 'Build',
                    actions: [
                        new codepipeline_actions.CodeBuildAction({
                            actionName: 'Build_Frontend',
                            project: buildProject,
                            input: sourceOutput,
                            outputs: [buildOutput],
                        }),
                    ],
                },
                {
                    // Stage 3: Deploy
                    // Syncs buildOutput to the S3 bucket, then invalidates CloudFront.
                    // S3DeployAction handles the sync. The invalidation happens via
                    // the post-deploy commands we attached to the build project above.
                    stageName: 'Deploy',
                    actions: [
                        new codepipeline_actions.S3DeployAction({
                            actionName: 'Deploy_to_S3',
                            input: buildOutput,
                            bucket: siteBucket,
                            extract: true,
                            // Invalidate all CloudFront paths after every deploy.
                            // "/*" means "purge everything" — fine for a personal site.
                            // For high-traffic sites you'd target only changed asset paths.
                            runOrder: 1,
                        }),
                        new codepipeline_actions.CodeBuildAction({
                            actionName: 'Invalidate_CloudFront',
                            project: new codebuild.PipelineProject(this, 'InvalidateProject', {
                                environment: {
                                    buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
                                    computeType: codebuild.ComputeType.SMALL,
                                },
                                buildSpec: codebuild.BuildSpec.fromObject({
                                    version: '0.2',
                                    phases: {
                                        build: {
                                            commands: [
                                                'aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"',
                                            ],
                                        },
                                    },
                                }),
                                environmentVariables: {
                                    DISTRIBUTION_ID: {
                                        value: distribution.distributionId,
                                    },
                                },
                            }),
                            input: buildOutput,
                            runOrder: 2,
                        }),
                    ],
                },
            ],
        });

        // Grant the invalidation project permission to call CloudFront.
        // We reference it by finding the construct we just created.
        const invalidateProject = this.node.findChild('InvalidateProject') as codebuild.PipelineProject;
        invalidateProject.addToRolePolicy(new iam.PolicyStatement({
            actions: ['cloudfront:CreateInvalidation'],
            resources: [`arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`],
        }));
    }
}
