---
pre: <b>1. </b>
title: setup web3 wallet
weight: 102
---


## Attach cdk's policy

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudformation:CreateStack",
                "cloudformation:DeleteStack",
                "cloudformation:DescribeStacks",
                "cloudformation:UpdateStack"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

## update libararies

```bash
cd ~/web3-wallet-workshop/backend/
pip install -r requirements.txt
```

## cdk

Bootstrapping is the process of provisioning resources for the AWS CDK before you can deploy AWS CDK apps into an AWS environment.

```
cdk bootstrap
```

TODO check below cmd
cdk bootstrap --cloudformation-execution-policies "arn:aws:iam::aws:policy/AWSLambda_FullAccess,arn:aws:iam::aws:policy/AWSCodeDeployFullAccess".



### cdk synth

```bash
cdk synth
```


### cdk deploy

```bash
cdk deploy
```

![cdk deploy](/contents/static/01-setup-web3-wallet/00-setup-cdk/01-cdk-deploy.png)

- Completed!

![cdk deploy](/contents/static/01-setup-web3-wallet/00-setup-cdk/02-cdk-output.png)
