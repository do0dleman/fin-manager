import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { type OnSubscriptionUpdatedEvent } from './model';
import { TRPCError } from '@trpc/server';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import checkLemonsqueezySignature from '../_utils/checkLemonSqueezySignature';

export async function POST(req: NextRequest) {

  await checkLemonsqueezySignature(req);

  const body = await req.text();
  const payload = JSON.parse(body) as OnSubscriptionUpdatedEvent;
  const data = payload.data;

  const lemonUserId = data.attributes.customer_id;
  if (!lemonUserId) {
    throw new TRPCError({ code: "BAD_REQUEST", message: 'No user ID provided' });
  }

  let status = "active" as "active" | "inactive" | "canceled";

  if (data.attributes.status === "past_due"
    || data.attributes.status === "unpaid"
    || data.attributes.status === "expired"
  ) {
    status = "inactive"
  }

  if (data.attributes.status === "cancelled") {
    status = "canceled"
  }

  await db.update(users)
    .set({
      status: status,
      is_trial: data.attributes.status == "on_trial",
      active_until: new Date(data.attributes.renews_at),
      lemonSqueezyCustomerId: data.attributes.customer_id
    })
    .where(eq(users.lemonSqueezyCustomerId, lemonUserId))


  return NextResponse.json({ message: `Succesfully registered subscription`, })
}