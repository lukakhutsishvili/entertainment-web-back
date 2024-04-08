import { Schema, model } from "mongoose";

const { String, Number, Boolean } = Schema.Types;

const moviesSchema = new Schema({
  title: {
    type: String,
  },
  thumbnail: {
    tranding: {
      small: {
        type: String,
      },
      large: {
        type: String,
      },
    },
    regular: {
      small: {
        type: String,
      },
      medium: {
        type: String,
      },
      large: {
        type: String,
      },
    },
  },
  year: {
    type: Number,
  },
  category: {
    type: String,
  },
  rating: {
    type: String,
  },
  isBookmarked: {
    type: Boolean,
  },
  isTrending: {
    type: Boolean,
  },
});

const Movies = model("Movies", moviesSchema);

export default Movies;
