import handler from '../db_handler'
import { Event } from './models'
const get_all_events = async (): Promise<Array<Event>> => {
  const data = await handler("SELECT * FROM event")
  var res: Event[] = []
  data.rows.forEach(row => {
    res.push(
      {
        id: row.id,
        name: row.name,
        organiser: row.organiser
      }
    )
  });
  return res
}

export {get_all_events}