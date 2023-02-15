import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/users.model";

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
  const { email, username, password }: SignInProps = req.body;
  const findUser = await Users.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!findUser) return res.status(400).send("Email or Username not found.");
  const checkPassword = await bcrypt.compare(password, findUser.password);
  if (!checkPassword) return res.status(400).send("Invalid password.");
  const token = jwt.sign(
    { _id: findUser._id },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: "3d",
    }
  );
  res.header("token", token).send({
    ...findUser,
    token: token,
  });
};

export const signUp = async (req: Request, res: Response) => {
  const { userName, email, password }: SignUpProps = req.body;

  const findEmail = await Users.findOne({ email: email });
  if (findEmail) return res.status(400).send("Email already exists.");
  const findUsername = await Users.findOne({ username: userName });
  if (findUsername) return res.status(400).send("Username already exists.");

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  const newUser = new Users({ ...req.body, password: hashPass });
  try {
    const savedUser = await newUser.save();
    res.status(200).send("User successfully registered.");
  } catch (error) {
    res.status(400).send(`There was a problem with your request.`);
  }
};
