import express, { json } from "express";

import authRoutes from "./routes/auth.routes";
import threadRoutes from "./routes/thread.routes";

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT || process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Mongo Connected")
);

app.use(json());
app.use(cors());

app.use(authRoutes);
app.use(threadRoutes);

app.listen(process.env.PORT || 5500, () =>
  console.log("Server Connected at port ", process.env.PORT || 5500)
);
