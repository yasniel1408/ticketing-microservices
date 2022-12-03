import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

app.get("/api/users", (req, res) => {
  res.json({ hello: "HOLA DESDE K8S GCP!!!!!" });
});

app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("AUTH SERVICE => Listening on port 3000!!!!!!!!");
});
