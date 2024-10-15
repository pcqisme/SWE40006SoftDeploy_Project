"use client"

import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import {api, type RouterOutputs} from "~/trpc/react";
import Link from "next/link";
import MarkdownRenderer from "~/app/_components/MdTextArea/MarkdownRenderer";
import CommentsContainer from "~/app/_components/Container/CommentsContainer";
import DiscussionBar from "~/app/_components/Bar/DiscussionBar";
import PostCardContainerSkeleton from "~/app/_components/Skeleton/PostCardContainerSkeleton";
import PostPageSkeleton from "~/app/_components/Skeleton/PostPageSkeleton";
import {useSession} from "next-auth/react";
import {pageRoutes} from "~/app/_constants/pageRoutes";


type Comment = RouterOutputs['comment']['getCommentsByPostId'][number];

type OptimisticComment = Pick<Comment, 'id' | 'content' | 'createdAt' | 'likes'> & {
  user: Pick<Comment['user'], 'name' | 'image'>;
};

const Page = () => {
  const utils = api.useUtils();
  const { data: session } = useSession();
  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id;

  // content of the new comment
  const [comment, setComment] = useState("");

  // list of all optimistic comments
  const [commentList, setCommentList] = useState<OptimisticComment[]>([]);

  const { data: post, isLoading, error } = api.post.getPostById.useQuery(
    { id: postId ?? "" },
    { enabled: !!postId }
  );

  const { data: comments, isSuccess } = api.comment.getCommentsByPostId.useQuery({ postId: postId! });

  const createComment = api.comment.createComment.useMutation({
    onMutate: async (newComment) => {
      if (!post)
      {
        return;
      }

      await utils.comment.getCommentsByPostId.cancel({ postId: postId! });
      const prev = utils.comment.getCommentsByPostId.getData({ postId: postId! });
      const optimisticComment: OptimisticComment = {
        id: 'temp-id-' + Date.now(),
        content: newComment.content,
        createdAt: new Date(),
        likes: 0,
        user: {
          name: session?.user.name ?? "",
          image: session?.user?.image ?? "",
        }
      };
      setCommentList((prevState) => [...prevState, optimisticComment]);
      return { prev };
    },
    onSettled: async () => {
      setCommentList([]);
      await utils.comment.getCommentsByPostId.invalidate({ postId: postId! })
    },
    onError: (err, newComment, context) => {
      setCommentList([]);
      if (context?.prev) {
        utils.comment.getCommentsByPostId.setData({ postId: postId! }, context.prev);
      }
    }
  });

  const allComments = [...commentList, ...(comments ?? [])];

  const { mutate: likePost } = api.post.likePost.useMutation({});
  
  const handlePostLike = () => {
    likePost({
      postId: postId!
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      createComment.mutate({
        content: comment,
        postId: postId!,
      });
      setComment("");
    } catch (error) {
      console.error("Error when adding the comment:", error);
    }
  }

  if (isLoading) {
    return (
      <PostPageSkeleton />
    )
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (!post) {
    console.error("An error occurred");
    return;
  }

  return (
    <div className="grid w-screen  md:grid-cols-[64px,1fr] lg:grid-cols-18 md:gap-4 rounded-md pb-4">
      <div className="hidden md:flex lg:col-span-1 w-16 flex-col pt-8">
        <span className="flex flex-col items-center p-2 mb-1">
          <button onClick={handlePostLike} className="flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true">
              <g clip-path="url(#clip0_988_3276)">
                <path
                  d="M19 14V17H22V19H18.999L19 22H17L16.999 19H14V17H17V14H19ZM20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.992L19.059 11.574C20.39 10.05 20.32 7.65998 18.827 6.16998C17.324 4.67098 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09103 4.60598 6.67503 4.66798 5.17203 6.17198C3.68203 7.66198 3.60703 10.047 4.98003 11.623L13.412 20.069L12 21.485L3.52003 12.993C1.41603 10.637 1.49503 7.01898 3.75603 4.75698C6.02103 2.49298 9.64403 2.41698 12 4.52898C14.349 2.41998 17.979 2.48998 20.242 4.75698H20.243Z"
                  fill="#525252"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_988_3276">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <span className="p-2">{post.likes}</span>
          </button>
        </span>

        <span className="flex flex-col items-center p-2 mb-1">
          <button className="flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
            </svg>
            <span className="p-2">{post.comments.length}</span>
          </button>
        </span>

        <span className="flex flex-col items-center p-2 mb-1">
          <button className="flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z"></path>
            </svg>
            <span className="p-2">0</span>
          </button>
        </span>
      </div>

      <div
        className={` lg:col-span-12 col-start-2 rounded-md bg-white border ${post.coverImage ? "p-0" : "p-3"}`}
      >
        {isLoading ? (
          <PostCardContainerSkeleton/>
        ) : (
          <div>
            {post?.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="rounded-t-md"
                src={post.coverImage}
                alt={post?.name ?? "No title"}
              />
            ) : null}

            {/* profile, reaction, title, tags */}
            <div className="px-16 pt-8">
              {/* profile section*/}
              <div className="mb-2 flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="mr-2 h-[40px] w-[40px] items-start rounded-full"
                  src={post.createdBy.image ?? "/devto_ic.svg"}
                  alt=""
                />
                <div className="flex flex-col">
                  <div>
                    <button className="-my-2 -ml-1 inline-block h-6 w-auto rounded p-1 font-semibold hover:bg-[#F5F5F5]">
                      <Link href={pageRoutes.PROFILES + "/" + post.createdBy.id}>{post.createdBy.name}</Link>
                    </button>
                  </div>
                  <div className="flex  flex-grow" />
                  <p className="text-xs">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* reaction */}
              <div className={`flex flex-row py-2`}>
                <Image
                  src={"/heart.svg"}
                  alt={""}
                  className={`mr-2`}
                  width={24}
                  height={24}
                />
                <p>{post.reacts.length}</p>
              </div>

              {/* title */}
              <div className={`mb-2`}>
                <p className="text-5xl font-extrabold">
                  {post.name}
                </p>
              </div>

              {/* tags */}
              <div className="mb-2 flex flex-row">
                {post.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="rounded border border-white px-[7px] py-1 text-[14px] hover:border-gray-400/80 hover:bg-[#F5F5F5]"
                  >
                    #{tag}
                  </p>
                ))}
              </div>
            </div>

            {/* content */}
            <div className={`px-16 py-8`}>
              <MarkdownRenderer>{post.content}</MarkdownRenderer>
            </div>

            <div className={`w-full border-b`}></div>

            {/* comment */}
            <div className={`px-16 py-8`}>
              <div className="mb-6 flex flex-row">
                <h1 className="text-2xl font-bold">
                  Top comments ({post.comments.length})
                </h1>
                <div className="flex-grow"></div>
                <button className="rounded-md border-2 border-gray-400/70 px-3.5 py-1.5 text-base hover:bg-[#F5F5F5] hover:shadow">
                  Subscribe
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mb-8 flex flex-row">
                {/* comment form */}
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 h-[32px] w-[32px] items-start rounded-full"
                    src={session?.user?.image ?? "/devto_ic.svg"}
                    alt=""
                  />
                </div>

                <div className={`flex w-full flex-col`}>
                  <textarea
                    placeholder="Add to the discussion"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="placeholder-text-[#525252] mb-3 h-28 w-full focus-within:border-[#3b49df] resize-none rounded-md border p-2"
                  ></textarea>

                  <div className={`flex flex-row`}>
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className={`mr-2 rounded-md px-4 py-2 text-white ${
                        comment.trim()
                          ? "bg-[#3b49df] hover:bg-[#2f3ba8]"
                          : "bg-[#3b49df]/50"
                      }`}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      disabled={!comment.trim()}
                      className={`mr-2 rounded-md px-4 py-2 ${
                        comment.trim()
                          ? "bg-[#D6D6D7] hover:bg-[#B0B0B1]"
                          : "bg-[#D6D6D7]/50"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </form>

              {/* other comment */}
              <CommentsContainer comments={allComments} postId={postId!} />
            </div>
          </div>
        )}
      </div>

      <DiscussionBar className="hidden lg:block col-span-5" title={`More from ${post.createdBy.name}`} />
    </div>
  );


};

export default Page;