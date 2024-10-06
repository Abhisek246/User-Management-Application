import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal'; // Import the modal
import SearchUser from './SearchUser';

const Home = () => {
  const [users, setUsers] = useState([]); // State to store fetched user data
  const { setDetails, searchedDetails } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store user ID to delete
  const [loading, setLoading] = useState(true); // Loading state
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      if (response.data.usersData || response.data.existingUsers) {
        setUsers(response.data.usersData || response.data.existingUsers);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/${id}`);
      fetchData();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const confirmDelete = (id) => {
    setSelectedUserId(id); // Store the user ID to delete
    setShowModal(true); // Show the modal
  };

  const handleConfirm = () => {
    handleDelete(selectedUserId); // Call delete when user confirms
    setShowModal(false); // Hide the modal
  };

  const handleCancel = () => {
    setShowModal(false); // Hide the modal without deleting
  };

  useEffect(() => {
    fetchData();
    setDetails({});
  }, []);

  return (
    <div className='home-container'>
      <SearchUser />
      <button className='btn-confirm add-button' onClick={() => nav('/user')}>Add</button>
      <h1>User Management Application</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* If searchedDetails has results, show them; otherwise, show all users */}
          {
            searchedDetails && searchedDetails.length > 0 ? (
              searchedDetails.map((user) => (
                <tr key={user._id}>
                  <td onClick={() => { setDetails({ ...user }); nav('/details'); }}>{user.name}</td>
                  <td onClick={() => { setDetails({ ...user }); nav('/details'); }}>{user.username}</td>
                  <td onClick={() => { setDetails({ ...user }); nav('/details'); }}>{user.email}</td>
                  <td><Trash onClick={() => confirmDelete(user._id)} /></td>
                </tr>
              ))
            ) : (
              users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td onClick={() => { setDetails({ ...user }); nav('/details'); }}>{user.name}</td>
                    <td onClick={() => { setDetails({ ...user }); nav('/details'); }}>{user.username}</td>
                    <td onClick={() => { setDetails({ ...user }); nav('/details'); }}>{user.email}</td>
                    <td><Trash onClick={() => confirmDelete(user._id)} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4'><span className='loading-spinner'></span></td>
                </tr>
              )
            )
          }
        </tbody>
      </table>

      {/* Show the modal if showModal is true */}
      {showModal && (
        <ConfirmationModal 
          message="Are you sure you want to delete this user?" 
          onConfirm={handleConfirm} 
          onCancel={handleCancel} 
        />
      )}
    </div>
  );
};

export default Home;
