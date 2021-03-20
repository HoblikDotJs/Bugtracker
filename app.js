const express = require("express"),
    fs = require("fs"),
    bodyParser = require('body-parser'),
    uniqid = require("uniqid");

const app = express()
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
app.use(express.static("public"));
app.use(express.json({
    limit: "10mb"
}));
let DB = [];
const DBPATH = "data.json";

if (fs.existsSync(DBPATH)) {
    DB = JSON.parse(fs.readFileSync(DBPATH));
}

function saveData() {
    fs.writeFileSync(DBPATH, JSON.stringify(DB, null, 4));
    // console.log("Saving data")
}

function emptyData() {
    DB = {
        "projects": {},
        "users": {}
    };
    saveData()
}

app.post('/loadProject', (req, res) => {
    const data = req.body;
    let user = DB.users[data.profile.ID];
    if (user == undefined) { //NEW USER
        if (data.invitation) { //NEW USER with i - add him to existing project,create profile
            console.log("NEW USER with i");
            if (DB.projects[data.invitation]) {
                data.profile.Projects = [];
                data.profile.Projects.push(data.invitation)
                DB.users[data.profile.ID] = data.profile;
                DB.projects[data.invitation].users[data.profile.ID] = data.profile['Image URL']
                res.status(200).send(DB.projects[data.invitation]);
                saveData();
                return
            } else {
                console.log("unvalid invite")
            }
        } else { //NEW USER without i - create a new project, create profile
            console.log("NEW USER without i");
            data.profile.Projects = [];
            const projectID = data.profile.ID.toString() + Date.parse(new Date).toString()
            data.profile.Projects.push(projectID)
            DB.users[data.profile.ID] = data.profile;
            let project = {
                "data": {
                    "done": [],
                    "id": projectID,
                    "progress": [],
                    "projectName": "New Project",
                    "review": [],
                    "todo": []
                },
                "users": {
                    [data.profile.ID]: data.profile['Image URL'],
                }
            }
            DB.projects[projectID] = project
            res.status(200).send(project);
            saveData();
            return
        }
    } else { //OLD USER
        if (data.invitation) { //OLD USER with i - add him to existing project
            console.log("OLD USER with i");
            if (DB.projects[data.invitation]) {
                if (!user.Projects.includes(data.invitation)) {
                    user.Projects.push(data.invitation);
                    DB.projects[data.invitation].users[data.profile.ID] = data.profile['Image URL']
                    res.status(200).send(DB.projects[data.invitation]);
                    saveData()
                    return
                } else {
                    res.status(200).send(DB.projects[data.invitation]);
                    return
                }
            } else {
                console.log("unvalid invite")
            }
        } else { //OLD USER without i - load existing project
            console.log("OLD USER without i");
            let projectID = data.index
            if (projectID == undefined) {
                projectID = DB.users[data.profile.ID].Projects[user.Projects.length - 1]
            }
            console.log(projectID)
            res.status(200).send(DB.projects[projectID]);
            return
        }
    }
    res.status(200).send(req.body);
});

app.post('/updateProject', (req, res) => {
    let data = req.body;
    if (DB.projects[data.ID]) {
        DB.projects[data.ID].data = data.project
        saveData()
        res.status(200).send(req.body)
        return
    }
    res.status(200).send(req.body);
})

app.post('/showProjects', (req, res) => {
    let ID = req.body.ID;
    let obj = {};
    for (let project of DB.users[ID].Projects) {
        obj[project] = {
            name: DB.projects[project].data.projectName,
            users: Object.keys(DB.projects[project].users).length
        }
    }
    res.status(200).send(obj);
})



app.post('/createProject', (req, res) => {
    console.log("creating project");
    const ID = req.body.ID;
    const projectID = ID.toString() + Date.parse(new Date).toString()
    DB.users[ID].Projects.push(projectID);
    let project = {
        "data": {
            "done": [],
            "id": projectID,
            "progress": [],
            "projectName": "New Project",
            "review": [],
            "todo": []
        },
        "users": {
            [ID]: DB.users[ID]['Image URL'],
        }
    }
    DB.projects[projectID] = project
    res.status(200).send(project.data.id);
    saveData();
    return
})