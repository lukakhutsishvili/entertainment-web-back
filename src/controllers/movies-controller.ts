import { Request, Response } from "express";
import Movies from "../models/movies.js";
import BookedMovies from "../models/bookmarked.js";

export const getAllMovies = async (_: Request, res: Response) => {
  try {
    const getItems = await Movies.find();
    return res.status(201).json(getItems);
  } catch (error) {
    return res.status(401).json();
  }
};

export const sendBookmarkedMovies = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  try {
    let user = await BookedMovies.findOne({ id });
    if (user) {
      const index = user.movies.indexOf(name);
      if (index !== -1) {
        user.movies.splice(index, 1);
      } else {
        user.movies.push(name);
      }
      await user.save();
    } else {
      user = await BookedMovies.create({ id, movies: [name] });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
