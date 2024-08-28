const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
// require in home router
const item = require('../server/routes/itemRouter');
// require in home router
const item = require('../server/routes/itemRouter');

//link database
//link database
const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongoURI);
    console.log('Database connected...');
  } catch (err) {
    return next(`Error: ${err}`);
    return next(`Error: ${err}`);
  }
};
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
  })
);

app.use('/item', item);
//statically serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('Error 404!');
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: "I'm sorry, I can't find the page you're looking for." },
  };
  const errorObj = Object.assign({}, defaultErr, err);
});

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;