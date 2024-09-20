import React from 'react';
import '../assets/styles.scss';
import Sold from '../components/Sold.jsx';

const sold = (status) => {
  if (status === true) {
    return <Sold />;
  }
};

const ItemView = ({ item }) => {
  if (!item) return null;
  return (
    <div id='galleryItem'>
      <h3 className='itemDetail'>{item.item_name}</h3>
      <img className='itemImage' src={item.item_photo} />
      <div className='itemDetail'>{item.item_description}</div>
      <div className='itemDetail'>${item.item_cost}</div>
      <div>{sold(item.item_status)}</div>
    </div>
  );
};

export default ItemView;
