import handler from "@/repo/db_handler"
import { NextRequest, NextResponse } from 'next/server';

export async function GET():Promise<NextResponse>{
  console.log("getting all events")
  const responseBody = await handler("SELECT * FROM events");
  return NextResponse.json(responseBody.rows || {});
}