import React from 'react';
import '../assets/styles.scss';
import Sold from '../components/Sold.jsx';

const sold = (status) => {
  if (status === true) {
    return <Sold />;
  }
};

const Item = ({ item, deleteItem, updateItem }) => {
  if (!item) return null;
  return (
    <div id='galleryItem'>
      <h3 className='itemDetail'>{item.item_name}</h3>
      <img className='itemImage' src={item.item_photo} />
      <div className='itemImage'>{item.item_description}</div>
      <div className='itemImage'>{item.item_cost}</div>
      <div>{sold(item.item_status)}</div>
      <button
        className='button'
        onClick={() => {
          deleteItem(item._id);
        }}
      >
        X
      </button>
      <button
        className='button'
        onClick={() => {
          updateItem(item._id);
        }}
      >
        Edit Item
      </button>
    </div>
  );
};

export default Item;
