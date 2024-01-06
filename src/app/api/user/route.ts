import { create_user, get_user } from "@/repo/user";
import { NextResponse } from 'next/server';

export async function POST(request: Request){
  const email: string = await request.text()
  const responseBody = await create_user(email);
  return NextResponse.json(responseBody || {});
}
