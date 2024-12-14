const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Email doit être unique
  },
  isConfirmed: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
