const Item = require('../models/itemModel');

const itemController = {};

itemController.addItem = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    const { item_name, item_description, item_status, item_cost, item_photo } =
      req.body;
    const createdItem = await Item.create({
      item_name,
      item_description,
      item_status,
      item_cost,
      item_photo,
    });
    res.locals.item = createdItem;
    return next();
  } catch (err) {
    next(console.log('you have an error: ', err));
  }
};

itemController.getItems = async (req, res, next) => {
  try {
    const all = await Item.find();
    res.locals.allItems = all;
    return next();
  } catch (error) {
    return next('you have an error: ', error);
  }
};

itemController.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { item_name, item_description, item_status, item_cost, item_photo } =
      req.body;
    const itemToUpdate = await Item.findOneAndUpdate(
      { _id: id },
      {
        item_name: item_name,
        item_cost: item_cost,
        item_status: item_status,
        item_description: item_description,
        item_photo: item_photo,
      },
      { new: true }
    );
    res.locals.changedItem = itemToUpdate;
    return next();
  } catch (err) {
    return next('err: ', err);
  }
};

itemController.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemToDelete = await Item.findOneAndDelete({ _id: id });
    res.locals.deletedItem = itemToDelete;
    return next();
  } catch (err) {
    return next('err: ', err);
  }
};


module.exports = itemController;