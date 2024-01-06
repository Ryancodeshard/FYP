import { CalendarUserType } from "@/app/interfaces/Calendar";
import { add_calendar_user } from "@/repo/calendar";
import { CAL_USER_TYPE } from "@/repo/calendar/models";
import { NextResponse } from "next/server";

export async function POST(request: Request):Promise<NextResponse>{
  const {user_type, user_id, calendar_id} = await request.json()
  const responseBody = await add_calendar_user(user_type===CalendarUserType.parent?CAL_USER_TYPE.P2C:CAL_USER_TYPE.C2C, user_id, calendar_id)
  return NextResponse.json(responseBody.rows || {});
}