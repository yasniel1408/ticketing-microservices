import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/", (req, res) => {
  res.json({ hello: "HOLA" });
});

app.listen(3000, () => {
  console.log("PAYMENT SERVICE- Listening on port 3000!!!!!!!!!!!!!");
});
