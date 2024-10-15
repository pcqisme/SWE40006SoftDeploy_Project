"use client"

import React from 'react';
import {useParams} from "next/navigation";
import NavBar from "~/app/_components/Bar/NavBar";
import ThirdBtn from "~/app/_components/Button/ThirdBtn";
import SearchPostsContainer from "~/app/_components/Container/SearchPostsContainer";

const Page = () => {
  const {query} = useParams();
  const queryValue = Array.isArray(query) ? query[0] : query ?? "";

  return (
    <div className="flex mx-auto p-2 lg:p-4 max-w-screen-lg h-screen">
      <div className="grid grid-rows-[45px,1fr] grid-cols-[240px,1fr] w-full gap-4">
        <div className="flex items-center col-span-2">
          <h1 className="text-3xl font-bold min-w-[480px]">Search results for {query}</h1>
          <NavBar className="justify-end w-auto " currentTab="Relevant"/>
        </div>

        <div className="flex flex-col">
          <ThirdBtn className="w-full">
            <p className="text-start -ml-1">Posts</p>
          </ThirdBtn>
          <ThirdBtn className="w-full">
            <p className="text-start -ml-1">People</p>
          </ThirdBtn>
          <ThirdBtn className="w-full">
            <p className="text-start -ml-1">Organizations</p>
          </ThirdBtn>
          <ThirdBtn className="w-full">
            <p className="text-start -ml-1">Tags</p>
          </ThirdBtn>
          <ThirdBtn className="w-full">
            <p className="text-start -ml-1">Comments</p>
          </ThirdBtn>
          <ThirdBtn className="w-full">
            <p className="text-start -ml-1">My posts only</p>
          </ThirdBtn>
        </div>

        <SearchPostsContainer query={queryValue!} className=""/>
      </div>
    </div>
  );
};

export default Page;