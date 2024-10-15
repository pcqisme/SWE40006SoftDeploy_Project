import React from 'react';
import {api} from "~/trpc/react";
import PostCardContainerSkeleton from "~/app/_components/Skeleton/PostCardContainerSkeleton";
import PostCard from "~/app/_components/Card/PostCard";
import BaseCard from "~/app/_components/Card/BaseCard";

const SearchPostsContainer = ({ className="", query } : { className: string, query: string }) => {
  const { data: posts, isLoading } = api.post.searchPostsByTitle.useQuery({ query });

  if (!posts) {
    console.error("Error loading posts");
    return;
  }

  if (posts.length === 0) {
    // eslint-disable-next-line react/no-unescaped-entities
    return <BaseCard>Can't find any post with {query}</BaseCard>;
  }

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

export default SearchPostsContainer;