// server.js

const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});
const io = socket(server);
io.on('connection', (socket) => {
  console.log('New socket!');
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

// connects our backend code with the database
mongoose.connect('mongodb://0.0.0.0:27017/NewWaveDB');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));