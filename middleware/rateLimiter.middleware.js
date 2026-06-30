import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "../config/redis.js";

const redisStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
});

function createRedisStore(prefix) {
    return new RedisStore({
        prefix,
        sendCommand: (...args) => redisClient.sendCommand(args),
    });
}
// TODO: Change the max, changed to 100 for test
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    store: createRedisStore("rl:auth:"),
    message: {
        message: "Too many auth attempts. Try again later.",
    },
});

export const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 90,
    standardHeaders: true,
    legacyHeaders: false,
    store: createRedisStore("rl:api:"),
    message: {
        message: "Too many requests. Try again later.",
    },
});
