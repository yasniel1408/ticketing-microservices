import express from "express";
import { json } from "body-parser";

const app = express();
app.set("trust proxy", true); // esto es para que podamos ingresar y confiar en el proxy
app.use(json());

app.get("/api/payment", (req, res) => {
  res.json({ hello: "HOLA DESDE K8S GCP!!!!! Yasniel" });
});

app.listen(3000, () => {
  console.log("PAYMENT SERVICE => Listening on port 3000!!!!!!!!!!!!!");
});
