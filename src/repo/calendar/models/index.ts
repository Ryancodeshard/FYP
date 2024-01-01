export interface Calendar{
  id: number
  name: string
  event: Event
}

export enum CAL_USER_TYPE{
  P2C='parent_to_calendar',
  C2C='child_to_calendar'
};