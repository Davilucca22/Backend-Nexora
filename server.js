import pkg from 'pg';
import { configDotenv } from 'dotenv';

configDotenv();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.STRING_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;