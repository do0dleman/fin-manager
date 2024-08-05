import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gte, lt } from "drizzle-orm";
import { z } from "zod";
import { transactionCategories } from "~/models/TransactionCategory";

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
    .input(z.object({ transactionAmount: z.number().int().max(10) }))
    .query(async ({ ctx, input }) => {
      const transactionsList = await ctx.db.query.transactions.findMany({
        where: eq(transactions.user_id, ctx.auth.userId),
        orderBy: desc(transactions.id),
        limit: input.transactionAmount
      })
      return {
        transactions: transactionsList
      }
    }),
  getPeriodTransactions: authedProcedure
    .input(z.object({
      stratDate: z.string().date(),
      endDate: z.string().date(),
      orderBy: z.enum(["asc", "desc"]).default("desc")
    }))
    .query(async ({ ctx, input }) => {
      const startDate = new Date(input.stratDate)
      const endDate = new Date(input.endDate)
      endDate.setHours(endDate.getHours() + 24)
      if (endDate.getTime() - startDate.getTime() >= 1000 * 60 * 60 * 24 * 366) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Start date cannot be more than a year ago from end date"
        })
      }

      const transactionsList = await ctx.db.query.transactions.findMany({
        where:
          and(
            gte(transactions.createdAt, startDate),
            lt(transactions.createdAt, endDate)
          ),
        orderBy: input.orderBy === "desc" ? desc(transactions.id) : asc(transactions.id),
      })
      console.log(transactionsList)
      return {
        transactions: transactionsList
      }
    }),
  createTransaction: authedProcedure
    .input(z.object({
      account_id: z.number(),
      name: z.string(),
      amount: z.number(),
      type: z.enum(['income', 'expense']),
      category: z.enum(transactionCategories),
      createdAt: z.string().date().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const newTransaction = await ctx.db
        .insert(transactions)
        .values({
          account_id: input.account_id,
          type: input.type,
          amount: `${input.amount}`,
          user_id: ctx.auth.userId,
          name: input.name,
          category: input.category,
          createdAt: input.createdAt ? new Date(input.createdAt) : undefined
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
    }),
});
