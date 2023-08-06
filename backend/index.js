
const express = require('express');
const connectToMongo=require('./db');
const path=require('path')
connectToMongo();
require('dotenv').config()
const app = express();
var cors = require('cors') 
const port=process.env.PORT;


app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname,'../build')))

app.use('/api/auth',require('./routes/auth'));
app.use('/api/Pro',require('./routes/Pro'));
app.use('/api/authadmin',require('./routes/authadmin'));
app.use('/api/Adminfun',require('./routes/Adminfun'));
app.use('/api/Mem',require('./routes/Mem'));
app.use('/api/Orders',require('./routes/Orders'));

app.use('*', function(req,res){
  res.sendFile(path.join(__dirname,'../build/index.html'))
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})