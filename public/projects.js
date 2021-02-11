function showProjects() {
    updateProjectTimeout()
    $('#projectName').html("Add new project").attr('contenteditable', 'false').click(createProject)
    $('#oneProject').hide();
    $('#projects').show()
    $('#projectBtn').click(() => {
        return
    });
    $('#projects').empty()
    profile.Projects.forEach((item, index) => {
        console.log(index);
        database.ref("projects/" + item).once("value", (res) => {
            let snap = res.val();
            let projectName = snap.data.projectName
            $('#projects').prepend(`<div id="project" onclick="showOneProject(${index})">
                                   <span style="margin-left: 5vw;">${projectName}</span>
                               id: <span>${item}</span>
                  Number of users: <span>${Object.keys(snap.users).length}</span>
                                   </div><br>`);
        })
    });
}

let workingIndex = 0;

function showOneProject(index) {
    workingIndex = index;
    localStorage.setItem("WI", workingIndex);
    $('#oneProject').show();
    $('#projectBtn').unbind("click");
    $('#projectName').attr('contenteditable', 'true').unbind("click");
    loadProject(googleProfile);
    $('#projects').empty()
    $('#projects').hide()
}

function createProject() {
    let projectId = profile.ID + Date.parse(new Date);
    profile.Projects.push(projectId);
    database.ref("projects/" + projectId + "/users/" + profile.ID).set(profile.ID);
    database.ref("users/" + profile.ID + "/Projects/" + (profile.Projects.length - 1)).set(projectId, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log(profile.Projects)
            showOneProject(profile.Projects.length - 1);
        }
    });
}