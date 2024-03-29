
const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body

app.get('/', function (req, res) {
  res.send('Welcome to Node JS server made by Sahil.😀')
})


const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})