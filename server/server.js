import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'express-async-errors';
import dotenv from 'dotenv';

import cors from 'cors';
import mongoose from 'mongoose';
import { DbConnectionError } from './errors/db-connection-error.js';
import itemRouter from './routes/itemRouter.js';
import { NotFoundError } from './errors/not-found-error.js';
import { CustomError } from './errors/custom-error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname + '../../.env') });

const app = express();

const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Database connected...');
  } catch (err) {
    throw new DbConnectionError();
  }
};

//link database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
  })
);

app.use('/api/item', itemRouter);
// serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use('*', (req, res) => {
  throw new NotFoundError();
});

//global error handler
app.use('*', (err, req, res, next) => {
  // log error for dev use
  console.log(err.message);
  // check if incoming error extends the CustomError class
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.formatError());
  }
  // if not a custom error, send default internal error message
  return res.status(500).send({ message: 'Something went wrong' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
