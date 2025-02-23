import express from "express";
import passport from "passport";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(
      `${process.env.BASE_URL}/chat?user=${JSON.stringify(req.user)}`
    );
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out");
});

export default router;
