import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (res, req) => {
  req.json({ name: "Yasniel" });
});

export { router as currentUserRouter };
