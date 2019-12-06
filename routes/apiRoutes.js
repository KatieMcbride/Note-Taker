const router = require("express").Router();
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

/* get the notes */
// Get all the data
var allNotes = fs.readFile('./../db/db.json','utf8',(err, data) => {
    console.log('Data saved to db.json file');
    console.log(data);
    return(data);
});

console.log(allNotes);

// app.get('/api/notes', (req, res) =>{
//     res.json(allNotes);
// }); 
router.get('/api/notes', (req, res) =>{
    res.json(allNotes);
}); 
// router.get('/notes', (req, res) => {
//     readFileAsync('./../db/db.json', 'utf8').then(notes => {
//       return notes;
//     });
// });

// Post notes
router.post('/notes', (req, res) => {
    const newNote = req.body;
    readFileAsync('./../db/db.json', 'utf8').then(notes => {
        notes.push(newNote);
        writeFileAsync('./../db/db.json', JSON.stringify(notes));
    });
});

module.exports = router;