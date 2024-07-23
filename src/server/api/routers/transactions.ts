import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { authedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { moneyAccounts, transactions } from "~/server/db/schema";

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
        orderBy: desc(transactions.id),
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
      const newTransaction = await ctx.db
        .insert(transactions)
        .values({
          account_id: input.account_id,
          type: input.type,
          amount: `${input.amount}`,
          user_id: ctx.auth.userId,
          name: input.name
        }).returning()

      if (!newTransaction[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failled to create money account"
        })
      }
      const moneyAccount = await ctx.db.query.moneyAccounts.findFirst({ where: eq(moneyAccounts.id, input.account_id) })
      if (!moneyAccount) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        })
      }

      let newAccountAmount = +moneyAccount.amount;

      const transactionAmount = input.amount;
      switch (input.type) {
        case "income":
          newAccountAmount += transactionAmount;
          break;
        case "expense":
          newAccountAmount -= transactionAmount;
          break;
      }
      
      await ctx.db.update(moneyAccounts)
        .set({ amount: `${newAccountAmount}` })
        .where(eq(moneyAccounts.id, input.account_id))

      return { message: `Created new money account with id ${newTransaction[0].id}` }
    })
});
