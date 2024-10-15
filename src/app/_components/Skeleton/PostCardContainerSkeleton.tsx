import React from 'react';
import BaseCard from "~/app/_components/Card/BaseCard";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostCardContainerSkeleton = () => {
  return (
    <BaseCard>
      <div>
        <Skeleton className="w-full" height={400} />
      </div>

      <div className="p-2 flex flex-row items-center">
        <Skeleton circle={true} width={32} height={32} />
        <div className="ml-2 flex items-center h-8">
          <Skeleton width={70} height={18} />
        </div>
      </div>

      <div className="pl-12">
        <Skeleton width={400} height={28} />
        <Skeleton className="mt-4" width={600} height={16} />
      </div>
    </BaseCard>
  );
};

export default PostCardContainerSkeleton;