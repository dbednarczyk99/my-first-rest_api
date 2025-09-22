// seats.routes.js

const express = require('express');
const router = express.Router();
const SeatsMethods = require('../methods/seats.methods');

// get all seats
router.get('/seats', SeatsMethods.getAll);

// get seat with id
router.get('/seats/:id', SeatsMethods.getById);

// add new seat
router.post('/seats', SeatsMethods.post);

// modify seat
router.put('/seats/:id', SeatsMethods.modify);

// delete seat
router.delete('/seats/:id', SeatsMethods.delete);

module.exports = router;