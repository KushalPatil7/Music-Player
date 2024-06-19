const mongoose = require('mongoose');

const mongouri = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongouri);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
};

module.exports = connectToMongo;

