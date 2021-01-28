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
    let img = profile.getImageUrl();
    preloadImage(img);
    sett.user = img;
    $("#googleBtn").html(`<img id="userImg" src="${img}">`);
    $("#someuserimg").html(`<img class="otherUsersImages" src="${img}">`)
}
let myImage;

function preloadImage(url) {
    myImage = new Image();
    myImage.className = "otherUsersImages";
    myImage.src = url;
}

/*
function preloadImage(url) {
    if (localStorage.getItem("myImg") == null) {
        myImage = new Image();
        myImage.className = "otherUsersImages";
        console.log("using fetched");
        myImage.src = url;
        localStorage.setItem("myImg", myImage)
    } else {
        console.log("using preloaded");
        myImage = localStorage.getItem("myImg");
    }
}*/








/*
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
*/