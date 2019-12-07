const router = require("express").Router();
const path = require('path');
const fs = require('fs');

/* get the notes */
router.get('/notes', (req, res) => {
  var readStream = fs.createReadStream(path.join(__dirname, '../db.json'), 'utf8');
  let data = ''
  readStream.on('data', function(chunk) {
      data += chunk;
  }).on('end', function() {
      console.log(data);
      res.json(JSON.parse(data));
    });
});

// POST notes
router.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db.json'), 'utf8', (err,data)  => {

        /* convert json data to array */
        const notes = JSON.parse(data);
        let oldNote = {};
        let newNote = req.body;

        // If array is empty then make first note with ID of 1
        if(notes.length == 0){
            newNote.id = 1;
        } 
        else {
            oldNote.id = notes[notes.length - 1].id;
            console.log(oldNote.id);
            
            newNote.id = oldNote.id +1;
        }
        notes.push(newNote);
        console.log(notes);
        
        /* use normal write file to save to db.json */
        fs.writeFile(path.join(__dirname, '../db.json'), JSON.stringify(notes), (err) => {
          if (err) console.log(err);
          console.log('note saved');
        });
      });
      res.send('post sent');
  });

//   // POST data
// app.post('/api/notes', (req, res) => {
//     objectID = lastID++;
//       console.log("Note received");
//       console.log(req.body);
//       const dataToPost = JSON.stringify(req.body);
//       fs.appendFileSync('/db/db.json',",\n" + objectID + dataToPost);
//       // fs.appendFile('db.json', dataToPost, (err) => {
//       //     console.log('Data saved to db.json file');
//       // });
//       res.send("Thank you!");
//   }); 
  
// // DELETE data by ID
// app.post("/api/notes/:id", function(req, res) {
//     id = objectID;
//     id.delete();
  
//     res.json('Deleted note');
//   });



module.exports = router;