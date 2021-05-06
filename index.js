const express = require('express');
const app = express();
var multer = require('multer');
var cors = require('cors');


app.use(cors());

const docxConverter = require('docx-pdf');
const path = require('path');
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

app.get('/image', function (req, res){
  res.setHeader('Content-disposition', 'attachment; filename=1.png');
  res.download('D:\\My Project\\online-services-backend\\public\\1.png',  (err) =>{
    if(err){
      console.log(err);
    }
  });
});

app.post('/upload', function (req, res) {
    // console.log(req.data);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        let filePath = path.join('./public',  req.file.filename);

        const file = fs.readFileSync(filePath );
       
        docxConverter(file,'./public/output.pdf',function(err,result){
          if(err){
            console.log(err);
          }
          console.log('result'+result);
        });

    
 });

 return res.status(200).send(req.file);

});

 
app.listen(8080);