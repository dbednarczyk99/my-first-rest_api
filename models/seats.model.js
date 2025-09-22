const mongoose = require('mongoose');

const seatsShchema = new mongoose.Schema({
    day: { type: Number, required: true },
    seat: { type: Number, required: true },
    client: { type: String, required: true, ref: 'Clients' }
}, { versionKey: false });

module.exports = mongoose.model('Seats', seatsShchema);