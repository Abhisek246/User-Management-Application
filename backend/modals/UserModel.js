// const mongoose = require('mongoose');
// const validator = require('validator');

// // Define the User Schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     minlength: [3, 'Name must be at least 3 characters'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     validate: {
//       validator: validator.isEmail,
//       message: 'Please enter a valid email address',
//     },
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//   },
//   username: {
//     type: String,
//     required: [true, 'Username is required'],
//     minlength: [3, 'Username must be at least 3 characters'],
//     unique: true,
//     immutable: true, // Non-editable after creation
//   },
//   address: {
//     street: {
//       type: String,
//       required: [true, 'Street is required'],
//     },
//     city: {
//       type: String,
//       required: [true, 'City is required'],
//     },
//   },
//   companyName: {
//     type: String,
//     minlength: [3, 'Company name must be at least 3 characters'],
//     required: false,
//   },
//   website: {
//     type: String,
//     validate: {
//       validator: function (v) {
//         return v ? validator.isURL(v) : true; // If provided, it should be a valid URL
//       },
//       message: 'Please enter a valid URL',
//     },
//     required: false,
//   },
// });

// // Middleware to auto-fill the username field on user creation
// userSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this.username = `USER-${this.name}`; // Auto-fill username format
//   }
//   next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;


const mongoose = require('mongoose');
const validator = require('validator');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address',
    },
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters'],
    unique: true,
    immutable: true, // Non-editable after creation
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
  },
  companyName: {
    type: String,
    minlength: [3, 'Company name must be at least 3 characters'],
    required: false, // Optional field
    validate: {
      validator: function (v) {
        // Only validate if companyName is provided
        return !v || v.length >= 3;
      },
      message: 'Company name must be at least 3 characters',
    },
  },
  website: {
    type: String,
    validate: {
      validator: function (v) {
        // If provided, it should be a valid URL, otherwise it's optional
        return v ? validator.isURL(v) : true;
      },
      message: 'Please enter a valid URL',
    },
    required: false, // Optional field
  },
});

// Middleware to auto-fill the username field on user creation
userSchema.pre('save', function (next) {
  if (this.isNew && !this.username) {
    this.username = `USER-${this.name}`; // Auto-fill username format
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
