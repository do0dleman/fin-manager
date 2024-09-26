import { type NextRequest } from "next/server";

import crypto from 'crypto';
import { env } from '~/env';
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";

async function checkLemonsqueezySignature(req: NextRequest) {
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
}

export default checkLemonsqueezySignature