import dotenv from 'dotenv';
import pg from 'pg';
import { neon } from '@neondatabase/serverless';
import logger from './logger.js';

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.NEON_CONNECTION_URI,
    ssl: "verify-full"
});

export default pool;
// await client.connect();
// console.log("Connected!");
//
// const result = await client.query('SELECT * FROM test');
// console.log(result.rows);
// async function getPgVersion() {
//     const result = await sql`SELECT * FROM test`;
//     console.log(result[0]);
// }
//
// getPgVersion();
