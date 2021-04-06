let projects;
async function showProjects() {
    updateProjectTimeout()
    $('#projectName').html("Add new project").attr('contenteditable', 'false').css("cursor", "pointer").css("padding", "0 10px").css("color", "var(--green)").css("border-radius", "15px").css("border", "2px solid var(--green)").click(createProject)
    $('#oneProject').hide();
    $('#projects').show()
    $('#projectBtn').click(() => {
        return
    });
    $('#projects').empty()

    projects = await (await fetch("/showProjects", {
        method: "POST",
        body: JSON.stringify({
            ID: profile.ID,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json()
    $('#projects').prepend(`<table id="projectTable"></table>`);
    for (let item in projects) {
        $('#projectTable').prepend(`<tr>
        <td onclick="showOneProject(${item.toString()})"><b><span>${projects[item].name}</span></b></td>
        <td onclick="showOneProject(${item.toString()})"> Number of users: <span>${projects[item].users}  </span><span class="glyphicon glyphicon-user"></td>
        <td onclick="showOneProject(${item.toString()})"><span>Last change: <br>${new Date(projects[item].lastChange).toLocaleTimeString('en-GB').slice(0, -3)}   (${new Date(projects[item].lastChange).toLocaleDateString('en-GB')})</span></td>
        <td onclick="showOneProject(${item.toString()})"><span>Created: ${new Date(Number(projects[item].creation)).toLocaleDateString('en-GB')}</span></td>
        <td onclick="showOneProject(${item.toString()})">id: <span>${item}</span></td>
        <td style="cursor:default"><button class="deleteItem" onclick="alertInvite(${item})"><span class="glyphicon glyphicon-share"></span></button>
        <button class="deleteItem" onclick="deleteProject(${item}, this)"><span class="${projects[item].users == 1 ? "glyphicon glyphicon-trash": "glyphicon glyphicon-remove"}"></span></button></td>
        </tr><br>`);
    }
}

function alertInvite(id) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('invite', id);
    alert("Invite link: " + location.protocol + '//' + location.host + location.pathname + "?" + urlParams);
}

function deleteProject(id, el) {
    if (Object.keys(projects).length == 1) {
        alert("You must have at least one project.")
        return
    }
    el.parentElement.parentElement.remove();
    delete projects[id]
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
    $('#projectName').attr('contenteditable', 'true').css("border", "none").css("color", "black").css("cursor", "default").unbind("click");
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
    $('#projectName').attr('contenteditable', 'true').unbind("click").css("border", "none").css("cursor", "default").css("color", "black");
    loadProject(profile, undefined, id);
    $('#projects').empty()
    $('#projects').hide()
}