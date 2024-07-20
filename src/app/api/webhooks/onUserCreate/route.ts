import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { users } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { Webhook } from "svix";
import type OnUserCreateModel from './model'
import { env } from '~/env';

async function handler(req: Request) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.text();

  const sivx = new Webhook(env.CLERK_SIGNING_SECRET);

  let msg;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as OnUserCreateModel;
  }
  catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  const userId = msg.data.id

  const existringUser = await db.query.users.findFirst({ where: eq(users.id, userId) })

  if (existringUser) {
    return NextResponse.json({ message: "User already exisits" }, { status: 400 })
  }

  const newUserId = await db.insert(users)
    .values({ id: userId })
    .returning({ id: users.id })

  if (!newUserId) {
    return NextResponse.json({ message: `Failed to create user.` }, { status: 500 })
  }

  return NextResponse.json({ message: `Succesfully created folder with id ${userId}` })
}

export { handler as POST }