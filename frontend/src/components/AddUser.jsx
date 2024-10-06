import React, { useContext, useState, useEffect } from 'react';
import './AddUser.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddUser = () => {
  const { details, setDetails } = useContext(StoreContext);
  const [data, setData] = useState({
    username: '',
    name: '',
    email: '',
    website: '',
    phone: '',
    address: {
      street: '',
      city: ''
    },
    companyName: '' // Company name initialized
  });

  const nav = useNavigate();

  // Use effect to populate form fields if `details` exists
  useEffect(() => {
    if (Object.keys(details).length > 0) {
      setData(details); // Pre-fill the form with existing details if navigating from "Details"
    } else {
      setData({
        username: '',
        name: '',
        email: '',
        website: '',
        phone: '',
        address: {
          street: '',
          city: ''
        },
        companyName: '' // Reset the form if navigating directly from "Home"
      });
    }
  }, [details]);

  // handleChange function to update state
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'street' || id === 'city') {
      setData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [id]: value
        }
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const { username, name, email, website, address, companyName } = data;
    const errors = [];

    // Name validation
    if (!name || name.length < 3) {
      errors.push('Name is required and must be at least 3 characters.');
    }

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.push('A valid email is required.');
    }

    // Username validation
    if (!username || username.length < 3) {
      errors.push('Username is required and must be at least 3 characters.');
    }

    // Address validation
    if (!address.street) {
      errors.push('Street is required.');
    }
    if (!address.city) {
      errors.push('City is required.');
    }

    // Website validation (if provided)
    if (website && !/^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w \.-]*)*\/?$/.test(website)) {
      errors.push('Please enter a valid URL.');
    }

    // Company name validation (optional, but if provided must be at least 3 characters)
    if (companyName && companyName.length < 3) {
      errors.push('Company name must be at least 3 characters if provided.');
    }

    return errors;
  };

  // handleSubmit function to submit the form
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    const errors = validateForm();

    if (errors.length > 0) {
      errors.forEach(error => {
        toast.error(error);
      });
      return; // Stop the form from submitting
    }

    if (Object.keys(details).length > 0) {
      // If editing, update the existing user
      axios.put(`http://localhost:3000/user/${details._id}`, data)
        .then(response => {
          setDetails({}); // Clear the details after editing
          nav('/'); // Navigate back to the Home page
          toast.success(response.data.message);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          toast.error('Error updating user');
        });
    } else {
      // If adding a new user, post the data
      axios.post('http://localhost:3000/user', data)
        .then(response => {
          setDetails({}); // Clear the details after adding
          nav('/'); // Navigate back to the Home page
          toast.success(response.data.message);
        })
        .catch(error => {
          console.error('Error adding user:', error);
          toast.error('Error adding user');
        });
    }
  };

  return (
    <div className='add-container'>
      <h1>{Object.keys(details).length > 0 ? 'Update User Details' : 'Add User Details'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label><br/>
        <input
          type="text"
          id='username'
          placeholder='username'
          value={data.username}
          onChange={Object.keys(details).length === 0 ? handleChange : undefined}
        /><br/><br/>

        <label htmlFor="name">Name</label><br/>
        <input
          type="text"
          id='name'
          placeholder='name'
          value={data.name}
          onChange={handleChange}
        /><br/><br/>

        <label htmlFor="email">Email</label><br/>
        <input
          type="text"
          id='email'
          placeholder='email'
          value={data.email}
          onChange={handleChange}
        /><br/><br/>

        <label htmlFor="website">Website</label><br/>
        <input
          type="text"
          id='website'
          placeholder='website'
          value={data.website}
          onChange={handleChange}
        /><br/><br/>

        <label htmlFor="phone">Phone</label><br/>
        <input
          type="text"
          id='phone'
          placeholder='phone'
          value={data.phone}
          onChange={handleChange}
        /><br/><br/>

        <label htmlFor="street">Street</label><br/>
        <input
          type="text"
          id='street'
          placeholder='street'
          value={data.address.street}
          onChange={handleChange}
        /><br/><br/>

        <label htmlFor="city">City</label><br/>
        <input
          type="text"
          id='city'
          placeholder='city'
          value={data.address.city}
          onChange={handleChange}
        /><br/><br/>

        <label htmlFor="companyName">Company name (optional)</label><br/>
        <input
          type="text"
          id='companyName'
          placeholder='Company name'
          value={data.companyName}
          onChange={handleChange}
        /><br/><br/>

        <button className='btn-confirm' type="submit">{Object.keys(details).length > 0 ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default AddUser;
