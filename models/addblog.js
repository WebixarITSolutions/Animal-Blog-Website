const mongoose = require('mongoose');

const newBlogSchema = new mongoose.Schema({
   
    imageSrc:String,
    title:String,
    description:String,
    detailed:String,
    author:String,
    conclusion:String,
    introduction:String,
    date: Date

},{
    collection: 'animal' // Replace with your actual collection name
});

const newBlog = mongoose.model('newBlog', newBlogSchema);

module.exports = newBlog;
