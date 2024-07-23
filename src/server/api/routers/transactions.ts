import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { authedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { transactions } from "~/server/db/schema";

export const transactionsRouter = createTRPCRouter({
  getAccountTransactions: authedProcedure
    .input(z.object({ account_id: z.number() }))
    .query(async ({ input, ctx }) => {
      const transactionList = await ctx.db.query.transactions.findMany({ where: eq(transactions.account_id, input.account_id) })
      return {
        transactions: transactionList
      };
    }),
  getUserLatestTransactions: authedProcedure
    .query(async ({ ctx }) => {
      const transactionsList = await ctx.db.query.transactions.findMany({
        where: eq(transactions.user_id, ctx.auth.userId),
        orderBy: transactions.id,
        limit: 10
      })
      return {
        transactions: transactionsList
      }
    }),
  createTransaction: authedProcedure
    .input(z.object({
      account_id: z.number(),
      name: z.string(),
      amount: z.number(),
      type: z.enum(['income', 'expense'])
    }))
    .mutation(async ({ input, ctx }) => {
      const newMoneyAccount = await ctx.db
        .insert(transactions)
        .values({
          account_id: input.account_id,
          type: input.type,
          amount: `${input.amount}`,
          user_id: ctx.auth.userId,
          name: input.name
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
