import React from 'react';
import {api} from "~/trpc/react";
import PostCardContainerSkeleton from "~/app/_components/Skeleton/PostCardContainerSkeleton";
import PostCard from "~/app/_components/Card/PostCard";

const PostsByUserContainer = ({ className="" } : {className: string}) => {
  const { data: posts, isLoading } = api.post.getAllPosts.useQuery();

  return (
    <div className={className}>
      {isLoading ? (
        <PostCardContainerSkeleton/>
      ) : (
        posts?.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            userId={post.createdBy.id}
            username={post.createdBy.name ?? "Anonymous"}
            userProfileImage={post.createdBy.image ?? "/devto_ic.svg"}
            timePosted={post.createdAt.toString()}
            coverImage={post.coverImage ?? ""}
            title={post.name}
            tags={post.tags}
            numberOfReactions={post.reacts?.length ?? 0}
            comments={post.comments?.length ?? 0}
          />
        ))
      )}
    </div>
  );
};

export default PostsByUserContainer;