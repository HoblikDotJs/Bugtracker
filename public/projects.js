async function showProjects() {
    updateProjectTimeout()
    $('#projectName').html("Add new project").attr('contenteditable', 'false').css("color", "var(--red)").click(createProject)
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
    for (let item in projects) {
        console.log(Object.keys(projects).length)
        $('#projects').prepend(`<div id="project">
                                       <b><span onclick="showOneProject(${item.toString()})" style="margin-left: 5vw;">${projects[item].name}</span></b>
                                   id: <span>${item}</span>
                      Number of users: <span>${projects[item].users}</span>
                      <button class="deleteItem" onclick="deleteProject(${item}, this, ${Object.keys(projects).length})"><span class="${projects[item].users == 1 ? "glyphicon glyphicon-trash": "glyphicon glyphicon-remove"}"></span></button>
                                       </div><br>`);
    }
}

function deleteProject(id, el, len) {
    if (len == 1) return
    el.parentElement.remove()
    fetch("/deleteProject", {
        method: "POST",
        body: JSON.stringify({
            ID: profile.ID,
            project: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

function showOneProject(id) {
    workingId = id;
    // localStorage.setItem("WI", workingId.toString());
    $('#oneProject').show();
    $('#projectBtn').unbind("click");
    $('#projectName').attr('contenteditable', 'true').css("color", "black").unbind("click");
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