// Empty JS for your own code to be here
/*global firebase*/
function addBehaviorToLoginBUtton() {
    var loginButton = document.querySelector('.register');
    loginButton.addEventListener('click',loginUser)
}

function loginUser(event) {
    var email = document.querySelector('.email').value;
    var password = document.querySelector('.password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

(function () {
    addBehaviorToLoginBUtton()
})();