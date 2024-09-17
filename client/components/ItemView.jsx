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
      <h2>{item.item_name}</h2>
      <img src={item.item_photo} />
      <div>{item.item_description}</div>
      <div>{item.item_cost}</div>
      <div>{sold(item.item_status)}</div>
    </div>
  );
};

export default ItemView;
