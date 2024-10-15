import React from 'react';
import {HydrateClient} from "~/trpc/server";
import Menu from "~/app/_components/SideMenu/Menu";
import NavBar from "~/app/_components/Bar/NavBar";
import PostsContainer from "~/app/_components/Container/PostsContainer";
import DiscussionBar from "~/app/_components/Bar/DiscussionBar";
import DiscussionBar2 from "~/app/_components/Bar/DiscussionBar2";

const Page = () => {
  return (
    <div className="grid grid-cols-12 lg:grid-cols-11 gap-4 w-full">
      <div className="hidden md:block col-span-3 lg:col-span-2 lg:min-w-60">
        <Menu/>
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-6 ">
        <NavBar currentTab="Latest" className="mb-2"/>
        <PostsContainer/>
      </div>

      <div className="hidden lg:block col-start-9 col-span-2 lg:col-span-3">
        <DiscussionBar title={"Active discussions"} className="mb-4"/>
        <DiscussionBar2 className="" title={"#discuss"} sub={"Discussion threads targeting the whole community"}/>
      </div>
    </div>
  );
};

export default Page;