import boto3
import json

def callS3 (query):
    S3_BUCKET = 'crossriver'
    s3 = boto3.client('s3')
    res = s3.select_object_content(
            Bucket=S3_BUCKET,
            Key='loan.csv',
            ExpressionType='SQL',
            Expression= query,
            InputSerialization={'CSV': {"FileHeaderInfo": "Use"}},
            OutputSerialization={'CSV': {}},
    )
    for event in res['Payload']:
        if 'Records' in event:
            records = event['Records']['Payload'].decode('utf-8')
            return records
    return "none"


def handler(event, context):
    year = event['year']
    month = event['month']
    date = month + '-' + year
    total = callS3("select COUNT(cast(total_acc as float)) from s3object where issue_d LIKE '%"+date+"%'")
    
    return {
        'volume': total,
        'month': month,
        'year': year
    }