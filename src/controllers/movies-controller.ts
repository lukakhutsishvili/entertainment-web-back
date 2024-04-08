import { Request, Response } from "express";
import Movies from "../models/movies.js";

const getAllMovies = async (_: Request, res: Response) => {
  try {
    const getItems = await Movies.find();
    return res.status(201).json(getItems);
  } catch (error) {
    return res.status(401).json();
  }
};

export default getAllMovies;
