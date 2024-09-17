import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/styles.scss';
import Item from './Item.jsx';

const Gallery = ({ userId }) => {
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  // default set to "available/true". checkbox will show "Sold"
  const [itemIsSold, setItemIsSold] = useState(false);
  //will change from 0 so items don't accidentally get posted for $0
  const [itemCost, setItemCost] = useState('');
  const [itemPhoto, setItemPhoto] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/item/getItems');
      if (response.ok) {
        const responseData = await response.json();
        setItem(responseData);
      } else {
        throw new Error(`Response status: , ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error: ', error.message);
    }
  };

  const changeItemStatus = (checked) => {
    setItemIsSold(checked);
  };
  const addItem = async () => {
    if (
      itemName !== '' &&
      itemDescription !== '' &&
      itemPhoto !== '' &&
      itemCost !== ''
    ) {
      const newItem = {
        item_name: itemName,
        item_description: itemDescription,
        item_photo: itemPhoto,
        item_cost: itemCost,
        item_status: itemIsSold,
      };
      const response = await fetch('http://localhost:3000/api/item/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const responseData = await response.json();
        setItem((previous) => [...previous, responseData]);
        setItemName('');
        setItemCost('');
        setItemPhoto('');
        setItemDescription('');
        setItemIsSold(false);
      } else {
      }
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/item/deleteItem/${itemId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        setItem((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        console.log('Failed to delete the item');
      }
    } catch (error) {
      console.log('error');
    }
  };

  const updateItem = async (itemId) => {
    if (
      itemName !== '' ||
      itemDescription !== '' ||
      itemPhoto !== '' ||
      itemCost !== ''
    ) {
      const updatedItem = {
        item_name: itemName,
        item_description: itemDescription,
        item_photo: itemPhoto,
        item_cost: itemCost,
        item_status: itemIsSold,
      };
      try {
        const response = await fetch(
          `http://localhost:3000/api/item/update/${itemId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
          }
        );
        if (response.ok) {
          const updatedItemData = await response.json();
          setItem((prevItems) => {
            prevItems.map((item) =>
              item._id === itemId ? updatedItemData : item
            );
          });
          setItemName('');
          setItemCost('');
          setItemPhoto('');
          setItemDescription('');
        } else {
        }
      } catch (error) {
        console.log('Error updating item:', error);
      }
    }
  };

  const items = item.map((item) => {
    const uniqueKey = uuidv4();
    return (
      <Item
        item={item}
        key={uniqueKey}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
    );
  });

  return (
    <div className='gallery'>
      {items}
      <div id='details'>
        <div>
          Item Name
          <input
            className='detailInput'
            type='text'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          ></input>
        </div>
        <div>
          Item Description
          <input
            className='detailInput'
            type='text'
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          ></input>
        </div>
        <div>
          Photo URL
          <input
            className='detailInput'
            type='text'
            value={itemPhoto}
            onChange={(e) => setItemPhoto(e.target.value)}
          ></input>
        </div>
        <div>
          Item Cost
          <input
            className='detailInput'
            type='text'
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
          ></input>
        </div>
        <div>
          Sold
          <input
            className='detailInput'
            type='checkbox'
            checked={itemIsSold}
            onChange={(e) => changeItemStatus(e.target.checked)}
          ></input>
        </div>
        <div>
          <button
            className='button'
            onClick={(e) => {
              addItem(e.target.value);
            }}
          >
            Add New Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
