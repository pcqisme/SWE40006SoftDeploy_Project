"use client"

import React from 'react';
import {api} from "~/trpc/react";
import Link from "next/link";
import {pageRoutes} from "~/app/_constants/pageRoutes";
import DiscussionMenuSkeleton from "~/app/_components/Skeleton/DiscussionMenuSkeleton";

const DiscussionMenu = () => {
  const { data: discussions, isLoading } = api.post.getAllPosts.useQuery();

  if (isLoading) {
    return (
      <DiscussionMenuSkeleton/>
    );
  }

  return (
    <div className="h-auto">
      {discussions?.map((discussion) => (
        <div key={discussion.id}>
          <hr />
          <div className="flex flex-col px-0 py-4" key={discussion.id}>
            <Link href={`${pageRoutes.POST}/${discussion.id}`} passHref>
              {discussion.name}
            </Link>
            <Link
              className="text-[14px] text-black/50"
              href={`${pageRoutes.POST}/${discussion.id}`}
              passHref
            >
              {discussion.comments.length} comment
              {discussion.comments.length < 2 ? "" : "s"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionMenu;