let profile;
let googleProfile;
async function onSignIn(googleUser) {
    googleProfile = googleUser.getBasicProfile();
    profile = {
        'ID': googleProfile.getId(),
        'Name': googleProfile.getName(),
        'Image URL': googleProfile.getImageUrl(),
        'Email': googleProfile.getEmail(),
        'Projects': [googleProfile.getId() + Date.parse(new Date)],
    }
    loadProject(googleProfile, 0);
    let img = googleProfile.getImageUrl();
    preloadImage(img);
    //sett.user = img;
    $("#googleBtn").html(`<img id="userImg" src="${img}">`);
}

function loadProject(p) {
    database.ref("users/" + p.getId()).once("value", (snap) => { //check if user exists 
        let data = snap.val();
        if (data == null) { //create project and profile
            database.ref("users/" + p.getId()).set(profile);
            database.ref("projects/" + profile.Projects[workingIndex] + "/users/" + profile.ID).set(profile.ID);
        } else { //load
            profile = data;
            database.ref("projects/" + profile.Projects[workingIndex]).once("value", (_) => {
                const snap = _.val().data;
                if (snap == undefined) { // its a new project
                    emptyContainers();
                    $('#projectName').html("Project name")
                    return
                }
                emptyContainers();
                if (snap.todo) {
                    for (let tile in snap.todo) {
                        project.todo[tile] = (snap.todo[tile]);
                    }
                    for (let tile of project.todo) {
                        addTodo(tile, false);
                    }
                }
                if (snap.progress) {
                    for (let tile in snap.progress) {
                        project.progress[tile] = (snap.progress[tile]);
                    }
                    for (let tile of project.progress) {
                        addInprogress(tile, false);
                    }
                }
                if (snap.review) {
                    for (let tile in snap.review) {
                        project.review[tile] = (snap.review[tile]);
                    }
                    for (let tile of project.review) {
                        addReview(tile, false);
                    }
                }
                if (snap.done) {
                    for (let tile in snap.done) {
                        project.done[tile] = (snap.done[tile]);
                    }
                    for (let tile of project.done) {
                        addDone(tile, false);
                    }
                }
                $('#projectName').html(snap.projectName);
            })
        }
    });
}

let myImage;

function preloadImage(url) {
    myImage = new Image();
    myImage.className = "otherUsersImages";
    myImage.src = url;
}










/*

function signedIn(_) {
    $("#loginForm").hide();
    $("#logoutButton").html("Log Out")
    const user = _;
    const UID = user.uid
    console.log("success", UID);
}
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