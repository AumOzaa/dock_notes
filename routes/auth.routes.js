import { Router } from "express";
import { signup, signin } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/signin", signin);

export default router;
