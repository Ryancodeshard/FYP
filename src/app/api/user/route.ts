import { User } from "@/app/interfaces/User";
import { create_user, get_user } from "@/repo/user";
import { user_model } from "@/repo/user/models";
import { NextResponse } from 'next/server';

export async function POST(request: Request){
  const user: User = await request.json()
  const user_model: user_model = {id:user.id, email:user.email}
  const responseBody = await create_user(user_model);
  return NextResponse.json(responseBody || {});
}

export async function GET(request: Request){
  const email: string = await request.text()
  const responseBody = await get_user(email)
  return NextResponse.json(responseBody || {});
}