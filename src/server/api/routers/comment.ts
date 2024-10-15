import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1, "Comment cannot be empty"),
        postId: z.string(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.comment.create({
        data: {
          content: input.content,
          post: { connect: { id: input.postId } },
          user: { connect: { id: userId } },
          parent: input.parentId ? { connect: { id: input.parentId } } : undefined,
        },
      });
    }),

  getCommentById: publicProcedure
    .input(z.object({ commentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findUnique({
        where: { id: input.commentId },
        include: {
          replies: {
            include: {
              user: true,
            },
            orderBy: {createdAt: "desc"},
          },
        },
      });
    }),

  getCommentsByPostId: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { postId: input.postId, parentId: null, },
        include: {
          user: true
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getRepliesByCommentId: publicProcedure
    .input(z.object({ commentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { parentId: input.commentId },
        include: {
          user: true,
        },
        orderBy: { createdAt: "asc" },
      });
    }),

  likeComment: publicProcedure
    .input(z.object({
      commentId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.update({
        where: {
          id: input.commentId,
        },
        data: {
          likes: { increment: 1 }
        }
      });
    }),
});

