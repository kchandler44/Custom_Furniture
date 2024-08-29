import express from 'express';
import {
  addItem,
  getItems,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
const item = express.Router();

item.post('/addItem', addItem);

item.get('/getItems', getItems);

item.patch('/updateItem/:id', updateItem);

item.delete('/deleteItem/:id', deleteItem);

export default item;
