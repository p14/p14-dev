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

        // After deploying this stack, copy these 4 nameservers into Porkbun.
        // The hosted zone won't be authoritative until you do.
        new cdk.CfnOutput(this, 'NameServers', {
            value: cdk.Fn.join(', ', this.hostedZone.hostedZoneNameServers!),
            description: 'Set these as your nameservers in Porkbun',
        });
    }
}
