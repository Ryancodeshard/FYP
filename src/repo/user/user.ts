import { QueryResult } from 'pg'
import handler from '../db_handler'

const create_user = (email: string) : Promise<QueryResult<any>>=> {
  return handler(`INSERT INTO calendar_user(email) VALUES (${email})`);
}

const get_user = (email: string) : Promise<QueryResult<any>> => {
  return handler(`SELECT * FROM calendar_user WHERE email=${email}`);
}

export {create_user, get_user}