import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';

interface FrontendStackProps extends cdk.StackProps {
    hostedZone: route53.IHostedZone;
}

export class FrontendStack extends cdk.Stack {
    public readonly siteBucket: s3.Bucket;
    public readonly distribution: cloudfront.Distribution;

    constructor(scope: Construct, id: string, props: FrontendStackProps) {
        super(scope, id, props);

        const domainName: string = this.node.getContext('domain:name');
        const wwwDomain = `www.${domainName}`;

        // ACM certificate — must be in us-east-1 for CloudFront, regardless of
        // where your other resources live. This is a CloudFront constraint.
        // CertificateValidation.fromDns() automatically creates the required CNAME
        // records in Route 53 to prove domain ownership to Amazon's CA.
        // CDK waits for ACM to confirm validation before continuing the deploy.
        const certificate = new acm.Certificate(this, 'SiteCertificate', {
            domainName,
            subjectAlternativeNames: [wwwDomain],
            validation: acm.CertificateValidation.fromDns(props.hostedZone),
        });

        // S3 bucket — private, no public access
        // CloudFront will be the only entity that can read from it (via OAC below).
        // Never expose an S3 website endpoint directly — it bypasses CloudFront
        // caching and geo-restrictions, and you'd be paying for both.
        this.siteBucket = new s3.Bucket(this, 'SiteBucket', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
        });

        // CloudFront distribution
        // OAC (Origin Access Control) is the modern way to let CloudFront read from
        // a private S3 bucket. The older method (OAI) is being phased out.
        // The S3BucketOrigin.withOriginAccessControl() helper handles both the OAC
        // resource and the bucket policy grant in one call.
        this.distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
            defaultBehavior: {
                origin: origins.S3BucketOrigin.withOriginAccessControl(this.siteBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
            },
            // Attach the custom domain and certificate.
            // Without domainNames here, CloudFront would reject requests to p14.dev
            // even if DNS pointed there — it validates the Host header.
            domainNames: [domainName, wwwDomain],
            certificate,
            defaultRootObject: 'index.html',
            // SPA routing: if CloudFront gets a 403 (key not found in S3), serve
            // index.html with a 200 so React Router can handle the path client-side.
            errorResponses: [
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                },
            ],
        });

        // Route 53 alias records — point both apex and www at CloudFront.
        // An ALIAS record (Route 53-specific) behaves like a CNAME but is allowed
        // at the zone apex (p14.dev). Standard DNS forbids CNAMEs there.
        new route53.ARecord(this, 'ApexAliasRecord', {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(
                new targets.CloudFrontTarget(this.distribution)
            ),
        });

        new route53.ARecord(this, 'WwwAliasRecord', {
            zone: props.hostedZone,
            recordName: wwwDomain,
            target: route53.RecordTarget.fromAlias(
                new targets.CloudFrontTarget(this.distribution)
            ),
        });

        new cdk.CfnOutput(this, 'SiteUrl', {
            value: `https://${domainName}`,
            description: 'Live site URL',
        });

        new cdk.CfnOutput(this, 'DistributionDomain', {
            value: this.distribution.distributionDomainName,
            description: 'CloudFront distribution domain name',
        });

        new cdk.CfnOutput(this, 'SiteBucketName', {
            value: this.siteBucket.bucketName,
            description: 'S3 bucket holding the built frontend',
        });
    }
}
