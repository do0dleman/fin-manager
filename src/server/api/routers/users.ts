import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
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
});
