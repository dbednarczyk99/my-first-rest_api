// testimonials.routes.js
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const db = require('./../db');
const testimonials = db.testimonials;

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(testimonials);
});

// get random testimonial from existing array
router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * testimonials.length);
  const item = testimonials[randomIndex];
  res.json(item);
});

// get testimonial with id
router.route('/testimonials/:id').get((req, res) => {
  const item = testimonials.find(i => i.id === req.params.id);
  if (item) res.json(item);
  else res.status(404).send('404 not found...');
});

// add new testimonial
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ message: 'All the fields are required!' });
  };
  const newItem = { id: uuidv4(), author, text };
  testimonials.push(newItem);
  res.json({ message: 'OK' });
});

// modify testimonial
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const item = testimonials.find(i => i.id === req.params.id);
  if (item) {
    if (!author && !text) {
      return res.status(400).json({ message: 'At least one value must be modified!' });
    };
    if (author) item.author = author;
    if (text) item.text = text;
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

// delete testimonial
router.route('/testimonials/:id').delete((req, res) => {
  const item = testimonials.find(i => i.id === req.params.id);
  const index = testimonials.indexOf(item);
  if (index >= 0) {
    testimonials.splice(index, 1);
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

module.exports = router;