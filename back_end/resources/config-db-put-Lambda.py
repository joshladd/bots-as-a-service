import boto3
import json

s3 = boto3.resource('s3')

data = open('bot_configuration.json', 'r')

j = json.load(data)

j1 = json.dumps(j)

s3.Bucket('bots-configuration').put_object(Key='test.json', Body=j1)
