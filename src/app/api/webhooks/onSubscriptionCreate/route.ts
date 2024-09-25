import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import crypto from 'crypto';
import { env } from '~/env';
import { type OnSubscriptionEvent } from './model';
import { TRPCError } from '@trpc/server';

export async function POST(req: NextRequest) {

  const body = await req.text();
  const hmac = crypto.createHmac('sha256', env.LEMONSQUEEZY_SIGNING_SECRET);
  const digest = Buffer.from(hmac.update(body).digest('hex'), 'utf8');
  const signature = Buffer.from(headers().get('X-Signature') ?? '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: 'Invalid signature' });
  }


  const payload = JSON.parse(body) as OnSubscriptionEvent;
  console.log(payload)

  // try {
  //   await WebhookEventHandler(payload);
  //   return NextResponse.json({ received: true }, { status: 200 });
  // } catch (err) {
  //   return NextResponse.json({ error: err.message }, { status: 500 });
  // }
}