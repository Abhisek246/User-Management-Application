import React, { useContext, useEffect, useState } from 'react';
import './SearchUser.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const SearchUser = () => {
    const [users, setUsers] = useState([]); // State to hold all users
    const {setSearchedDetails} = useContext(StoreContext);

    // Fetch all users data on component mount
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/');
            if (response.data.usersData || response.data.existingUsers) {
                setUsers(response.data.usersData || response.data.existingUsers);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch users');
        }
    };

    // Handle search input change
    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(search) || 
            user.username.toLowerCase().includes(search)
        );
        setSearchedDetails(filteredUsers); // Set the search results
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    return (
        <div className='search'>
            <input 
                type="text" 
                placeholder='Search by name or username...' 
                className='search-input' 
                onChange={handleSearch}
            />
            {/* Render search results */}
            {/* <div className='result'>
                {searchedDetails.length > 0 ? (
                    searchedDetails.map(user => (
                        <div key={user._id} className='user-details'>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            {/* You can display more user details here if needed */}
                        {/* </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div> */} 
        </div>
    );
};

export default SearchUser;
