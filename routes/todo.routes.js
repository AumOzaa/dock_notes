import { Router } from "express";
import { createTodo, completeTodo, extendTodo, getTodos, deleteTodo } from "../controllers/todo.controller.js";

// TODO: JWT
const router = Router();
router.use(verifyJwtFn); // TODO: // TODO: // TODO: // TODO:
router.post("/api/user/todo", createTodo);
router.post("/api/user/todo/:id", completeTodo);
router.post("/api/user/todo/extend/:id", extendTodo);
router.get("/api/user/todo", getTodos);
router.delete("/api/user/todo/:id", deleteTodo);

export default router;
