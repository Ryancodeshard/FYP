import handler from "@/repo/db_handler"
import { NextRequest, NextResponse } from 'next/server';

export async function GET(){
  const responseBody = await handler("SELECT version()");
  return NextResponse.json(responseBody || {});
}