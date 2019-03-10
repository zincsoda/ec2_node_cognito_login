function reset_password () {
    var username = document.getElementById('inputUsername').value;
    var verificationCode = document.getElementById('inputVerificationCode').value;
    var newPassword = document.getElementById('inputNewPassword').value;
    var confirmNewPassword = document.getElementById('inputConfirmNewPassword').value;
    var regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,16}$"
    console.log(username, verificationCode)
    $("#warningPasswordConfirmationFail").hide();
    $("#warningPasswordVerificationFail").hide();
    $("#resultsPasswordResetSuccess").hide();
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    if (newPassword.match(regex)){
        if (newPassword == confirmNewPassword) {
            var userData = {
                Username : username,
                Pool : userPool
            };
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess: function (result) {
                    $("#btnSendVerificationCode").show();
                    $("#inputVerificationCode").hide();
                    $("#inputNewPassword").hide();
                    $("#inputConfirmNewPassword").hide();
                    $("#btnResetPassword").hide();
                    $("#resultsPasswordResetSuccess").show();
                    window.location.replace("index.html")
                },
                onFailure: function(err) {
                    alert(err);
                    $("#btnSendVerificationCode").show();
                    $("#inputVerificationCode").hide();
                    $("#inputNewPassword").hide();
                    $("#inputConfirmNewPassword").hide();
                    $("#btnResetPassword").hide();
                }
            });
        } else {
            $("#warningPasswordConfirmationFail").show();
        }
    } else {
        $("#warningPasswordVerificationFail").show();
    }
}

function send_verification_code (){
    var username = document.getElementById('inputUsername').value;
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.forgotPassword({
        onSuccess: function () {
        },
        onFailure: function(err) {
            alert(err);
        },
        inputVerificationCode(data) {
            console.log(data)
            $("#btnSendVerificationCode").hide();
            $("#inputVerificationCode").show();
            $("#inputNewPassword").show();
            $("#inputConfirmNewPassword").show();
            $("#btnResetPassword").show();
        }
    });
}
