// testimonials.methods.js

const Testimonials = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonials.findById(req.params.id);
    if(!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }  
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Department.findOne().skip(rand);
    if(!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const newTestimonial = new Testimonials({
      author: req.body.author,
      text: req.body.text
    });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }  
};

exports.modify = async (req, res) => {
  try {
    const testimonial = await Testimonials.findById(req.params.id);
    if(testimonial) {
      await Testimonials.updateOne({ _id: req.params.id }, 
        { $set: {author: req.body.author,
          text: req.body.text}
        });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }    
};

exports.delete = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonials.findByIdAndDelete(req.params.id);
    if(deletedTestimonial) {
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }  
};