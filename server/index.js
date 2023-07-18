import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./src/routes/user.js";
import { recipesRouter } from "./src/routes/recipes.js";

const app = express();
const DB_URL = 'mongodb+srv://rugvedwagh02:rugved76@clusternew.xrsceyc.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('Connected to the database...')
}).catch((e) => {
  console.log('Failed to connect to the database...')
});

app.listen(3001, () => console.log(`\nServer running on port 3001...`));
