import { get_all_calendars } from "@/repo/calendar";
import {  NextResponse } from 'next/server';

export async function GET():Promise<NextResponse>{
  console.log("getting all calendars")
  const responseBody = await get_all_calendars();
  return NextResponse.json(responseBody.rows || {});
}