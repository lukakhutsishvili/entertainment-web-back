import { Request, Response } from "express";
import User from "../models/user-model.js";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({
      email,
      password,
    });
    newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(401).json(error);
  }
};
