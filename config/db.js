// config/db.config.js
import dotenv from 'dotenv';
import {Pool } from 'pg';


dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});
// Test the connection

pool.connect()
  .then(() => {
    console.log('Connected to the database successfully!');
  })
  .catch((err) => {
    console.error('Database connection error:', err.stack);
  });


export default pool;
// This code establishes a connection to a PostgreSQL database using the pg-promise library.


