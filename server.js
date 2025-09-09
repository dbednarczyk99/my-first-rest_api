const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// app.listen(8000, () => {
//   console.log('Server is running on port: 8000');
// });
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New socket!');
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);