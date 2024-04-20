import { Schema, model } from "mongoose";
import { bookmarkedMovies } from "../types";

const { String } = Schema.Types;

const moviesSchema = new Schema<bookmarkedMovies>({
  id: {
    type: String,
    required: true,
  },
  movies: {
    type: [String],
    required: true,
  },
});

const BookedMovies = model("BookedMovies", moviesSchema);

export default BookedMovies;
