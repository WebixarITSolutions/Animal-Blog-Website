const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
},{
    collection: 'register' // Replace with your actual collection name
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;