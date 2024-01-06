import { QueryResult } from 'pg'
import handler from '../db_handler'
import { CAL_USER_TYPE } from './models'

const get_all_calendars = () : Promise<QueryResult<any>>=> {
  return handler("SELECT * FROM calendar")
}

const add_calendar_user = ( user_type: CAL_USER_TYPE, user_id: number, calendar_id: number ) : Promise<QueryResult<any>>=>{
  return handler(`INSERT INTO ${user_type}(fk_${user_type===CAL_USER_TYPE.C2C?'child':'parent'}_id, fk_calendar_id) VALUES (${user_id}, ${calendar_id})`)
}

export {get_all_calendars, add_calendar_user}