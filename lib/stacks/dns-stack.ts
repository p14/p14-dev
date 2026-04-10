import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export class DnsStack extends cdk.Stack {
    // Expose the hosted zone so FrontendStack can create records and validate certs against it
    public readonly hostedZone: route53.IHostedZone;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const domainName: string = this.node.getContext('domain:name');

        // A public hosted zone is the Route 53 concept of "I own this domain".
        // Creating it doesn't change anything yet — it just allocates 4 nameservers
        // that AWS manages. Your domain only resolves through Route 53 once you
        // update the nameservers at your registrar (Porkbun) to point here.
        this.hostedZone = new route53.PublicHostedZone(this, 'HostedZone', {
            zoneName: domainName,
        });

        this.addPurelyMailRecords();

        // After deploying this stack, copy these 4 nameservers into Porkbun.
        // The hosted zone won't be authoritative until you do.
        new cdk.CfnOutput(this, 'NameServers', {
            value: cdk.Fn.join(', ', this.hostedZone.hostedZoneNameServers!),
            description: 'Set these as your nameservers in Porkbun',
        });
    }

    // Purelymail email hosting records — migrated from CloudFlare zone export 2026-04-10.
    // These must be present in Route 53 BEFORE switching nameservers in Porkbun
    // so that email delivery is uninterrupted during the cutover.
    private addPurelyMailRecords(): void {
        const ttl = cdk.Duration.minutes(5);

        // Inbound mail routing
        new route53.MxRecord(this, 'MxRecord', {
            zone: this.hostedZone,
            values: [{ hostName: 'mailserver.purelymail.com.', priority: 10 }],
            ttl,
        });

        // Root TXT records — Route 53 requires all TXT values for the same name
        // to live in a single record set, so SPF and ownership proof are combined here.
        new route53.TxtRecord(this, 'RootTxtRecords', {
            zone: this.hostedZone,
            values: [
                'v=spf1 include:_spf.purelymail.com ~all',
                'purelymail_ownership_proof=beaa0d7195998118da362e0ff18824f790e69a40f65193e17f0078be8aa1243301f29937d74fa62c3d89ebd75b4713e43686f1c955bbf83e1033d38a82e8a978',
            ],
            ttl,
        });

        // DMARC — Purelymail hosts the DMARC policy via a CNAME to their root record
        new route53.CnameRecord(this, 'DmarcRecord', {
            zone: this.hostedZone,
            recordName: '_dmarc',
            domainName: 'dmarcroot.purelymail.com.',
            ttl,
        });

        // DKIM signing keys (3 selectors) — Purelymail rotates these via CNAMEs to their
        // key infrastructure so you never need to update individual keys here
        new route53.CnameRecord(this, 'DkimKey1', {
            zone: this.hostedZone,
            recordName: 'purelymail1._domainkey',
            domainName: 'key1.dkimroot.purelymail.com.',
            ttl,
        });

        new route53.CnameRecord(this, 'DkimKey2', {
            zone: this.hostedZone,
            recordName: 'purelymail2._domainkey',
            domainName: 'key2.dkimroot.purelymail.com.',
            ttl,
        });

        new route53.CnameRecord(this, 'DkimKey3', {
            zone: this.hostedZone,
            recordName: 'purelymail3._domainkey',
            domainName: 'key3.dkimroot.purelymail.com.',
            ttl,
        });
    }
}
