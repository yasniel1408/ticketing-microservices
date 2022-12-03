import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.json({ name: "Yasniel!!!!!" });
});

export { router as currentUserRouter };
