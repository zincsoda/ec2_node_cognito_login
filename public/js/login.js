function login() {
  var username = document.getElementById('inputUsername').value;
  var password = document.getElementById('inputPassword').value;
  var authenticationData = {
    Username : username,
    Password : password,
  };
  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var userData = {
    Username : username,
    Pool : userPool
  };
  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var cgg_provider_cognito_access_token = result.getAccessToken().getJwtToken();
      var cgg_provider_cognito_id_token = result.idToken.jwtToken;
      console.log('access token + ' + cgg_provider_cognito_access_token);
      /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or
      when passing through an Authorization Header to an API Gateway Authorizer*/
      console.log('idToken + ' + cgg_provider_cognito_id_token);
      window.location.replace("index.html"+window.location.search)
    },
    onFailure: function (err) {
      console.log(err)
      alert(err);
    },
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      $("#btnLogin").hide();
      $("#newPasswordRequiredText").show();
      $("#inputNewPassword").show();
      $("#inputConfirmNewPassword").show();
      $("#btnConfirmResetPassword").show();
      Session = this.Session;
    }
  });
}

function confirmNewPassword(){
  var newPassword = document.getElementById('inputNewPassword').value;
  var confirmNewPassword = document.getElementById('inputConfirmNewPassword').value;
  var regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,16}$"
  $("#warningPasswordConfirmationFail").hide();
  $("#warningPasswordVerificationFail").hide();
  if (newPassword.match(regex)){
    if (newPassword == confirmNewPassword) {
      console.log(cognitoUser.username);
      cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
        onSuccess: function(result) {
          var cgg_provider_cognito_access_token = result.getAccessToken().getJwtToken();
          var cgg_provider_cognito_id_token = result.idToken.jwtToken;
          console.log('access token + ' + cgg_provider_cognito_access_token);
          /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
          console.log('idToken + ' + cgg_provider_cognito_id_token);
          window.location.replace("index.html"+window.location.search)
        },
        onFailure: function(err) {
          console.log(err)
          alert(err)
        }
      });
    }else {
      $("#warningPasswordConfirmationFail").show();
    }
  } else {
    $("#warningPasswordVerificationFail").show();
  }
}
