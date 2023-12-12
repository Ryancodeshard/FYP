import handler from "@/repo/db_handler"
import { get_all_events } from "@/repo/events";
import { NextRequest, NextResponse } from 'next/server';

export async function GET():Promise<NextResponse>{
  console.log("getting all events")
  const responseBody = await get_all_events();
  return NextResponse.json(responseBody || {});
}