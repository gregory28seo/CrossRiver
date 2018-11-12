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
    total = callS3("select SUM(cast(loan_amnt as float)),SUM(cast(funded_amnt as float)),SUM(cast(funded_amnt_inv as float)) from s3object where issue_d LIKE '%-"+year+"%'")
    
    totalarray = total.split(',')
    total_amount = totalarray[0]
    total_amount_funded = totalarray[1]
    total_invested = totalarray[2]
    return {
        'total_amount': total_amount,
        'total_amount_funded': total_amount_funded,
        'year': year,
        'total_invested': total_invested
    }