# Deployment Guide

## Prerequisites

| Tool | Check | Install |
|---|---|---|
| AWS CLI | `aws --version` | via package manager |
| CDK CLI | `cdk --version` | `npm install -g aws-cdk` |
| AWS credentials | `aws sts get-caller-identity` | `aws configure` |
| CDK bootstrapped | Check CloudFormation for `CDKToolkit` stack | `cdk bootstrap aws://ACCOUNT/REGION` |

Bootstrap is a one-time step per AWS account/region.

---

## Stack Overview

```
P14DnsStack         → Route 53 hosted zone for p14.app
    ↓
P14FrontendStack    → ACM cert, S3 bucket, CloudFront distribution, DNS records
```

---

## First-Time Setup

### 1. Install dependencies

```bash
npm install
cd src/frontend && npm install && cd ../..
```

### 2. Create `cdk.context.json`

This file is gitignored — create it manually on any new machine:

```json
{
  "domain:name": "p14.dev"
}
```

### 3. Deploy DNS

```bash
npm run deploy:dns
```

Copy the 4 nameserver values from the stack output and set them in Porkbun as your domain's nameservers.

### 4. Wait for DNS propagation

```bash
dig NS p14.app +short
```

When you see AWS nameservers (`ns-XXX.awsdns-XX.com`), propagation is complete (usually a few minutes to an hour).

### 5. Deploy the frontend stack

```bash
npm run deploy:frontend
```

This creates the ACM certificate (auto-validated via Route 53), S3 bucket, CloudFront distribution, and DNS A records. Certificate validation can take a few minutes.

Note the `SiteBucketName` and `DistributionDomain` from the outputs — you'll need these to push frontend builds.

---

## Deploying Frontend Changes

After making changes in `src/frontend/src/`:

```bash
# Build
cd src/frontend
npm run build
cd ../..

# Sync to S3 (replace BUCKET_NAME from cdk deploy output)
aws s3 sync src/frontend/dist/ s3://BUCKET_NAME --delete

# Invalidate CloudFront cache (replace DISTRIBUTION_ID from cdk deploy output)
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

---

## Deploying Infrastructure Changes

```bash
npm run diff            # preview what will change
npm run deploy:dns      # deploy DNS stack only
npm run deploy:frontend # deploy frontend stack only
npm run deploy          # deploy all stacks
```

---

## Useful Commands

```bash
# Preview CloudFormation templates without deploying
npm run synth

# Check your current AWS identity
aws sts get-caller-identity

# Check DNS propagation
dig NS p14.app +short

# Flush Mac DNS cache
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

---

## Troubleshooting

**Certificate validation hangs** — Make sure DNS has propagated before deploying `P14FrontendStack`. ACM needs to create CNAME records in the hosted zone, which requires Route 53 to be authoritative.

**Site shows stale content** — CloudFront cache invalidation may be needed:
```bash
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

**`cdk deploy` fails with credentials error** — Run `aws sts get-caller-identity` to verify your credentials are set up correctly.
