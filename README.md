# A simple cognito login page for node served page

## Create User Pool in Cognito

From AWS Console, create a new user pool. 

N.B. At one stage, you will create a new app client. Make sure that you uncheck 'generate client secret'

## To launch the login page

```
npm install
node server.js
```

## Setup

### Configuration

In config.js, you will need to set the two variables:

```
AWSCognito.config.region = 'ap-northeast-1';
poolData = {
    UserPoolId : <YOUR USER POOL ID>,
    ClientId : <YOUR CLIENT ID>
};
```

All the magic happens by including the following code in your main HTML page:

```
	<script src="https://sdk.amazonaws.com/js/aws-sdk-2.6.10.min.js"></script>
	<script src="js/aws-cognito-sdk.min.js"></script>
	<script src="js/amazon-cognito-identity.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/common.js"></script>
	<script type="text/javascript">
	  $(document).ready(function(){
	    checkLoggedIn();
	  });
</script>
```

## Account management

- Accounts must be created in Cognito.
- User will be forced to change password
- User can change password via 'Forgot Password' link