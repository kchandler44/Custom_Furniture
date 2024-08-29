import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// currently allowing multiple posts in case he is selling the same type of item.
const itemSchema = new Schema({
  item_name: { type: String, required: true },
  item_description: { type: String, required: true },
  item_cost: { type: Number, required: true},
  item_status: { type: Boolean, required: true },
  item_photo: { type: String, required: true }, //URL link to the image
});

const Item = mongoose.model('Item', itemSchema);
export { Item };
