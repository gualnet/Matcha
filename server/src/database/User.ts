const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  token: String,
  login: String,
  password: String,
  firstName: String,
  lastName: String,
  bio: String,
  mail: String,
  blockedUsers: String,
  reported: String,
  age: Number,
  gender: Number,
  orientation: Number,
  interest: Number,
  popularity: Number,
  height: Number,
  eyeColor: Number,
  hairColor: Number,
  geolocAuth: Boolean,
  connected: Boolean,
});

module.exports = mongoose.model('User', UserSchema);