import React from 'react';
import BaseCard from "~/app/_components/Card/BaseCard";
import Skeleton from "react-loading-skeleton";

const PostPageSkeleton = () => {
  return (
    <div className="grid w-screen grid-cols-18 gap-4 rounded-md pb-4">
      <BaseCard className="col-start-2 col-span-12 h-screen p-4">
        <Skeleton className="w-full" height={300}/>

        <div className="flex flex-row items-center p-2">
          <Skeleton circle={true} width={32} height={32}/>
          <div className="ml-2 flex h-8 items-center">
            <Skeleton width={70} height={18}/>
          </div>
        </div>

        <div className="pl-12">
          <Skeleton width={400} height={28}/>
          <Skeleton className="mt-4" width={600} height={16}/>
        </div>

        <div className="pl-12 pt-8">
          <Skeleton width={400} height={28}/>
          <Skeleton className="mt-4" width={600} height={16}/>
        </div>
      </BaseCard>

      <BaseCard className="col-span-5 p-4">
        <Skeleton width={200} height={28}/>
        <Skeleton className="mt-4" width={300} height={16}/>
        <Skeleton className="mt-4" width={300} height={16}/>
        <Skeleton className="mt-4" width={300} height={16}/>
        <Skeleton className="mt-4" width={300} height={16}/>
      </BaseCard>
    </div>
  );
};

export default PostPageSkeleton;