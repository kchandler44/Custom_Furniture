import React from 'react';
import '../assets/styles.scss';

const Item = ({ item, deleteItem, updateItem }) => {
  if (!item) return null;
  return (
    <div id='galleryItem'>
      <h2>{item.item_name}</h2>
      <img src={item.item_photo} />
      <div>{item.item_description}</div>
      <div>{item.item_cost}</div>
      <div>{item.item_status}</div>
      <button
        className='button'
        onClick={() => {
          deleteItem(item._id);
        }}
      >
        Delete Item
      </button>
      <button
        className='button'
        onClick={() => {
          updateItem(item._id);
        }}
      >
        Update Item
      </button>
    </div>
  );
};

export default Item;
