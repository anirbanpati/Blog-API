const env = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {DBconnect} = require('./config/DB');
const {PORT} = require('./constants');
const path = require('path');
const {status} = require('./constants');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


DBconnect().then(()=>{
    console.log('Database connected');

}).catch((err)=>{
    console.log(err);
});


app.get('/',(res,req)=>{
    res.status(status.OK).send('Hello World');

})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
