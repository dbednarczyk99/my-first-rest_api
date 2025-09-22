// concerts.routes.js
const express = require('express');
const router = express.Router();
const ConcertsMethods = require('../methods/concerts.methods');

// get all concerts
router.get('/concerts', ConcertsMethods.getAll);

// get concert with id
router.get('/concerts/:id', ConcertsMethods.getById);

// add new concert
router.post('/concerts', ConcertsMethods.post);

// modify concert
router.put('/concerts/:id', ConcertsMethods.modify);

// delete concert
router.delete('/concerts/:id', ConcertsMethods.delete);

module.exports = router;