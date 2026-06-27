
import { Router } from "express";
import { signup, signin, createTask, deleteTask, getTask, startEndTask, dayAnalytics, timeSinceStart } from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// TODO: REMOVE THE BASE PATH
router.post("/api/user/signup", signup);
router.post("/api/user/signin", signin);
router.post("/api/user/createtask", authMiddleware, createTask);
router.delete("/api/user/del/task/:id", authMiddleware, deleteTask);
router.get("/api/user/tasks", authMiddleware, getTask);
router.post("/api/user/task/:id", authMiddleware, startEndTask);
router.post("/api/user/timeSinceStart", authMiddleware, timeSinceStart);

export default router;
