import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
ssl: true
});

export default async function handler(req: string) {
  const client = await pool.connect();
  try {
    const response = await client.query(req);
    console.log(response.rows[0]);
    return response
  } finally {
    client.release();
  }
}