// details.js

const axios = require('axios');
const User = require('../modals/UserModel.js'); // Ensure this points to the correct model

// Fetch details and insert them into the database
const getDetails = async (req, res) => {
  try {
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
      // If users already exist, return them
      return res.status(200).json({ message: 'User collection already contains data', existingUsers });
    }

    // Fetch new users from external API
    const userPromises = [];
    for (let i = 1; i <= 10; i++) {
      userPromises.push(axios.get(`https://jsonplaceholder.typicode.com/users/${i}`));
    }

    const responses = await Promise.all(userPromises);
    const usersData = responses.map((response) => response.data);

    // Insert into the database
    await User.insertMany(usersData);
    res.status(200).json({ message: 'User details successfully inserted into the database', usersData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user details' });
  }
};

const deleteDetail = async (req, res) => {
  const { id } = req.params; // Extract ID from the request params
  console.log('Deleting user with ID:', id);

  try {
    const deletedUser = await User.findByIdAndDelete(id); // Use findByIdAndDelete to remove the user
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' }); // Return 404 if the user is not found
    }

    console.log('User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

const addUserDetail = async (req,res)=>{
  const userData = req.body;
  try {
    console.log('Received user data:', userData);

    // Optionally, save the user data to the database
    const newUser = new User(userData); // Create a new user instance
    await newUser.save(); // Save to the database

    res.status(201).json({ message: 'User added successfully', newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user' });
  }
}


const updateUser = async (req, res) => {
  const { id } = req.params; // Extract user ID from the request params
  const { username, name, email, website, phone, address } = req.body; // Extract updated data from request body

  try {
      // Find user by ID and update with new data
      const updatedUser = await User.findByIdAndUpdate(
          id, // User ID
          { 
              username,
              name,
              email,
              website,
              phone,
              address: {
                  street: address.street,
                  city: address.city
              }
          },
          { new: true } // Return the updated document
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { getDetails, deleteDetail, addUserDetail, updateUser };

