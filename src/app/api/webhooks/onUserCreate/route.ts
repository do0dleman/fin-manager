import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { users } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import type OnUserCreateModel from './model'

async function handler(req: Request) {
  const json = await req.json() as OnUserCreateModel
  const userId = json.data.id

  //! todo add user to the db
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