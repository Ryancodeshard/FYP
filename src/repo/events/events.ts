import handler from '../db_handler'

const get_all_events = () => {
  handler("SELECT * FROM events")
}

export {get_all_events}