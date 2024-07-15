import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { type OnUserCreateModel } from './model'

async function handler(req: Request) {
  const json = await req.json() as OnUserCreateModel
  const userId = json.data.id

  //! todo add user to the db


  return NextResponse.json({ message: `Succesfully created folder with id ${1}` })
}

export { handler as POST }