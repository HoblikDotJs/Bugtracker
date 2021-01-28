const sett = {
  text: "Enter text here",
  user: "",
  priority: "low"
};

function addTodo() {
  console.log("todo")
  $("#todoBoxes").append(createTile(sett))
  updateDragging()
}

function addInprogress() {
  console.log("progress")
  $("#progressBoxes").append(createTile(sett))
  updateDragging()
}

function addReview() {
  console.log("review")
  $("#reviewBoxes").append(createTile(sett))
  updateDragging()
}

function addDone() {
  console.log("done")
  $("#doneBoxes").append(createTile(sett))
  updateDragging()
}

function createTile({
  user,
  text,
  priority
}) {
  return `<div class="draggable"  draggable="true">
    <div contenteditable="true" onclick="editTile(this)">${text}</div>
    ${myImage.outerHTML}
    <p class="priority ${priority}Priority" onclick="changePriority(this)">Low</p>
  </div>`
}

function editTile(el) {
  window.getSelection().selectAllChildren(el);
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