
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const router = require('express').Router();

//get notes
router.get('/notes', (req,res) =>{
    const notes = readFileAsync('./../db/db.json', 'utf8').then(notes =>{
        console.log(notes);
    });
});

router.post('/notes', (req,res) =>{
    const newNote = req.body;
    
    readFileAsync('./../db/db.json', 'utf8').then(notes => {
        notes.push(newNote);
        writeFileAsync('./../db/db.json', JSON.stringify(notes));
    });
});