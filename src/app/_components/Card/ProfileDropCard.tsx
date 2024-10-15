"use client"

import React from 'react';
import {signOut} from "next-auth/react";
import SecondaryBtn from "~/app/_components/Button/SecondaryBtn";
import {useRouter} from "next/navigation";
import {pageRoutes} from "~/app/_constants/pageRoutes";

const ProfileDropCard = ({
  userId,
  username,
  email,
}: {
  userId: string;
  username: string;
  email: string;
}) => {
  const router = useRouter();

  return (
    <div className="absolute top-9 right-0 mt-2 w-[234px] rounded-md border bg-white p-2 shadow-md">
      <SecondaryBtn
        className="mr-2 h-auto w-full px-4 py-2 text-left"
        onClick={() => router.push(pageRoutes.SELF + "/" + userId)}
      >
        <p className="font-medium text-black hover:text-dev-blue">{username}</p>
        <p className="text-sm text-black/70 hover:text-dev-blue">{email}</p>
      </SecondaryBtn>

      <div className="my-2 border-t" />

      <SecondaryBtn
        className="mr-2 w-full px-4 text-left"
        onClick={() => router.push(pageRoutes.HOME)}
      >
        <p className="text-black/90">Dashboard</p>
      </SecondaryBtn>

      <SecondaryBtn
        className="mr-2 w-full px-4 text-left"
        onClick={() => router.push(pageRoutes.NEW_POST)}
      >
        <p className="text-black/90">Create Post</p>
      </SecondaryBtn>

      <SecondaryBtn
        className="mr-2 w-full px-4 text-left"
        onClick={() => router.push(pageRoutes.READING_LIST)}
      >
        <p className="text-black/90">Reading List</p>
      </SecondaryBtn>

      <SecondaryBtn className="mr-2 px-4 w-full text-left">
        <p className="text-black/90">Settings</p>
      </SecondaryBtn>

      <div className="my-2 border-t" />

      <SecondaryBtn className="mr-2 w-full px-4 text-left" onClick={() => signOut()}>
        <p className="text-black/90">Sign Out</p>
      </SecondaryBtn>
    </div>
  );
};

export default ProfileDropCard;