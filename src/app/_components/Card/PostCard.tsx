import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {BTN_PRIMARY_BG} from "~/app/_constants/styles";
import {pageRoutes} from "~/app/_constants/pageRoutes";
import {useRouter} from "next/navigation";

export interface Comment {
  username: string;
  userProfileImage: string
  content: string
  commentDate: string
}

export interface Post {
  id: string
  userId: string
  username: string
  userProfileImage: string
  timePosted: string
  coverImage: string
  title: string
  numberOfReactions: number
  tags: string[]
  comments: number
  className?: string
}

const PostCard: React.FC<Post> = ({
  id,
  userId,
  username,
  userProfileImage,
  timePosted,
  title,
  coverImage,
  tags,
  numberOfReactions,
  comments,
  className="",
}) => {
  const router = useRouter();

  return (
    <div className={`${className} w-full rounded-md border bg-white mb-2`}>
      {/* bg image */}
      {coverImage && (
        <div className="h-auto w-full">
          <Link href={`${pageRoutes.PROFILES}/${id}`} passHref>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rounded-t" src={coverImage} alt={username} />
          </Link>
        </div>
      )}

      <div className="rounded-b p-5">
        <div className="mb-2 flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mr-2 cursor-pointer h-8 w-8 items-start rounded-full"
            src={userProfileImage}
            onClick={() => router.push(pageRoutes.PROFILES + "/" + userId)}
            alt=""
          />
          <div className="flex flex-col">
            <button
              onClick={() => router.push(pageRoutes.PROFILES + "/" + userId)}
              className="hover:bg-[#F5F5F5] rounded-md -my-2 -ml-1 p-1 font-semibold text-sm"
            >
              {username}
            </button>
            <div className="flex flex-grow"/>
            <p className="text-xs">
              {new Date(timePosted).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* title, tags and reactions */}
        <div className="pl-10">
          <Link href={`post/${id}`}
                className={`hover:text-[#2f3ba8] text-[30px] font-bold mb-2 hover:text-[${BTN_PRIMARY_BG}]`}>
            {title}
          </Link>

          {/* tags */}
          <div className="flex flex-row mb-2">
            {tags.map((tag, index) => (
              <p key={index}
                 className="text-[14px] py-1 px-[7px] border border-white hover:bg-[#F5F5F5] hover:border-gray-400/80 rounded">#{tag}</p>
            ))}
          </div>

          {/* reaction */}
          <div className="flex flex-row">
            <div className="flex flex-row items-center py-1 pr-3 pl-2 focus:cursor-pointer rounded hover:bg-[#F5F5F5]">
              <div
                className="flex items-center justify-center focus:cursor border-white border h-[28px] w-[28px] rounded-full bg-[#F5F5F5]">
                <Link href={`${pageRoutes.POST}/${id}`} passHref>
                  <Image src={"/heart.svg"} alt={"heart"} height={18} width={18}/>
                </Link>
              </div>

              <Link href={`${pageRoutes.POST}/${id}`} passHref className="flex items-center hover:cursor-pointer ml-2">
                <p className="text-sm text-black/70">{numberOfReactions} Reaction{numberOfReactions < 2 ? '' : 's'}</p>
              </Link>
            </div>

            {/* comments */}
            <div className="flex flex-row items-center hover:cursor-pointer rounded py-1 pr-3 pl-2 hover:bg-[#F5F5F5]">
              <Link className="flex flex-row hover:cursor-pointer items-center" href={`${pageRoutes.POST}/${id}`} passHref>
                <Image className="mr-1" src="/comment.svg" alt="cmt icon" width={24} height={24}/>
                <p className="text-sm text-black/70">{comments} Comment{comments < 2 ? '' : 's'}</p>
              </Link>
            </div>

            <div className="flex-grow"/>

            {/* save post */}
            <Link className="flex flex-row items-center" href={`${pageRoutes.POST}/${id}`} passHref>
              <p className="text-xs text-black/70 mr-1">1 min read</p>
              <div className="p-2 rounded-md hover:bg-[#2f3ab2]/15">
                <Image src="/flag.svg" alt="save post" width={24} height={24}/>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* comments */}
      <div></div>
    </div>
  );
};

export default PostCard;