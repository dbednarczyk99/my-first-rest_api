// seats.routes.js
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const db = require('./../db');
const seats = db.seats;

// get all seats
router.route('/seats').get((req, res) => {
  res.json(seats);
});

// get seat with id
router.route('/seats/:id').get((req, res) => {
  const item = seats.find(i => i.id === req.params.id);
  if (item) res.json(item);
  else res.status(404).send('404 not found...');
});

// add new seat
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  if (!day || !seat || !client || !email) {
    return res.status(400).json({ message: 'All the fields are required!' });
  };
  const newItem = { id: uuidv4(), day, seat, client, email };
  seats.push(newItem);
  res.json({ message: 'OK' });
});

// modify seat
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const item = seats.find(i => i.id === req.params.id);
  if (item) {
    if (!day && !seat && !client && !email) {
      return res.status(400).json({ message: 'At least one value must be modified!' });
    };
    if (day) item.day = day;
    if (seat) item.seat = seat;
    if (client) item.client = client;
    if (email) item.email = email;
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

// delete seat
router.route('/seats/:id').delete((req, res) => {
  const item = seats.find(i => i.id === req.params.id);
  const index = seats.indexOf(item);
  if (index >= 0) {
    seats.splice(index, 1);
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

module.exports = router;