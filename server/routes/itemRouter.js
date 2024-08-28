const express = require('express');
const item = express.Router();
const itemController = require('../controllers/itemController');

// post request to add items to gallery
item.post('/addItem', itemController.addItem, (req, res) => {
  console.log('newly added item object: ', res.locals.item);
  return res.status(200).json(res.locals.item);
});

item.get('/getItems', itemController.getItems, (req, res) => {
  console.log('here are all of the items: ', res.locals.allItems);
  return res.status(200).json(res.locals.allItems);
});

item.patch('/updateItem/:id', itemController.updateItem, (req, res) => {
  console.log('This is the newly changed item: ', res.locals.changedItem);
  return res.status(200).json(res.locals.changedItem);
});

item.delete('/deleteItem/:id', itemController.deleteItem, (req, res) => {
  console.log('This is the freshly deleted item', res.locals.deletedItem);
  return res.status(200).json(res.locals.deletedItem);
});
module.exports = item;