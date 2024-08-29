import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_name: { type: String, required: true },
  item_description: { type: String, required: false },
  item_cost: { type: Number, required: false },
  item_status: { type: Boolean, required: false },
  item_photo: { type: String, required: false }, //URL link to the image
});

const Item = mongoose.model('Item', itemSchema);
export { Item };
