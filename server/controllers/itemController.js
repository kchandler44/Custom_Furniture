import { BadRequestError } from '../customErrors/bad-request-error.js';
import { NotFoundError } from '../customErrors/not-found-error.js';

import { Item } from '../models/itemModel.js';

// adds new item to gallery list
export const addItem = async (req, res) => {
  const { item_name, item_description, item_status, item_cost, item_photo } =
    req.body;
  const createdItem = await Item.create({
    item_name,
    item_description,
    item_status,
    item_cost,
    item_photo,
  });
  if (!createdItem) {
    throw new BadRequestError('Invalid inputs');
  }
  res.status(201).send(createdItem);
};

// gets full list of gallery items
export const getItems = async (req, res) => {
  const allItems = await Item.find();
  if (!allItems) {
    throw new NotFoundError('Items not found');
  }
  res.status(201).send(allItems);
};

// allows authorized user to update the gallery item
export const updateItem = async (req, res) => {
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
  if (!itemToUpdate) {
    throw new BadRequestError('Item not updated');
  }
  res.status(201).send(itemToUpdate);
};

// allows user to delete the item
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const itemToDelete = await Item.findOneAndDelete({ _id: id });
  if (!itemToDelete) {
    throw new BadRequestError('Item unable to be deleted');
  }
  res.status(201).send(itemToDelete);
};
