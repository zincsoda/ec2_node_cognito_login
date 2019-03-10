# Simple Cognito Login

This simple web application uses the AWS cognito javascript SDK to log a user into a userpool.

See: https://github.com/aws/amazon-cognito-identity-js

Once the user has logged in (and changed password if required on first login) - the javascript prints out the Access Token and ID Token.

The ID token is cached and can be used for API Gateway access.

The ID Token can be included in an Authorization header for testing an API Gateway secured by the user pool in question.

e.g.

```
GET: https://3hmbdb06s3.execute-api.ap-northeast-1.amazonaws.com/testing/datasets
```

with headers:

```
{
Authorization: <id_token>,
Content-Type: application/json
}
```