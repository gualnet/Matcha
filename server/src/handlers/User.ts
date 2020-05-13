import UserModel, { IUser } from '../database/User';
import { Error } from 'mongoose';

import UserType, {inputUpdateUserType} from '../graphql/User/type';

const getAllUsers = async () => {
  try {
    
    const usersFound = await UserModel.find();
    return usersFound
  } catch (error) {
    console.error(error)
    return new Error("Internal error")
  }
}

const getUserById = async (id: string) => {
  try {
    const userFound = await UserModel.findById(id)
    return userFound
  } catch (error) {
    console.error("111", error);
    return new Error("Internal error")
  }
}

const createNewUser = async (args: object) => {
  console.log("createNewUser\n", args)

  try {
    const userCreated = await UserModel.create(args);
    return userCreated;
  } catch (error) {
    console.error(error);
    return new Error("Internal error")
  }
}

const updateUser = async (args: any) => {
  try {
    const {id, data} = args
    return await UserModel.findByIdAndUpdate(id, {...data}, {new: true})
  } catch (error) {
    console.error(error)
    return new Error("Internal error")
  }
}

export default {
  getAllUsers,
  getUserById,

  createNewUser,
  updateUser,
}