const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(cors());
app.use('/', testimonialsRoutes);

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

// app.get('/testimonials', (req, res) => {
//   res.json(db.testimonials);
// });

// app.get('/testimonials/random', (req, res) => {
//   const randomIndex = Math.floor(Math.random() * db.testimonials.length);
//   const item = db.testimonials[randomIndex];
//   res.json(item);
// });

// app.get('/testimonials/:id', (req, res) => {
//   const item = db.testimonials.find(i => i.id === req.params.id);
//   if (item) res.json(item);
//   else res.status(404).send('404 not found...');
// });

// app.post('/testimonials', (req, res) => {
//   const { author, text } = req.body;
//   if (!author || !text) {
//     return res.status(400).json({ message: 'Author and text are required' });
//   };
//   const newItem = { id: uuidv4(), author, text };
//   db.testimonials.push(newItem);
//   res.json({ message: 'OK' });
// });

// app.put('/testimonials/:id', (req, res) => {
//   const { author, text } = req.body;
//   const item = db.testimonials.find(i => i.id === req.params.id);
//   if (item) {
//     if (!author && !text) {
//       return res.status(400).json({ message: 'Author or text are required' });
//     };
//     if (author) item.author = author;
//     if (text) item.text = text;
//     res.json({ message: 'OK' });
//   } else res.status(404).send('404 not found...');
// });

// app.delete('/testimonials/:id', (req, res) => {
//   const item = db.testimonials.find(i => i.id === req.params.id);
//   const index = db.testimonials.indexOf(item);
//   if (index >= 0) {
//     db.testimonials.splice(index, 1);
//     res.json({ message: 'OK' });
//   } else res.status(404).send('404 not found...');
// });

app.use((req, res) => {
  res.status(404).send('404 not found...');
});