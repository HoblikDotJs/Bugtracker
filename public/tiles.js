function addTodo(sett = {
    text: "Enter text here",
    user: "",
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
    user: "",
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
    user: "",
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
    user: "",
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
    user,
    text,
    priority
}) {
    let priorities = {
        lowPriority: "Low",
        mediumPriority: "Medium",
        highPriority: "High",
    }
    return `<div class="draggable"  draggable="true">
      <div contenteditable="true" onchange="updateProject()" onclick="editTile(this)">${text}</div>
      ${myImage.outerHTML}
      <p class="priority ${priority}" onclick="changePriority(this)">${priorities[priority]}</p>
    </div>`
}

function editTile(el) {
    if (el.innerHTML == "Enter text here" || el.innerHTML == "Project name") {
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
    let text = tile.childNodes[1].innerHTML
    let userImg = tile.childNodes[3].src;
    let priority = tile.childNodes[5].classList[1]
    return {
        "text": text,
        "userImg": userImg,
        "priority": priority,
    }
}