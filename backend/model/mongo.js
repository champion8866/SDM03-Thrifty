const mongoose = require("mongoose");
require('dotenv').config();

function connectMongo() {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@thrifty.0xdedx2.mongodb.net/Thrifty
                        ?retryWrites=true&w=majority`, {useNewUrlParser: true});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Database connected!');
    });
}

const mongo = {
    connect: connectMongo,
};

module.exports = mongo;