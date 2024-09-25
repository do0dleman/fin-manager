import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import crypto from 'crypto';
import { env } from '~/env';
import { type OnSubscriptionEvent } from './model';
import { TRPCError } from '@trpc/server';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {

  const body = await req.text();
  const hmac = crypto.createHmac('sha256', env.LEMONSQUEEZY_SIGNING_SECRET);
  const digest = Buffer.from(hmac.update(body).digest('hex'), 'utf8');
  const signature = Buffer.from(headers().get('X-Signature') ?? '', 'utf8');

  if (digest.byteLength !== signature.byteLength) {
    throw new TRPCError({ code: "BAD_REQUEST", message: 'Invalid signature' });
  }
  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: 'Invalid signature' });
  }

  const payload = JSON.parse(body) as OnSubscriptionEvent;

  const userId = payload.meta.custom_data.user_id;
  if (!userId) {
    throw new TRPCError({ code: "BAD_REQUEST", message: 'No user ID provided' });
  }

  const isTrial = new Date(payload.data.attributes.trial_ends_at).getTime() - new Date().getTime() > 0

  await db.update(users)
    .set({
      status: "active",
      is_trial: isTrial,
      active_until: new Date(payload.data.attributes.renews_at)
    })
    .where(eq(users.id, userId))


  return NextResponse.json({ message: `Succesfully registered subscription`, })
}