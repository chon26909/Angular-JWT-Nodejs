const express = require('express');
const app = express();
require('./database');


const userRoute = require('./routes/user');


app.use(express.json());
app.use('/user',userRoute);

port = process.env.PORT || 3000;

app.listen(port,function(req,res){
  console.log('server start port '+ port);
});
