import express from "express";
import logger from "./logger.js";
import { userSignup } from "./validators/validators.js";
import pool from "./neonDemo.js";
import z, { json } from 'zod';
import { NeonDbError } from "@neondatabase/serverless";

const app = express();
app.use(express.json());


app.post("/api/user/signup", async (req, res) => {
    logger.info("POST /api/user/signup", {
        userName: req.body.username,
        password: req.body.password
    });
    try {

        const validateData = userSignup.parse(req.body);
        logger.info("USER SIGNUP DATA VALIDATION SUCCESSFUL", {
            username: validateData.username,
            password: validateData.password
        });

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [validateData.username]
        );

        const user = result.rows[0];

        console.log(user);

        return res.status(200).json({
            "message": user
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.warn("Signup validation incorrect", {
                errors: error.errors
            });

            return res.status(400).json({
                "message": "Validation error",
                "errors": error.errors
            });
        }

        if (error.code === "23505") {
            logger.warn("Duplicate user signup", {
                message: error.message,
                constraint: error.constraint,
            });

            return res.status(409).json({
                message: "Username or email already exists",
            });
        }
        logger.error("Unknown signup error", {
            name: error.name,
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: error.stack,
        });

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

app.listen(3000, () => {
    logger.info("SERVER RUNNING ON http://localhost:3000");
});
