// concerts.routes.js
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const db = require('./../db');
const concerts = db.concerts;

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

// get concert with id
router.route('/concerts/:id').get((req, res) => {
  const item = concerts.find(i => i.id === req.params.id);
  if (item) res.json(item);
  else res.status(404).send('404 not found...');
});

// add new concert
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ message: 'All the fields are required!' });
  };
  const newItem = { id: uuidv4(), performer, genre, price, day, image };
  concerts.push(newItem);
  res.json({ message: 'OK' });
});

// modify concert
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const item = concerts.find(i => i.id === req.params.id);
  if (item) {
    if (!performer && !genre && !price && !day && !image) {
      return res.status(400).json({ message: 'At least one value must be modified!' });
    };
    if (performer) item.performer = performer;
    if (genre) item.genre = genre;
    if (price) item.price = price;
    if (day) item.day = day;
    if (image) item.image = image;
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

// delete concert
router.route('/concerts/:id').delete((req, res) => {
  const item = concerts.find(i => i.id === req.params.id);
  const index = concerts.indexOf(item);
  if (index >= 0) {
    concerts.splice(index, 1);
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

module.exports = router;