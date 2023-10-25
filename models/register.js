
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    password: String,
    dob: Date,
    email: String,
    mobile: Number,
    gender: String,
    state: String,
    language: String,
    age: Number,
    hobby: String,
    favourite: String




},{
    collection: 'register' // Replace with your actual collection name
});

const dataModel = mongoose.model('register', dataSchema);

module.exports = dataModel;