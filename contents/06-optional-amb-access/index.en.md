---
title: (Optional) AMB Access for calling JSON-RPC
weight: 3
---

# (Optional) AMB Access for calling JSON-RPC

## AMB Access Bitcoin

### Preparation

Please select region as `us-east-1`.

#### Cloud9 

#### IAM

##### Create IAM Role for cloud9
 - Select trusted entity: `AWS service` > `EC2` 
 - attach policy: `AWSCloud9SSMInstanceProfile`
 - name: `AMB-Cloud9-Role`

##### Create IAM policy as `amb-bitcoin-access` 

 - Specify permissions > json
```
cat <<EOT > ~/amb-btc-access-policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid" : "AMBBitcoinAccessPolicy", 
            "Effect": "Allow",
            "Action": [
                "managedblockchain:InvokeRpcBitcoin*"
            ],
            "Resource": "*"
        }
    ]
}
EOT


aws iam create-policy --policy-name AmazonManagedBlockchainBitcoinAccess --policy-document file://$HOME/amb-btc-access-policy.json

```
- name: `AmazonManagedBlockchainBitcoinAccess`

##### Attach policy to Cloud9's IAM Role 
- Roles > search `AMB-Cloud9-Role`
- Add permissions 
    - `AmazonManagedBlockchainBitcoinAccess`


##### Disable AWS Managed Temporary Credentials

  1. Open your Cloud9 environment, and click on the top edge of the content pane to show the Cloud9 menu if not visible.
  2. Choose the gear icon in top right corner to open the Preferences tab.
  3. In the Prefereneces tab, choose AWS SETTINGS.
  4. Turn off AWS managed temporary credentials

### install awscurl

awscurl helps authenticating sigV4. 

```
pip install awscurl
```

### Call JSON-RPC by awscurl

```
$ awscurl -X POST -d '{ "jsonrpc": "1.0", "id": "getblockheader-curltest", "method": "getblockheader", "params": 
["000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"] }' --service managedblockchain https://mainnet.bitcoin.managedblockchain.us-east-1.amazonaws.com  --region us-east-1 -k                                                                                            

{
    "result":{
        "hash":"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
        "confirmations":803839,
        "height":0,
        "version":1,
        "versionHex":"00000001",
        "merkleroot":"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
        "time":1231006505,
        "mediantime":1231006505,
        "nonce":2083236893,
        "bits":"1d00ffff",
        "difficulty":1,
        "chainwork":"0000000000000000000000000000000000000000000000000000000100010001",
        "nTx":1,
        "nextblockhash":"00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048"
    
    },
    "error":null,
    "id":"getblockheader-curltest"
}
```

```
$ awscurl -X POST -d '{ "jsonrpc": "1.0", "id": "getblock-curltest", "method": "getblock", "params": ["000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"] }' --service managedblockchain https://mainnet.bitcoin.managedblockchain.us-east-1.amazonaws.com  --region us-east-1 -k


{
    "result":{
        "hash":"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
        "confirmations":803839,
        "height":0,
        "version":1,
        "versionHex":
        "00000001",
        "merkleroot":"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
        "time":1231006505,
        "mediantime":1231006505,
        "nonce":2083236893,
        "bits":"1d00ffff",
        "difficulty":1,
        "chainwork":"0000000000000000000000000000000000000000000000000000000100010001",
        "nTx":1,
        "nextblockhash":"00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
        "strippedsize":285,
        "size":285,
        "weight":1140,
        "tx":["4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"]
    },
    "error":null,
    "id":"getblock-curltest"
}
```



----

Finished!

**H**old **O**n for **D**ear **L**ife