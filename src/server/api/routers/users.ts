import { cancelSubscription, listSubscriptions } from "@lemonsqueezy/lemonsqueezy.js";
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
    .input(z.object({ user_id: z.string() }))
    .mutation(async ({input, ctx}) => {
      configureLemonSqueezy()
  
  
      // cancelSubscription()
      return
    })
});
