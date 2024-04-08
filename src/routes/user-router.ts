import getAllMovies from "../controllers/movies-controller.js";
import { createUser } from "../controllers/user-controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.get("/movies", getAllMovies);

export default userRouter;
