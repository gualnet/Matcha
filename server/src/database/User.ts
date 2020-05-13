import mongoose, { Schema } from "mongoose";



const UserSchema: Schema = new mongoose.Schema({
  // id: {type: String, unique: true},
  token: String,
  login: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String,
  bio: String,
  mail: {type: String, unique: true},
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

export default mongoose.model('User', UserSchema);

export interface IUser extends Document {
  // id: String,
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
}