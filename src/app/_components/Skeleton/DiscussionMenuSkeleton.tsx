import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DiscussionMenuSkeleton = () => {
  return (
    <div>
      <div className="pb-2">
        <Skeleton width={200} height={16}/>
        <Skeleton width={100} height={12}/>
      </div>
      <div className="pb-2">
        <Skeleton width={300} height={16}/>
        <Skeleton width={100} height={12}/>
      </div>
      <div className="pb-2">
        <Skeleton width={240} height={16}/>
        <Skeleton width={100} height={12}/>
      </div>
      <div className="pb-2">
        <Skeleton width={250} height={16}/>
        <Skeleton width={100} height={12}/>
      </div>
      <div className="pb-2">
        <Skeleton width={200} height={16}/>
        <Skeleton width={100} height={12}/>
      </div>
      <div className="pb-2">
        <Skeleton width={200} height={16}/>
        <Skeleton width={100} height={12}/>
      </div>
    </div>
  );
};

export default DiscussionMenuSkeleton;