import { User } from "@/app/interfaces/User";
import { get_user } from "@/repo/user";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<User|null>>{
  const email: string = await request.text()
  const responseBody = await get_user(email)
  let user;
  if (responseBody?.rows[0]) {
    user = {id:responseBody.rows[0].id, email:responseBody.rows[0].email}}
  return NextResponse.json(user || null);
}