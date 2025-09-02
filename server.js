const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(cors());

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const db = [
  { id: uuidv4(), author: 'John Doe', text: 'This company is worth every coin!' },
  { id: uuidv4(), author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: uuidv4(), author: 'John Malkovich', text: 'They really know how to make you happy.' },
  { id: uuidv4(), author: 'Bruce Wayne', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  const item = db[randomIndex];
  res.json(item);
});

app.get('/testimonials/:id', (req, res) => {
  const item = db.find(i => i.id === req.params.id);
  if (item) res.json(item);
  else res.status(404).send('404 not found...');
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ message: 'Author and text are required' });
  };
  const newItem = { id: uuidv4(), author, text };
  db.push(newItem);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const item = db.find(i => i.id === req.params.id);
  if (item) {
    if (!author && !text) {
      return res.status(400).json({ message: 'Author or text are required' });
    };
    if (author) item.author = author;
    if (text) item.text = text;
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

app.delete('/testimonials/:id', (req, res) => {
  const item = db.find(i => i.id === req.params.id);
  const index = db.indexOf(item);
  if (index >= 0) {
    db.splice(index, 1);
    res.json({ message: 'OK' });
  } else res.status(404).send('404 not found...');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});