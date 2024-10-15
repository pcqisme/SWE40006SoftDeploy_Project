import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {z} from "zod";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(
       z.object({
        userId: z.string()
      })
    )
    .query(async ({ctx, input}) => {
      return ctx.db.user.findUnique({
        where: { id: input.userId },
      })
    }),

  updateUserDetails: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.user.update({
          where: {id: input.userId},
          data: {
            name: input.name ?? undefined,
            email: input.email ?? undefined,
            image: input.image ?? undefined,
          },
        });
      } catch (error) {
        console.log(error);
        return;
      }
  }),
})