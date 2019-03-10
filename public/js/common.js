function checkLoggedIn() {
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var cognitoUser = userPool.getCurrentUser();
  console.log(cognitoUser)
  if (cognitoUser == null) {
    window.location.replace("login.html"+window.location.search)
  }
}

function log_off(){
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var cognitoUser = userPool.getCurrentUser();
  cognitoUser.signOut({
    onSuccess: function(){
    },
    onFailure:function(err){
      alert(err)
    }
  });
  window.location.replace("login.html"+window.location.search);
}
