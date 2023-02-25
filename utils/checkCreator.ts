import Users from "../models/users.model";
import { nameGenerator } from "./nameGenerator";
import { isValidObjectId } from "mongoose";
export const checkCreator = async (id: string) => {
  if (!id) {
    return {
      id: null,
      userName: nameGenerator(),
      avatar: null,
    };
  }
  const findCreator = await Users.findOne(
    isValidObjectId(id) ? { _id: id } : { userName: id }
  );
  if (!findCreator) throw "User not found.";
  return {
    id: findCreator._id,
    userName: findCreator.userName,
    avatar: findCreator.avatar,
  };
};
