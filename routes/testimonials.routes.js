// testimonials.routes.js
const express = require('express');
const router = express.Router();
const TestimonialsMethods = require('../methods/testimonials.methods');

// get all testimonials
router.get('/testimonials', TestimonialsMethods.getAll);

// get random testimonial from existing array
router.get('/testimonials/random', TestimonialsMethods.getRandom);

// get testimonial with id
router.get('/testimonials/:id', TestimonialsMethods.getById);

// add new testimonial
router.post('/testimonials', TestimonialsMethods.post);

// modify testimonial
router.put('/testimonials/:id', TestimonialsMethods.modify);

// delete testimonial
router.delete('/testimonials/:id', TestimonialsMethods.delete);

module.exports = router;