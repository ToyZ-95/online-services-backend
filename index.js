const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Ajay chutiyo')
})
 
app.listen(8080)