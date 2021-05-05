const express = require('express');
const app = express();
var multer = require('multer');
var cors = require('cors');


app.use(cors());

const libre = require('libreoffice-convert');
 
const fs = require('fs');
 



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});




var upload = multer({ storage: storage }).single('file');
 
app.get('/', function (req, res) {
  res.send('Online Service Backend');
});

app.post('/upload', function (req, res) {
    // console.log(req.data);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const file = fs.readFileSync(req.file.path);
        libre.convert(file,".pdf",undefined,(err, done) => {
            if (err) {
              console.log(`Error converting file: ${err}`);
            }
            
            // Here in done you have pdf file which you can save or transfer in another stream
            fs.writeFileSync(Date.now() + "output.pdf", done);
        });

    return res.status(200).send(req.file);
 })

})

 
app.listen(8080);