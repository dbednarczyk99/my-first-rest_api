// seats.methods.js

const Seats = require('../models/seats.model');
const Clients = require('../models/clients.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find().populate('client'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seats.findById(req.params.id).populate('client');
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }  
};

exports.post = async (req, res) => {
  try {
    const newClient = new Clients({
      name: req.body.client,
      email: req.body.email
    });
    await newClient.save();
    const newSeat = new Seats({ 
      day: req.body.day, 
      seat: req.body.seat, 
      client: newClient._id
    });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }  
};

exports.modify = async (req, res) => {
  try {
    const seat = await Seats.findById(req.params.id);
    if(seat) {
      await Seats.updateOne({ _id: req.params.id }, 
        { $set: {day: req.body.day,
          seat: req.body.seat,
          client: req.body.client}
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
    const deletedSeat = await Seats.findByIdAndDelete(req.params.id);
    if(deletedSeat) {
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }  
};