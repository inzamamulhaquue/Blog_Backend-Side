const express = require('express');
const mongoose = require('mongoose');
const  router = require('../routes/userRoute');
const VlogRouter = require('../routes/vlogRoute');

const app = express();
const Port = 5005;
app.use(express.json());

app.use('/api/user', router);
app.use('/api/vlog', VlogRouter);

mongoose.connect
    ("mongodb+srv://admin:QPAu9dPEg7f18qwJ@cluster0.ihoobso.mongodb.net/Vlog?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>{
    app.listen(Port, ()=>{
        console.log('Connected to database and listening to localhost 5005');
    });
})
.catch((err) =>
    console.log(err));