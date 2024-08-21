const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_name: { type: String, required: true },
  item_description: { type: String, required: true },
  item_cost: { type: Number, required: true },
  item_status: { type: Boolean, required: true },
  item_photo: { type: String, required: true }, //URL link to the image
});

module.exports = mongoose.model('Item', itemSchema);
