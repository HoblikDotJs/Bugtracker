let signupToggle = false;

function signupShow() {
    if (signupToggle) {
        $("#loginButton").html("Log in");
        $("#heading").html("Log In");
        $("#signupToggle").html("Signup now");
        $("#memberToggle").html("Not a member?");
        signupToggle = false;
    } else {
        $("#loginButton").html("Sign Up");
        $("#heading").html("Sign Up");
        $("#signupToggle").html("Log In");
        $("#memberToggle").html("I am already a member");
        signupToggle = true;
    }
}

function login() {
    const email = $("#email").val();
    const password = $("#pass").val();
    if (signupToggle) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                signedIn(userCredential.user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                signedIn(userCredential.user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
}

function signedIn(_) {
    $("#loginForm").hide();
    $("#logoutButton").html("Log Out")
    const user = _;
    const UID = user.uid
    console.log("success", UID);
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    $("#googleBtn").html(`<img id="userImg" src="${profile.getImageUrl()}">`);
    $("#someuserimg").html(`<img class="otherUsersImages" src="${profile.getImageUrl()}">`)
}