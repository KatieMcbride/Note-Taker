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


//General Route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

//Notes Route
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, '../../notes.html'));
});


// Get all the data
var allNotes = fs.readFile('db.json', 'utf8',(err) => {
    console.log('Data saved to db.json file');
});
console.log(allNotes);

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
  
// DELETE data by ID
app.post("/api/notes/:id", function(req, res) {
    id = objectID;
    id.delete();
  
    res.json('Deleted note');
  });


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});