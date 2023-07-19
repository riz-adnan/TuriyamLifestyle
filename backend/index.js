
const express = require('express');
const connectToMongo=require('./db');
connectToMongo();
require('dotenv').config()
const app = express();
const port=process.env.PORT;


app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/Pro',require('./routes/Pro'));
app.use('/api/authadmin',require('./routes/authadmin'));
app.use('/api/Adminfun',require('./routes/Adminfun'));
app.use('/api/Mem',require('./routes/Mem'));

app.get('/',(req,res)=>{
  res.send("HI");
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})