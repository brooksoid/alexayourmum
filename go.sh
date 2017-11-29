#!/bin/bash
pushd src
zip -r ../src.zip *
popd
aws lambda update-function-code --function-name alexaYourMumSkill --zip-file fileb://src.zip

#aws s3 cp src.zip s3://matthewsalexa/

# https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/Publishing-Your-Skill-Code-to-Lambda-via-the-Command-Line-Interface
# use AWS configure to create credentials
# aws lambda update-function-code --function-name MyLambdaFunction --zip-file fileb://index.zip

#$ aws lambda update-function-configuration \
#   --function-name CreateThumbnail  \
#   --region us-west-2 \
#   --timeout timeout-in-seconds \
#   --profile adminuser
