#!/bin/bash
pushd src
zip -r ../src.zip *
popd
aws s3 cp src.zip s3://matthewsalexa/
