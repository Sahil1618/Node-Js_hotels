const mongoose = require('mongoose');
require('dotenv').config();

// defining the mongoDB connection URL 

// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'
const mongoURL = process.env.MONGODB_URL;

// set up mongoDB Connection

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected' , ()=>{ 
    console.log('connected to MongoDB server ');
});
db.on('error' , (err)=>{
    console.error('MongoDB connection error: ', err);
});
db.on('disconnected' , ()=>{
    console.log('MongoDB disconnected ');
});

module.exports = db;

