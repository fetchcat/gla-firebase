import React, { useState, useContext } from 'react';

// Toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ItemForm.scss';

import { FaPlus } from 'react-icons/fa';

import ItemContext from '../../context/ItemContext';

const ItemForm = () => {
  const [name, setName] = useState('');

  const { items, addItem } = useContext(ItemContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if exists
    const alreadyExists = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    // If already in list, message and return
    if (name.length === 0) {
      toast('Please enter an item');
      return;
    }

    // If already in list, message and return
    if (alreadyExists) {
      toast('Item already exists');
      return;
    }
    // Add to Context, display message, and reset form
    addItem(name);
    toast('Item added successfully');
    setName('');
  };

  const handleChange = (e) => setName(e.target.value);

  return (
    <form className='item-form' onSubmit={handleSubmit}>
      <label htmlFor='name' className='item-form__label'>
        <input
          type='text'
          className='item-form__input'
          placeholder='Add Item...'
          value={name}
          onChange={handleChange}
          maxLength={15}
        />
        <button className='button button--add'>
          <FaPlus className='button__icon' />
        </button>
      </label>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </form>
  );
};

export default ItemForm;
