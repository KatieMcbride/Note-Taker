// var express = require("express");
// var app = express();
// const path = require("path");
// var PORT = process.env.PORT || 3000;
// var fs = require('fs');
// var index = require("./index");

// //set up the express app to handle data parsing
// app.use(express.urlencoded({ extend : true }));
// app.use(express.json());
// app.use(express.static("public"));


// var allNotes = fs.readFile('db.json', 'utf8',(err) => {
//     console.log('Data saved to db.json file');
// });
// console.log(allNotes);


// // Get all the data
// app.get('/api/notes', (req, res) =>{
//     return res.json(allNotes);
// });

// app.post('/api/notes', (req, res) => {
//     console.log("Note received");
//     console.log(req.body);
//     const dataToPost = JSON.stringify(req.body);
//     // fs.appendFileSync('db.json', dataToPost);
//     fs.appendFile('db.json', dataToPost, (err) => {
//         console.log('Data saved to db.json file');
//     });
//     res.send("Thank you!");
// });   


// // Listener
// // ===========================================================
// app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
// });