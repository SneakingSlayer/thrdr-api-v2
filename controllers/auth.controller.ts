import { Request, Response } from "express";

import { hash, compare } from "../utils/hash";

import jwt from "jsonwebtoken";

import Users from "../models/users.model";
import { isCorrectLength, isStrongPassword } from "../utils/validators";

interface SignInProps {
  username?: string;
  email?: string;
  password: string;
}

interface SignUpProps {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  description: string;
  avatar: string;
  log: {
    ip: string;
    device: {
      type: Object;
      required: false;
    };
    browser: string;
    location: string;
  };
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, username, password }: SignInProps = req.body;
    const findUser = await Users.findOne({
      $or: [{ userName: username }, { email: email }],
    });
    console.log(findUser);
    if (!findUser) throw "Incorrect username or email.";
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw "Incorrect password.";
    const token = jwt.sign(
      { _id: findUser._id },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "3d",
      }
    );
    res.header("token", token).send({
      user: findUser,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { password }: SignUpProps = req.body;
    const isValidPassword =
      isStrongPassword(password) && isCorrectLength(password, 8, "min");
    if (!isValidPassword)
      throw "Password must be atleast 8 characters and contains alteast 1 special character or 1 number.";
    const hashPass = await hash(password);
    const newUser = new Users({ ...req.body, password: hashPass });
    const savedUser = await newUser.save();
    res.status(200).json({ message: "User successfully registered." });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
