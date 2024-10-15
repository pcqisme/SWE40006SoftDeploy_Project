"use client"

import MarkdownRenderer from "~/app/_components/MdTextArea/MarkdownRenderer";
import React from "react";
import {api} from "~/trpc/react";
import Image from "next/image";

interface CommentContainerProps {
  commentId: string;
  userName: string;
  userImage: string;
  createdAt: Date;
  content: string;
  depth: number;
  likes: number;
  postId: string;
  parentId: string;
  className: string;
}

const CommentContainer: React.FC<CommentContainerProps> = ({
  commentId,
  userName,
  userImage,
  createdAt,
  content,
  depth,
  likes,
  postId,
  parentId,
  className,
}) => {
  const [commentContent, setCommentContent] = React.useState("")
  const [isReplying, setIsReplying] = React.useState(false)

  const { data: replies } = api.comment.getRepliesByCommentId.useQuery({commentId});
  const { mutate: likeComment } = api.comment.likeComment.useMutation();
  const { mutate: createComment } = api.comment.createComment.useMutation({
    onSuccess: () => {
      setCommentContent("");
    },
  });

  const handleLike = () => {
    likeComment({commentId});
  }
  const handleComment = () => {
    createComment({
      content: commentContent,
      postId,
      parentId,
    });
    setIsReplying(false);
  };

  return (
    <div className={`${className} flex flex-col`}>
      <div className="mb-1 flex flex-row">
        <div className="pt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mr-2 h-[32px] w-[32px] items-start rounded-full"
            src={userImage}
            alt=""
          />
        </div>

        <div className="flex w-full flex-col">
          <div className="mb-1 w-full rounded-md border p-3 px-3">
            <div className="flex flex-row">
              <button className="mb-2 rounded p-1 text-[14px] font-semibold hover:bg-[#F5F5F5]">
                {userName}
              </button>
              <li className="-mr-3 mb-2 p-1 text-black/25" />
              <p className="mb-2 content-center py-1 text-xs">
                {createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <MarkdownRenderer>{content}</MarkdownRenderer>
          </div>

          {/* Reaction & Reply */}
          {isReplying ? (
            <div className={`flex w-full flex-col`}>
              <textarea
                placeholder="Add to the discussion"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="placeholder-text-[#525252] mb-3 h-28 w-full resize-none rounded-md border p-2 focus:border-[#3b49df]"
              ></textarea>

              <div className={`flex flex-row`}>
                <button
                  onClick={handleComment}
                  disabled={!commentContent.trim()}
                  className={`mr-2 rounded-md px-4 py-2 text-white ${
                    commentContent.trim()
                      ? "bg-[#3b49df] hover:bg-[#2f3ba8]"
                      : "bg-[#3b49df]/50"
                  }`}
                >
                  Submit
                </button>
                <button
                  type="button"
                  disabled={!commentContent.trim()}
                  className={`mr-2 rounded-md px-4 py-2 ${
                    commentContent.trim()
                      ? "bg-[#D6D6D7] hover:bg-[#B0B0B1]"
                      : "bg-[#D6D6D7]/50"
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-3 flex flex-row">
              <button
                onClick={handleLike}
                className="mr-1 flex flex-row items-center rounded px-2 py-1 text-[14px] hover:bg-[#F5F5F5]"
              >
                <Image
                  className="mr-1"
                  src="/heart.svg"
                  alt="heart"
                  width={24}
                  height={24}
                />
                <p>
                  {likes} Like{likes < 1 ? "" : "s"}
                </p>
              </button>

              <button
                onClick={() => setIsReplying(true)}
                className="flex flex-row items-center rounded px-2 py-1 text-[14px] hover:bg-[#F5F5F5]"
              >
                <Image
                  className="mr-1"
                  src="/comment.svg"
                  alt="heart"
                  width={24}
                  height={24}
                />
                <p>Reply</p>
              </button>
            </div>
          )}

          {/* Render Replies */}
          {depth < 1 && replies && replies.length > 0 && (
            <div className="">
              {replies.map((reply) => (
                <CommentContainer
                  className={``}
                  key={reply.id}
                  commentId={reply.id}
                  userName={reply.user.name ?? "Anonymous"}
                  userImage={reply.user.image ?? "/devto_ic.svg"}
                  createdAt={reply.createdAt}
                  content={reply.content}
                  depth={depth + 1}
                  likes={reply.likes}
                  postId={postId}
                  parentId={commentId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentContainer;
