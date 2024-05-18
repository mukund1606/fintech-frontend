import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { SetIncomeFormSchema } from "@/types/forms";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUserData: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    try {
      const userData = await ctx.db.user.findFirst({
        where: {
          id: user.id,
        },
      });
      if (!userData) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      return {
        ...userData,
        password: undefined,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get expenses",
      });
    }
  }),
  setIncome: protectedProcedure
    .input(SetIncomeFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      try {
        await ctx.db.user.update({
          where: {
            id: user.id,
          },
          data: {
            income: input.income,
            totalBudget: input.totalBudget,
          },
        });
        return {
          message: "Income set successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to set income",
        });
      }
    }),
});
