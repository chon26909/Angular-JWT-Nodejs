const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chon:1234@cluster0.dzqe8.mongodb.net/NodejsJWT?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(success => console.log("connect db success"))
.catch(err => console.log(err));

