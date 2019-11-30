// Dependencies
// ===========================================================
// var express = require("express");
// var app = express();
// const path = require("path");

// var $noteTitle = $(".note-title");
// var $noteText = $(".note-textarea");
// var $saveNoteBtn = $(".save-note");
// var $newNoteBtn = $(".new-note");
// var $noteList = $(".list-container .list-group");



// activeNote is used to keep track of the note in the textarea
var activeNote = {};


var express = require("express");
var app = express();
const path = require("path");
var PORT = process.env.PORT || 3000;
var fs = require('fs');
var index = require("./index");
lastID = 1;

//set up the express app to handle data parsing
app.use(express.urlencoded({ extend : true }));
app.use(express.json());
app.use(express.static("public"));







// createID(){
//     return String.valueOf(idCounter++);
// }; 

// Routes
// ===========================================================

//General Route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

//Notes Route
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, '../../notes.html'));
});

var allNotes = fs.readFile('db.json', 'utf8',(err) => {
    console.log('Data saved to db.json file');
});
console.log(allNotes);


// Get all the data
app.get('/api/notes', (req, res) =>{
    return res.json(allNotes);
});

 
// POST data
app.post('/api/notes', (req, res) => {
  objectID = lastID++;
    console.log("Note received");
    console.log(req.body);
    const dataToPost = JSON.stringify(req.body);
    fs.appendFileSync('../../../db/db.json',",\n" + objectID + dataToPost);
    // fs.appendFile('db.json', dataToPost, (err) => {
    //     console.log('Data saved to db.json file');
    // });
    res.send("Thank you!");
}); 



// A function for getting all notes from the db  
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};
  

// A function for saving a note to the db
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

// $saveNoteBtn.on("click", handleNoteSave);
// $noteList.on("click", ".list-group-item", handleNoteView);
// $newNoteBtn.on("click", handleNewNoteView);
// $noteList.on("click", ".delete-note", handleNoteDelete);
// $noteTitle.on("keyup", handleRenderSaveBtn);
// $noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
// getAndRenderNotes();





// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

