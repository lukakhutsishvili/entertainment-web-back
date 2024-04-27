import { Request, Response } from "express";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import addUserSchema from "../schemas/add-user-schemas.js";

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const validator = await addUserSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(201).json(error.details);
    }

    const { email, password, bookMarkedMovies } = value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      bookMarkedMovies,
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
      return res.status(404).json({ emailError: "incorrect email" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const signData = {
        email: user.email,
        id: user.id,
        bookMarkedMovies: user.bookMarkedMovies,
      };
      const token = jwt.sign(signData, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      return res.status(201).json({ ...signData, token });
    } else if (!result) {
      return res.status(401).json({ passwordError: "incorrect password" });
    }
    return res.status(201).json(user);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getBookMarkedMovies = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (user) {
      return res.status(200).json(user.bookMarkedMovies);
    }
  } catch (error) {
    return res.status(404).json({ message: "user not found" });
  }
};
