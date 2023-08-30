---
title: Create a Cloud9 environment
weight: 3
---

Several steps in this workshop will need to be performed from a Linux command
prompt. An especially convenient way of doing this is to use [AWS
Cloud9](https://aws.amazon.com/cloud9/), a cloud-based integrated development
environment (IDE). Cloud9 allows you to edit source files and execute commands
from an easy-to-use web interface. It comes preconfigured with many of the tools
needed for software development, and because it runs in the AWS Cloud, it can be
an especially easy way to access other cloud services. One other handy feature
is that your Cloud9 instances automatically stop running after a configurable
period of inactivity, which helps reduce costs.

Navigate to the AWS Cloud9 service in your Management Console, then select
**Create environment**. Choose any name you want, such as *amb-development*,
then select **Next**. For instance type, select **Other instance type** and
choose **t2.medium** and **Amazon Linux 2**, but leave all other settings at
their default, then select **Next step**, then **Create environment**.

![Setting up a Cloud9 environment](/contents/static/00-prerequisites/00-create-cloud9-environment/cloud9-options.png)

The Cloud9 environment will take a minute or two to start up. You will want to
close the welcome window and expand the terminal, leaving you with a file tree
on the left sidebar and a terminal view taking up most of the rest of the space,
like so:

![Running your Cloud9 environment](/contents/static/00-prerequisites/00-create-cloud9-environment/cloud9-running.png)

After arranging your environment windows, you'll want to install and update some
utilities in your environment by pasting the following commands into the
terminal:

```bash
sudo yum install -y jq
```

The next step you'll need to perform is to resize the disk on the Cloud9
environment to be able to fit some additional dependencies that need to be
installed. Copy and paste the following commands into the Cloud9 terminal.

```bash
SIZE=${1:-20}
INSTANCEID=$(curl http://169.254.169.254/latest/meta-data//instance-id)
VOLUMEID=$(aws ec2 describe-instances \
  --instance-id $INSTANCEID \
  --query "Reservations[0].Instances[0].BlockDeviceMappings[0].Ebs.VolumeId" \
  --output text)

aws ec2 modify-volume --volume-id $VOLUMEID --size $SIZE
while [ \
  "$(aws ec2 describe-volumes-modifications \
    --volume-id $VOLUMEID \
    --filters Name=modification-state,Values="optimizing","completed" \
    --query "length(VolumesModifications)"\
    --output text)" != "1" ]; do
sleep 1
done

if [ $(readlink -f /dev/xvda) = "/dev/xvda" ]
then
  sudo growpart /dev/xvda 1
  sudo xfs_growfs /dev/xvda1
else
  sudo growpart /dev/nvme0n1 1
  sudo xfs_growfs /dev/nvme0n1p1
fi
```

