#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DnsStack } from '../lib/stacks/dns-stack';
import { FrontendStack } from '../lib/stacks/frontend-stack';

const app = new cdk.App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const dns = new DnsStack(app, 'P14DnsStack', { env });

new FrontendStack(app, 'P14FrontendStack', { env, hostedZone: dns.hostedZone });
