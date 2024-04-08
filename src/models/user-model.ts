import { Schema, model } from "mongoose";
import { userType } from "types";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const userSchema = new Schema<userType>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: uuid,
  },
});

const User = model("User", userSchema);

export default User;
