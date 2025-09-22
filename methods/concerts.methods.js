// concerts.methods.js

const Concerts = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concerts.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }  
};

exports.post = async (req, res) => {
  try {
    const newConcert = new Concerts({ 
      performer: req.body.performer, 
      genre: req.body.genre, 
      price: req.body.price,
      day: req.body.day,
      image: req.body.image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }  
};

exports.modify = async (req, res) => {
  try {
    const concert = await Concerts.findById(req.params.id);
    if(concert) {
      await Concerts.updateOne({ _id: req.params.id }, 
        { $set: {performer: req.body.performer,
          genre: req.body.genre,
          price: req.body.price,
          day: req.body.day,
          image: req.body.image} 
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
    const deletedConcert = await Concerts.findByIdAndDelete(req.params.id);
    if(deletedConcert) {
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }  
};