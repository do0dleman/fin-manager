import { cancelSubscription, updateSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { TRPCError } from "@trpc/server";
import { eq, ne } from "drizzle-orm";
import { z } from "zod";

import { authedProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { configureLemonSqueezy } from "~/server/config/lemonsqueezy";
import { plans, users } from "~/server/db/schema";

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
  getUserInactiveSubscription: authedProcedure
    .input(z.object({ current_variant_id: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const planList = await ctx.db.query.plans.findMany({
        where: ne(plans.variantId, input.current_variant_id ?? -1)
      })

      return planList
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

      await cancelSubscription(userData.subscriptionId)
      await ctx.db.update(users)
        .set({ status: "canceled" })
        .where(eq(users.id, ctx.auth.userId))

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

      // For some reason trial_ends_at has to be implicitly set to null, otherwise it will error
      await updateSubscription(userData.subscriptionId, { cancelled: false, trialEndsAt: null })
      await ctx.db.update(users)
        .set({ status: "active" })
        .where(eq(users.id, ctx.auth.userId))

      return { message: "Subscription successfully renewed" }
    }),
});
