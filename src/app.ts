import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connect from "./config/mongo.js";
import userRouter from "./routes/user-router.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

dotenv.config();
connect();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://entertainment-web-front.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/", ...swaggerMiddleware);

app.listen(process.env.PORT || 3000);
