let profile;
let googleProfile;
let workingId;
async function onSignIn(googleUser) {
    googleProfile = googleUser.getBasicProfile();
    profile = {
        'ID': googleProfile.getId(),
        'Name': googleProfile.getName(),
        'Image URL': googleProfile.getImageUrl(),
        'Email': googleProfile.getEmail(),
    }
    let invitation;
    if (new URLSearchParams(window.location.search).has("invite")) { //with invite
        invitation = new URLSearchParams(window.location.search).get("invite");
    }
    loadProject(profile, invitation, undefined);
    let img = googleProfile.getImageUrl();
    $("#googleBtn").html(`<img id="userImg" src="${img}">`)
}

async function loadProject(profile, invitation, id) {
    const response = await (await fetch("/loadProject", {
        method: "POST",
        body: JSON.stringify({
            profile: profile,
            invitation: invitation,
            index: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json()
    workingId = response.data.id
    $("#googleBtn").unbind("click");
    const snap = response.data;
    emptyContainers();
    window.history.replaceState(null, null, window.location.pathname);
    if (snap.todo) {
        for (let tile in snap.todo) {
            project.todo[tile] = (snap.todo[tile]);
        }
        for (let tile of snap.todo) { // project.todo
            addTodo(tile, false);
        }
    }
    if (snap.progress) {
        for (let tile in snap.progress) {
            project.progress[tile] = (snap.progress[tile]);
        }
        for (let tile of snap.progress) {
            addInprogress(tile, false);
        }
    }
    if (snap.review) {
        for (let tile in snap.review) {
            project.review[tile] = (snap.review[tile]);
        }
        for (let tile of snap.review) {
            addReview(tile, false);
        }
    }
    if (snap.done) {
        for (let tile in snap.done) {
            project.done[tile] = (snap.done[tile]);
        }
        for (let tile of snap.done) {
            addDone(tile, false);
        }
    }
    $('#projectName').html(snap.projectName);
}








































/*
function loadProject(p) {
    database.ref("users/" + p.getId()).once("value", (snap) => { //check if user exists 
        let data = snap.val();
        if (data == null) { //create project and profile
            if (new URLSearchParams(window.location.search).has("invite")) { //with invite
                let invitation = new URLSearchParams(window.location.search).get("invite");
                profile.Projects.push(invitation);
                database.ref("projects/" + invitation + "/users/" + profile.ID).set(profile["Image URL"]); //addProfileToExistingProject
                database.ref("users/" + p.getId()).set(profile); // create profile
                loadProject(googleProfile);
            } else { // without invite
                profile.Projects.push(googleProfile.getId() + Date.parse(new Date))
                database.ref("users/" + p.getId()).set(profile);
                database.ref("projects/" + profile.Projects[workingIndex] + "/users/" + profile.ID).set(profile["Image URL"]);
            }
        } else { //load
            profile = data;
            if (new URLSearchParams(window.location.search).has("invite") && !profile.Projects.includes(new URLSearchParams(window.location.search).get("invite"))) {
                profile.Projects.push(new URLSearchParams(window.location.search).get("invite"));
                database.ref("users/" + p.getId()).set(profile);
                database.ref("projects/" + new URLSearchParams(window.location.search).get("invite") + "/users/" + profile.ID).set(profile["Image URL"]);
                localStorage.setItem("WI", profile.Projects.length - 1);
                loadProject(googleProfile);
            }
            workingIndex = (localStorage.getItem("WI") || 0)
            if (workingIndex > profile.Projects.length - 1) workingIndex = 0
            database.ref("projects/" + profile.Projects[workingIndex]).on("value", async (_) => {
                if (_.val().users) {
                    for (let user in _.val().users) {
                        let url = _.val().users[user];
                        if (localStorage.getItem(url) == null) {
                            let res = await getBase64FromUrl(url)
                            localStorage.setItem(url, res)
                        }
                    }
                }
                workingId = profile.Projects[workingIndex];
                $("#googleBtn").click(() => {
                    const urlParams = new URLSearchParams(window.location.search);
                    urlParams.set('invite', workingId);
                    alert(location.protocol + '//' + location.host + location.pathname + "?" + urlParams);
                })
                const snap = _.val().data;
                emptyContainers();
                if (snap == undefined) { // its a new project
                    $('#projectName').html("Project name")
                    return
                }
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
*/










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