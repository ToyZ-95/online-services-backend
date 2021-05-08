const express = require('express');
const app = express();
var multer = require('multer');
var cors = require('cors');
const asyncHandler = require('express-async-handler');

app.use(cors());

const docxConverter = require('docx-pdf');
const path = require('path');
const fs = require('fs');
 



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, "input.docx" );
  }
});




var upload = multer({ storage: storage }).single('file');
 
app.get('/', function (req, res) {
  res.send('Online Service Backend');
});

app.get('/download', function (req, res){

  const src = fs.createReadStream(__dirname + '/public/output.pdf');

  src.pipe(res);

  

  res.download(__dirname + '/public/output.pdf', 'output.pdf', (err) =>{
    if(err){
      console.log(err);
    }
  });

}); 

app.post('/upload', asyncHandler(async(req, res) => {
  console.log("uploading doc");
  await uploadDoc(req,res);
  console.log("uploaded doc");
  console.log("converting doc");
  await convertDoc();
  console.log("converted doc");

  const src = fs.createReadStream(__dirname + '/public/output.pdf');

  src.pipe(res);
  res.download(__dirname + '/public/output.pdf', 'output.pdf', (err) =>{
  if(err){
    console.log(err);
  }
});

}));


async function uploadDoc(req,res){
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
  });
}

async function convertDoc(){
  console.log(" inside before converting doc");
  let inputFile =  __dirname + '/public/input.docx';
  console.log((inputFile));
  docxConverter(inputFile,'./public/output.pdf',function(err,result){
    if(err){
      console.log(err);
    }
    console.log('result'+result);
  });
  console.log("inside after converting doc");
}


app.post('/upload123', function (req, res) {
    // console.log(req.data);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        // let filePath = path.join('./public',  req.file.filename);

        // const file = fs.readFileSync(filePath );
       
        docxConverter(req.file.path,'./public/output.pdf',function(err,result){
          if(err){
            console.log(err);
          }
          console.log('result'+result);
        });
 });
  const src = fs.createReadStream(__dirname + '/public/output.pdf');

  src.pipe(res);
  res.download(__dirname + '/public/output.pdf', 'output.pdf', (err) =>{
  if(err){
    console.log(err);
  }
});

});

 
app.listen(8080);