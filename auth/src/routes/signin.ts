import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.json({ name: "Yasniel" });
});

export { router as signinUserRouter };
