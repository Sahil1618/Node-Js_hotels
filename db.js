const mongoose = require('mongoose');

// defining the mongoDB connection URL 

const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

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

