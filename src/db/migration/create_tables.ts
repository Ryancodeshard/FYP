import { Query, QueryResult } from 'pg'
import handler from '../../repo/db_handler'

const create_tables = async ()=> {
  var response: Array<QueryResult<any>> = []
  try{
  handler(`
  CREATE TABLE calendar(
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    creator TEXT NOT NULL
  );
  `)
  handler(`
  CREATE TABLE event(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    all_day BOOLEAN NOT NULL,
    notes TEXT,
    name TEXT NOT NULL, 
    organiser TEXT NOT NULL, 
    fk_calendar_id INTEGER NOT NULL,
    FOREIGN KEY (fk_calendar_id) REFERENCES calendar(id) ON DELETE CASCADE
  );
  `)
  handler(`
  CREATE TABLE calendar_user(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL
  );
  `)
  handler(`
  CREATE TABLE parent_to_calendar(
    id SERIAL PRIMARY KEY,
    fk_parent_id INTEGER,
    fk_calendar_id INTEGER,
    FOREIGN KEY (fk_parent_id) REFERENCES calendar_user(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_calendar_id) REFERENCES calendar(id) ON DELETE CASCADE
  );
  `)
  handler(`
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
  }
}

export default create_tables;