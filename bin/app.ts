#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DnsStack } from '../lib/stacks/dns-stack';
import { FrontendStack } from '../lib/stacks/frontend-stack';
import { PipelineStack } from '../lib/stacks/pipeline-stack';

const app = new cdk.App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const dns = new DnsStack(app, 'P14DnsStack', { env });

const frontend = new FrontendStack(app, 'P14FrontendStack', { env, hostedZone: dns.hostedZone });

new PipelineStack(app, 'P14PipelineStack', { env, frontendStack: frontend });
