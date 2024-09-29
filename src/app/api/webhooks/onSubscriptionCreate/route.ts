import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { type OnSubscriptionEvent } from './model';
import { TRPCError } from '@trpc/server';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import checkLemonsqueezySignature from '../_utils/checkLemonSqueezySignature';

export async function POST(req: NextRequest) {
  const body = await req.text();

  await checkLemonsqueezySignature(body);

  const payload = JSON.parse(body) as OnSubscriptionEvent;

  const userId = payload.meta.custom_data.user_id;
  if (!userId) {
    throw new TRPCError({ code: "BAD_REQUEST", message: 'No user ID provided' });
  }

  await db.update(users)
    .set({
      status: "active",
      is_trial: payload.data.attributes.status === "on_trial",
      active_until: new Date(payload.data.attributes.renews_at),
      lemonSqueezyCustomerId: payload.data.attributes.customer_id,
      variantId: payload.data.attributes.variant_id
    })
    .where(eq(users.id, userId))

  return NextResponse.json({ message: `Succesfully registered subscription`, })
}