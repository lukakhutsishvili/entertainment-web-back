import Joi, { CustomHelpers } from "joi";
import User from "../models/user-model.js";
import { newUser, userType } from "types";

const ifUserExist =
  (user: userType | null) => (value: string, helpers: CustomHelpers) => {
    if (user) {
      return helpers.error("user with this email already exists");
    }
    return value;
  };

const addUserSchema = async (data: newUser) => {
  const user = await User.findOne({ email: data.email });

  return Joi.object<newUser>({
    email: Joi.string().email().custom(ifUserExist(user)).required(),
    password: Joi.string().required().min(3).max(14),
  });
};

export default addUserSchema;
