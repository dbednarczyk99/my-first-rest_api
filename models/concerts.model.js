// concerts.model.js

const mongoose = require('mongoose');

const concertsShchema = new mongoose.Schema({
    performer: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true }, 
    day: { type: Number, required: true },
    image: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Concerts', concertsShchema);