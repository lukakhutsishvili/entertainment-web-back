import { Request, Response } from "express";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      email,
      password: hashedPassword,
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
    const user = await User.findOne(
      { email },
      {
        _id: 0,
        __v: 0,
      }
    );
    if (!user) {
      return res.status(404).json();
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const signData = {
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(signData, process.env.JWT_SECRET!);
      return res.status(201).json({ ...signData, token });
    }
    return res.status(201).json(user);
  } catch (error) {
    return res.status(401).json(error);
  }
};
