import { Request, Response } from "express";
import Movies from "../models/movies.js";
import User from "../models/user-model.js";

export const getAllMovies = async (_: Request, res: Response) => {
  try {
    const getItems = await Movies.find();
    return res.status(201).json(getItems);
  } catch (error) {
    return res.status(401).json();
  }
};

export const sendBookmarkedMovies = async (req: Request, res: Response) => {
  const { id, movies } = req.body;
  try {
    let user = await User.findOne({ id });
    if (user) {
      const index = user.bookMarkedMovies.indexOf(movies);
      if (index !== -1) {
        user.bookMarkedMovies.splice(index, 1);
      } else {
        user.bookMarkedMovies.push(movies);
      }
      await user.save();
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
