---
title: IAM Configuration
weight: 4
---

## Create IAM Role for Cloud9

- Create IAM Role for cloud9

- Select trusted entity: `AWS service`` > `EC2``

![Select trusted entity](/contents/static/00-prerequisites/01-iam-configuration/01-entity.png)

- Attach policy: `AWSCloud9SSMInstanceProfile`

![Attach policy](/contents/static/00-prerequisites/01-iam-configuration/02-attach-c9-instanceprofile.png)

- Role name: `AMB-Cloud9-Role`


### Create IAM policy as `AmazonManagedBlockchainQueryAccess`

First, create a policy that permits to use AMB query in terminal of clound9.
- Policies > Create policy > JSON
- Copy below policy to Policy Editor
```
{
    "Version": "2012-10-17", 
    "Statement": [ 
        {
            "Sid" : "AMBQueryAccessPolicy", 
            "Effect": "Allow", 
            "Action": [ 
                "managedblockchain-query:*" 
            ], 
            "Resource": "*"
        }
    ]
}
```
![query policy](/contents/static/00-prerequisites/01-iam-configuration/03-query-policy.png)

- Next

- Policy name : `AmazonManagedBlockchainQueryAccess`

- Create policy

### Attach `AmazonManagedBlockchainQueryAccess` to Cloud9's role

- Roles > Search `AMB-Cloud9-Role`

- click the role
![search role](/contents/static/00-prerequisites/01-iam-configuration/04-search-c9-role.png)

- Attach policies

![Attach policies](/contents/static/00-prerequisites/01-iam-configuration/05-attach-policies.png)

- Filter policies: `AmazonManagedBlockchainQueryAccess`

![Filter policies](/contents/static/00-prerequisites/01-iam-configuration/06-filter-policy.png)


- Add permissions

### Modify IAM Role of Cloud9 instance

- ec2 > select cloud9's ec2 instance 

![Modify IAM role](/contents/static/00-prerequisites/01-iam-configuration/07-modify-iam-role.png)

- Select `AMB-Cloud9-Role`

![Select c9 role](/contents/static/00-prerequisites/01-iam-configuration/08-select-role.png)

- Update IAM role

### Remove temporal credentials from Cloud9 environment

- Move to Cloud9 terminal

- Select Preferences on right upper conner.

![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/09-preferences.png)

- AWS Settings > Turn off `AWS managed temporary credentials`

![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/10-turn-off.png)
