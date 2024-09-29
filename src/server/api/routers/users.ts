import { cancelSubscription, updateSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { authedProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { configureLemonSqueezy } from "~/server/config/lemonsqueezy";
import { users } from "~/server/db/schema";

export const usersRouter = createTRPCRouter({
  getUserInfo: publicProcedure
    .input(z.object({ user_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({ where: eq(users.id, input.user_id) })

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User with given id does not exist"
        })
      }

      return {
        user: user
      };
    }),
  cancelSubscription: authedProcedure
    .mutation(async ({ ctx }) => {
      const userData = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.auth.userId),
      })

      if (!userData?.subscriptionId) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }

      configureLemonSqueezy()

      const { statusCode } = await cancelSubscription(userData.subscriptionId)


      if (statusCode === null || (statusCode >= 200 && statusCode < 300)) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }

      return { message: "Subscription successfully cancelled" }
    }),
  resumeSubscription: authedProcedure
    .mutation(async ({ ctx }) => {
      const userData = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.auth.userId),
      })

      if (!userData?.subscriptionId) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }

      configureLemonSqueezy()

      await updateSubscription(userData.subscriptionId, { cancelled: false })

      return { message: "Subscription successfully renewed" }
    }),
});
