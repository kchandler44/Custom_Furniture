import React, { useState, useEffect } from 'react';
import '../assets/styles.scss';
import { v4 as uuidv4 } from 'uuid';
import ItemView from '../components/ItemView.jsx';

const GalleryView = () => {
  const [viewedItem, setViewedItem] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/item/getItems');
      if (response.ok) {
        const responseData = await response.json();
        setViewedItem(responseData);
      } else {
        throw new Error(`Response status: , ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error: ', error.message);
    }
  };

  const viewedItems = viewedItem.map((item) => {
    const uniqueKey = uuidv4();
    return <ItemView item={item} key={uniqueKey} />;
  });

  return <div>{viewedItems}</div>;
};

export default GalleryView;
