import { get_all_events } from "@/repo/event";
import { NextResponse } from 'next/server';

export async function GET():Promise<NextResponse>{
  console.log("getting all events")
  const responseBody = await get_all_events();
  return NextResponse.json(responseBody || {});
}