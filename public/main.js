let project = {
    "todo": [],
    "progress": [],
    "review": [],
    "done": [],
    "projectName": "",
    "id": "",
}

function updateProject() {
    setTimeout(updateProjectTimeout, 5)
}


function updateProjectTimeout() {
    let newProject = {
        "todo": [],
        "progress": [],
        "review": [],
        "done": [],
        "projectName": "Project name",
        "id": "",
    }

    if ($('#projectName').html() != "Add new project") {
        //console.log($('#projectName').html())
        newProject.projectName = $('#projectName').html();
    } else {
        newProject.projectName = project.projectName
    }
    document.querySelectorAll('.containBox').forEach(e => {
        if (e.id == "todoBoxes") {
            e.childNodes.forEach(e => {
                if (e.className == "draggable") {
                    newProject.todo.push(reverseTile(e));
                }
            })
        }
        if (e.id == "progressBoxes") {
            e.childNodes.forEach(e => {
                if (e.className == "draggable") {
                    newProject.progress.push(reverseTile(e));
                }
            })
        }
        if (e.id == "reviewBoxes") {
            e.childNodes.forEach(e => {
                if (e.className == "draggable") {
                    newProject.review.push(reverseTile(e));
                }
            })
        }
        if (e.id == "doneBoxes") {
            e.childNodes.forEach(e => {
                if (e.className == "draggable") {
                    newProject.done.push(reverseTile(e));
                }
            })
        }
    });
    if (JSON.stringify(newProject) == JSON.stringify(project)) {
        return
    } else {
        project = newProject
        database.ref("projects/" + profile.Projects[workingIndex] + "/data").set(project);
    }
}