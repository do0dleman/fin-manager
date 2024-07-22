import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { moneyAccounts } from "~/server/db/schema";

export const moneyAccountsRouter = createTRPCRouter({
  getUsersMoneyAccounts: publicProcedure
    .input(z.object({ user_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const accounts = await ctx.db.query.moneyAccounts.findMany({ where: eq(moneyAccounts.user_id, input.user_id) })

      return {
        moneyAccounts: accounts
      };
    }),
  createMoneyAccounts: publicProcedure
    .input(z.object({ user_id: z.string(), name: z.string(), amount: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const newMoneyAccount = await ctx.db
        .insert(moneyAccounts)
        .values({
          name: input.name,
          amount: `${input.amount}`,
          user_id: input.user_id,
        }).returning()

      if (!newMoneyAccount) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failled to create money account"
        })
      }

      return { message: `Created new money account with id ${newMoneyAccount[0]?.id}` }
    })
});
