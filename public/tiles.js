function addTodo(sett = {
    text: "Enter text here",
    userImg: googleProfile.getImageUrl(),
    priority: "lowPriority"
}, pre = true) {
    if (pre) {
        $("#todoBoxes").prepend(createTile(sett))
    } else {
        $("#todoBoxes").append(createTile(sett))
    }
    updateDragging()
}

function addInprogress(sett = {
    text: "Enter text here",
    userImg: googleProfile.getImageUrl(),
    priority: "lowPriority"
}, pre = true) {
    if (pre) {
        $("#progressBoxes").prepend(createTile(sett))
    } else {
        $("#progressBoxes").append(createTile(sett))
    }
    updateDragging()
}

function addReview(sett = {
    text: "Enter text here",
    userImg: googleProfile.getImageUrl(),
    priority: "lowPriority"
}, pre = true) {
    if (pre) {
        $("#reviewBoxes").prepend(createTile(sett))
    } else {
        $("#reviewBoxes").append(createTile(sett))
    }
    updateDragging()
}

function addDone(sett = {
    text: "Enter text here",
    userImg: googleProfile.getImageUrl(),
    priority: "lowPriority"
}, pre = true) {
    if (pre) {
        $("#doneBoxes").prepend(createTile(sett))
    } else {
        $("#doneBoxes").append(createTile(sett))
    }
    updateDragging()
}

function createTile({
    userImg,
    text,
    priority
}) {
    let priorities = {
        lowPriority: "Low",
        mediumPriority: "Medium",
        highPriority: "High",
    }
    let url = localStorage.getItem(userImg);
    if (localStorage.getItem(userImg) == null) {
        url = userImg;
    }
    return `<div class="draggable"  draggable="true">
      <div contenteditable="true" onchange="updateProject()" onclick="editTile(this)">${text}</div>
      <img class="otherUsersImages" src="${url}">
      <p class="priority ${priority}" onclick="changePriority(this)">${priorities[priority]}</p>
      <button class="deleteItem" onclick="deleteItem(this)"><span class="glyphicon glyphicon-trash" style="color:var(--black,black);"></span></button>
    </div>`
}

function deleteItem(el) {
    console.log(el.parentElement.remove())
}

function editTile(el) {
    if (el.innerHTML == "Enter text here" || el.innerHTML == "Project Name" || el.innerHTML == "New Project") {
        window.getSelection().selectAllChildren(el);
    }
}

function changePriority(el) {
    if (el.classList[1] == "lowPriority") {
        $(el).html("Medium")
        $(el).removeClass("lowPriority");
        $(el).addClass("mediumPriority");
    } else if (el.classList[1] == "mediumPriority") {
        $(el).html("High")
        $(el).removeClass("mediumPriority");
        $(el).addClass("highPriority");
    } else if (el.classList[1] == "highPriority") {
        $(el).html("Low")
        $(el).removeClass("highPriority");
        $(el).addClass("lowPriority");
    }
}

function emptyContainers() {
    $("#reviewBoxes").empty()
    $("#doneBoxes").empty()
    $("#progressBoxes").empty()
    $("#todoBoxes").empty()
}

function reverseTile(tile) {
    let text = $(tile.childNodes[1]).text().trim()
    let userImg = tile.childNodes[3].src;
    let priority = tile.childNodes[5].classList[1]
    return {
        "text": text,
        "userImg": userImg,
        "priority": priority,
    }
}


const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}