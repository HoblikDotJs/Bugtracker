async function showProjects() {
    updateProjectTimeout()
    $('#projectName').html("Add new project").attr('contenteditable', 'false').click(createProject)
    $('#oneProject').hide();
    $('#projects').show()
    $('#projectBtn').click(() => {
        return
    });
    $('#projects').empty()

    const projects = await (await fetch("/showProjects", {
        method: "POST",
        body: JSON.stringify({
            ID: profile.ID,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json()
    console.log(projects)
    for (let item in projects) {
        $('#projects').prepend(`<div id="project" onclick="showOneProject(${item.toString()})">
                                       <span style="margin-left: 5vw;">${projects[item].name}</span>
                                   id: <span>${item}</span>
                      Number of users: <span>${projects[item].users}</span>
                                       </div><br>`);
    }
}

function showOneProject(id) {
    workingId = id;
    // localStorage.setItem("WI", workingId.toString());
    $('#oneProject').show();
    $('#projectBtn').unbind("click");
    $('#projectName').attr('contenteditable', 'true').unbind("click");
    loadProject(profile, undefined, id);
    $('#projects').empty()
    $('#projects').hide()
}

async function createProject() {
    const id = await (await fetch("/createProject", {
        method: "POST",
        body: JSON.stringify({
            ID: profile.ID,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json()
    $('#oneProject').show();
    $('#projectBtn').unbind("click");
    $('#projectName').attr('contenteditable', 'true').unbind("click");
    loadProject(profile, undefined, id);
    $('#projects').empty()
    $('#projects').hide()
}