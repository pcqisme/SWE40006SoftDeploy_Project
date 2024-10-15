import React from 'react';
import BaseCard from "~/app/_components/Card/BaseCard";
import DiscussionMenu from "~/app/_components/SideMenu/DiscussionMenu";

const DiscussionBar = ({ className, title } : { className: string, title: string }) => {
  return (
    <BaseCard className={`py-3 px-4 rounded-md h-auto ${className}`}>
      <h1 className="text-xl pb-3 font-bold">{title}</h1>
      <DiscussionMenu/>
    </BaseCard>
  );
};

export default DiscussionBar;