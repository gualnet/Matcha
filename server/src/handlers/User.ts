import UserModel, { IUser } from '../database/User';
import { Error } from 'mongoose';

const getAllUsers = async () => {
  try {
    
    const usersFound = UserModel.find();
    return usersFound
  } catch (error) {
    console.error(error)
    return new Error("Internal error")
  }
}

const getUserById = async (id: string) => {
  try {
    const userFound = UserModel.findById(id)
    return userFound
  } catch (error) {
    console.error("111", error);
    return new Error("Internal error")
  }
}

const createNewUser = async (args: object) => {
  console.log("createNewUser\n", args)

  try {
    const userCreated = UserModel.create(args);
    return userCreated;
  } catch (error) {
    console.error(error);
    return new Error("Internal error")
  }
}

const updateUser = async (id: string, args: object) => {

  return null
}

export default {
  getAllUsers,
  getUserById,

  createNewUser,
  updateUser,
}