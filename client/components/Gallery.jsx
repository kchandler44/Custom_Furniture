import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/styles.scss';
import Item from '../components/Item.jsx';

const Gallery = () => {
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  //will make it so this is a dropdown with available/sold options
  const [itemStatus, setItemStatus] = useState('');
  //will change from 0 so items don't accidentally get posted for $0
  const [itemCost, setItemCost] = useState('');
  const [itemPhoto, setItemPhoto] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/item/getItems');
      const jsonData = await data.json();
      console.log(jsonData);
      setItem(jsonData);
    };
    const result = fetchData().catch(console.error);
  }, []);

  const addItem = async () => {
    if (
      itemName !== '' &&
      itemDescription !== '' &&
      itemPhoto !== '' &&
      itemCost !== '' &&
      itemStatus !== ''
    ) {
      const newItem = {
        item_name: itemName,
        item_description: itemDescription,
        item_photo: itemPhoto,
        item_cost: itemCost,
        item_status: itemStatus,
      };
      const response = await fetch('http://localhost:3000/item/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const responseData = await response.json();
        setItem((previous) => [...previous, responseData]);
        console.log('responseData: ', responseData);
        setItemName('');
        setItemCost('');
        setItemPhoto('');
        setItemDescription('');
        setItemStatus('');
      } else {
        console.log('Failed to add task due to missing information');
      }
    }
  };

  const deleteItem = async (itemId) => {
    try {
      console.log('itemId: ', itemId);
      const response = await fetch(
        `http://localhost:3000/item/deleteItem/${itemId}`,
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
      itemCost !== '' ||
      itemStatus !== ''
    ) {
      const updatedItem = {
        item_name: itemName,
        item_description: itemDescription,
        item_photo: itemPhoto,
        item_cost: itemCost,
        item_status: itemStatus,
      };
      try {
        const response = await fetch(
          `http://localhost:3000/item/update/${itemId}`,
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
            console.log('prevItems', prevItems);
            prevItems.map((item) =>
              item._id === itemId ? updatedItemData : item
            );
          });
          setItemName('');
          setItemCost('');
          setItemPhoto('');
          setItemDescription('');
          setItemStatus('');
          console.log('Item successfully updated');
        } else {
          console.log('Failed to update item');
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
          Status
          <input
            className='detailInput'
            type='text'
            value={itemStatus}
            onChange={(e) => setItemStatus(e.target.value)}
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
