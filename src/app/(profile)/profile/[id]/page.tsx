"use client"

import React from 'react';

import BaseCard from "~/app/_components/Card/BaseCard";
import PostsByUserContainer from "~/app/_components/Container/PostsByUserContainer";
import {useParams} from "next/navigation";
import {api} from "~/trpc/react";

const Page = () => {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id ?? "";

  const { data: user } = api.user.getUserById.useQuery({ userId: userId! })

  if (!user) {
    console.error("Error loading user profile (User is null).");
    return;
  }

  return (
    <div className="w-screen">
      <div className="absolute z-0 h-[127px] w-full bg-black" />

      <div className="z-20 mx-auto w-[992px] pt-2">
        <div className="relative flex flex-col items-center justify-center">
          {/* profile picture */}
          <div className="relative z-20 flex w-32 items-center justify-center rounded-full bg-black p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-[120px] h-[120px] rounded-full"
              src={user.image!}
              alt={user.name!}
            />
          </div>

          <div className="-mt-16 flex w-full flex-row-reverse rounded-t-md bg-white pr-6 pt-6">
            {/* invisible btn to hold the page*/}
            <button
              className={`rounded-md cursor-default bg-white px-4 py-2 font-medium text-white`}
            >
              <p>Edit profile</p>
            </button>
          </div>
        </div>

        {/* first banner*/}
        <div className="z-30 rounded-md rounded-t-none bg-white p-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-2 text-[30px] font-bold">
              {user.name}
            </h1>

            <p className="mb-4 text-lg">{user.bio}</p>
            {/* TODO: dynamic join date */}
            <p className="mb-2 text-sm text-black/70">Joined on {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-6">
          <BaseCard className="col-span-2 m-4 ml-0 flex flex-col mb-auto rounded-md border p-4">
            <div className="flex flex-row mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-3 opacity-50"
                src="/post_published.svg"
                alt="post"
              />
              <p className="text-black/70">5 posts published</p>
            </div>

            <div className="flex flex-row mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="img"
                aria-labelledby="aqv8but2ri8e23gc26ksw6awcbntku9p"
                className="mr-3 opacity-50"
              >
                <title id="aqv8but2ri8e23gc26ksw6awcbntku9p">Comment</title>
                <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
              </svg>
              <p className="text-black/70">10 comments written</p>
            </div>

            <div className="flex flex-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mr-3 opacity-50" src="/hashtag.svg" alt="hash" />
              <p className="text-black/70">0 tags followed</p>
            </div>
          </BaseCard>

          <PostsByUserContainer className="col-span-4 my-4" />
        </div>
      </div>
    </div>
  );
};

export default Page;