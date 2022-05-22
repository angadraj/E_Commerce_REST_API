const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports.connectDB = function connectDB() {
    mongoose.connect(process.env.db_link)
    .then(function() {
        console.log("db connected");
    })
    .catch(function(e) {
        console.log(e);
    });
}