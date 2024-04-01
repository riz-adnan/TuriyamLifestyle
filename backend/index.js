
const express = require('express');
const connectToMongo=require('./db');
const path=require('path')
connectToMongo();
require('dotenv').config()
const app = express();
const cors = require('cors'); 
const { log } = require('console');
const port=process.env.PORT;
const session = require("express-session");
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Make sure to include credentials if your frontend sends cookies
}));
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
   // Adjust according to your setup
}));


let router = express.Router();
app.use(router);



app.use(express.json());
app.use(express.static(path.join(__dirname,'../build')))

app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
   // Adjust according to your setup
}));

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