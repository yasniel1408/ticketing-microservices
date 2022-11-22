import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/api/payment", (req, res) => {
  res.json({ hello: "HOLA DESDE K8S GCP!!!!!" });
});

app.listen(3000, () => {
  console.log("PAYMENT SERVICE- Listening on port 3000!!!!!!!!!!!!!");
});
