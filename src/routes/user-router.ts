import {
  getAllMovies,
  sendBookmarkedMovies,
} from "../controllers/movies-controller.js";
import { createUser, login } from "../controllers/user-controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", login);
userRouter.get("/movies", getAllMovies);
userRouter.post("/sendBookmarkedMovies", sendBookmarkedMovies);

export default userRouter;
