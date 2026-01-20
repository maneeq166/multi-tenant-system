import express from "express";
import { authRouter } from "./routes/auth.route.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/auth", authRouter);

app.listen(3000);
