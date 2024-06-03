// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phoneNumber: String,
  busNumber: String, // Add busNumber field
  busRoute: String, // Add busRoute field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
