import { Router } from "express";
import { createTodo, completeTodo, extendTodo, getTodos, deleteTodo } from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import app from "../app.js";

const router = Router();
router.use(authMiddleware);
router.post("/todo", createTodo);
router.post("/todo/:id", completeTodo);
router.post("/todo/extend/:id", extendTodo);
router.get("/todo", getTodos);
router.delete("/todo/:id", deleteTodo);

export default router;
