const mongoose = require('mongoose');

// Define the blog schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },

    image: { type: String },

},
    { timestamps: true, versionKey: false }

);

// Create a model based on the schema
const blog = mongoose.model('blogs', blogSchema);

module.exports = blog;