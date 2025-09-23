import mongoose from "mongoose";

const connect = () => {
  try {
    const url = process.env.MONGO_URL!;
    console.log(url)
    mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
