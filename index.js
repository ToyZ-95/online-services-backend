const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Online Service Backend')
})
 
app.listen(8080)