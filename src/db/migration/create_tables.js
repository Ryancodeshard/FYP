const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
ssl: true
});

const create_tables = async ()=> {
  const client = await pool.connect();
  
  try{
  client.query(`
  CREATE TABLE calendar_user(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL
  );
  `)
  client.query(`
  CREATE TABLE calendar(
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    fk_creator_id INTEGER NOT NULL,
    FOREIGN KEY (fk_creator_id) REFERENCES calendar_user(id) ON DELETE CASCADE
  );
  `)
  client.query(`
  CREATE TABLE event(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    all_day BOOLEAN NOT NULL,
    notes TEXT,
    organiser TEXT NOT NULL, 
    fk_calendar_id INTEGER NOT NULL,
    FOREIGN KEY (fk_calendar_id) REFERENCES calendar(id) ON DELETE CASCADE
  );
  `)
  client.query(`
  CREATE TABLE parent_to_calendar(
    id SERIAL PRIMARY KEY,
    fk_parent_id INTEGER,
    fk_calendar_id INTEGER,
    FOREIGN KEY (fk_parent_id) REFERENCES calendar_user(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_calendar_id) REFERENCES calendar(id) ON DELETE CASCADE
  );
  `)
  client.query(`
  CREATE TABLE child_to_calendar(
    id SERIAL PRIMARY KEY,
    fk_child_id INTEGER,
    fk_calendar_id INTEGER,
    FOREIGN KEY (fk_child_id) REFERENCES calendar_user(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_calendar_id) REFERENCES calendar(id) ON DELETE CASCADE
  );
  `)
  return "All tables created"
  }catch (error){
    console.log(error)
  }finally {
    client.release();
  }
}

export default create_tables