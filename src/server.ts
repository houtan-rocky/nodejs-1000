import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from 'cors'
import { protect } from "./modules/auth"

const app = express();

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`);
  next();
};


app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.some_thing = "doggy";
  next();
});
app.use(customLogger("custom logger"));

app.get("/", (req, res) => {
  res.status(200).json({ message: req.some_thing });
});

app.use("/api", protect, router );

export default app;
