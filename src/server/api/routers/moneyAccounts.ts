import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { accountColors } from "~/models/AccountColor";

import { authedProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { currency, moneyAccounts, transactions } from "~/server/db/schema";

export const moneyAccountsRouter = createTRPCRouter({
  getUsersMoneyAccounts: authedProcedure
    .query(async ({ ctx }) => {
      const accounts = await ctx.db.query.moneyAccounts.findMany({ where: eq(moneyAccounts.user_id, ctx.auth.userId) })

      return {
        moneyAccounts: accounts
      };
    }),
  createMoneyAccounts: authedProcedure
    .input(z.object({ name: z.string(), amount: z.number(), color: z.enum(accountColors) }))
    .mutation(async ({ input, ctx }) => {
      const newMoneyAccount = await ctx.db
        .insert(moneyAccounts)
        .values({
          name: input.name,
          amount: `${input.amount}`,
          color: input.color,
          user_id: ctx.auth.userId,
        }).returning()

      if (!newMoneyAccount) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failled to create money account"
        })
      }

      return { message: `Created new money account with id ${newMoneyAccount[0]?.id}` }
    }),
  deleteMoneyAccount: authedProcedure
    .input(z.object({ accountId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(transactions)
        .where(eq(transactions.account_id, input.accountId))

      const deletedIds = await ctx.db.delete(moneyAccounts)
        .where(and(
          eq(moneyAccounts.user_id, ctx.auth.userId),
          eq(moneyAccounts.id, input.accountId))
        )
        .returning({ deltedId: moneyAccounts.id })

      if (!deletedIds) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
      }

      return { message: `Deleted account id: ${deletedIds[0]?.deltedId}` }
    }),
  getCurrencyInfo: publicProcedure
    .input(z.object({ currency_code: z.string() }))
    .query(async ({ ctx, input }) => {

      const currencyInfo = await ctx.db.query.currency.findFirst({ where: eq(currency.key, input.currency_code) })
      if (!currencyInfo) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }

      return currencyInfo
    })
});
