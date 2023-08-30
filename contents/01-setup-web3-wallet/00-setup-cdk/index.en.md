---
pre: <b>1. </b>
title: setup cdk
weight: 101
---

## AWS Cloud Development Kit

The AWS Cloud Development Kit (CDK) is a framework for defining cloud infrastructure as code and provisioning it through AWS CloudFormation.


Create resource through the CDK.
API Gateway which will be called by web3 wallet application. 
Lambda function which is consisted of the Query API that is connected to the API gateway.

The toolkit is a command-line utility which allows you to work with AWS CDK apps and run AWS CDK commands. 

The AWS CDK uses Node.js (>= 10.13.0), so to install it visit the node.js [website](https://nodejs.org/en).


Install the AWS CDK Toolkit globally using the following Node Package Manager command.


```bash
sudo yum -y update
```

```bash
npm install -g aws-cdk
```


Run the following command to verify correct installation and print the version number of the AWS CDK.
```bash
cdk --version
```


If you want to know more about CDK, please visits https://docs.aws.amazon.com/cdk/v2/guide/home.html.



## Update Python 3.9

- Update cloud9 to python 3.9

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
cat << 'EOT' >> ~/.bashrc
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
EOT
source ~/.bashrc
sudo yum -y update
sudo yum -y install bzip2-devel
sudo yum -y install xz-devel
pyenv install 3.9.13
pyenv global 3.9.13
export PATH="$HOME/.pyenv/shims:$PATH"
source ~/.bash_profile
```

- Check python version
```bash
python --version
```

- Install boto3 v1.28.35

```bash
pip install boto3=1.28.35
```


- Now, you can use AMB Query from console.

```python
import boto3

client = boto3.client('managedblockchain-query')
```