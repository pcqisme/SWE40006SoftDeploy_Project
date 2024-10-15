import React from 'react';
import BaseCard from "~/app/_components/Card/BaseCard";
import DiscussionMenu from "~/app/_components/SideMenu/DiscussionMenu";
import Link from "next/link";
import { pageRoutes } from '~/app/_constants/pageRoutes';

const DiscussionBar2 = ({ className, title, sub } : { className: string, title: string, sub: string }) => {
  return (
    <BaseCard className={`py-3 px-4 rounded-md h-auto ${className}`}>
      <Link href={`${pageRoutes.HOME}`} className="text-xl pb-3 font-bold hover:text-dev-blue">{title}</Link>
      <p className="text-[14px] text-black/50">{sub}</p>
      <DiscussionMenu/>
    </BaseCard>
  );
};

export default DiscussionBar2;