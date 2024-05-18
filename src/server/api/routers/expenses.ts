import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const expensesRouter = createTRPCRouter({
  getExpenses: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    try {
      const expenses = await ctx.db.expense.findMany({
        where: {
          userId: user.id,
        },
      });
      return expenses;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get expenses",
      });
    }
  }),
});
