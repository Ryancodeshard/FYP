import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
ssl: true
});

export default async function handler(req: string):Promise<QueryResult<any>> {
  const client = await pool.connect();
  req = req.replaceAll('"', "'") // replace all double quotes with single
  console.log(req)
  try {
    const response = await client.query(req);
    return response
  } finally {
    client.release();
  }
}