import { QueryResult } from 'pg'
import handler from '../db_handler'

const get_all_calendars = () : Promise<QueryResult<any>>=> {
  return handler("SELECT * FROM calendar")
}

export {get_all_calendars}