const mongoose = require('mongoose');

const testimonialsShchema = new mongoose.Schema({
    author: { type: String, required: true }, 
    text: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Testimonials', testimonialsShchema);