import create_tables from "@/db/migration/create_tables";
import { NextResponse } from 'next/server';

export async function GET(){
  console.log("creating tables")
  const responseBody = await create_tables();
  return NextResponse.json(responseBody || {});
}