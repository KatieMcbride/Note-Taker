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
        let notes = JSON.parse(data);
        console.log(data);
        let newNote = req.body;
        notes.push(newNote);
        
        /* use normal write file to save to db.json */
        fs.writeFile(path.join(__dirname, '../db.json'), JSON.stringify(notes), (err) => {
          if (err) console.log(err);
          console.log('note saved');
        });
      });
      res.send('post sent');
  });
// router.post('/notes', (req, res) => {
//     const newNote = req.body;
//     fs.readFile('db.json', 'utf8').then(notes => {
//         notes.push(newNote);
//         fs.writeFile('db.json', JSON.stringify(notes), function(err, result) {
//             if(err) console.log('error', err);
//     });

    
    // notes.push(newNote);
    // fs.writeFile('db.json', JSON.stringify(notes), function(err, result) {
    //     if(err) console.log('error', err);
    //   });

    // objectID = lastID++;
    //   console.log(req.body);
    //   const dataToPost = JSON.stringify(req.body);
    //   fs.appendFileSync('../public/assets/js/db.json',",\n" + dataToPost);
    //   fs.appendFile('db.json',",\n" + dataToPost, (err) => {
    //     if (err) throw err;
    //     console.log('Data saved to db.json file');
    //   });
    //   res.send("Thank you!");
//   }); 
// }); 



module.exports = router;