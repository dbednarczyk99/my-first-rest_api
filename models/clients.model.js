const mongoose = require('mongoose');

const clientsShchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
}, { versionKey: false });

module.exports = mongoose.model('Clients', clientsShchema);