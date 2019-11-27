var express = require("express");
var app = express();
const path = require("path");
var PORT = process.env.PORT || 3000;
var fs = require('fs');


//set up the express app to handle data parsing
app.use(express.urlencoded({ extend : true }));
app.use(express.json());
app.use(express.static("public"));


var allNotes = fs.readFileSync('./db/db.json', 'utf8');
// console.log(allNotes);


// Get all the data
app.get('/api/notes', (req, res) =>{
    return res.json(allNotes);
});

var saveNote = app.post('/api/notes', (req, res) =>{
    const newNote = req.body;
    console.log(newNote);
});  


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });