'use client'

import React, {useState} from 'react';
import SecondaryBtn from "~/app/_components/Button/SecondaryBtn";
import {BTN_PRIMARY_BG} from "~/app/_constants/styles";
import BlogEditForm from "~/app/_components/Form/BlogEditForm";
import MarkdownRenderer from "~/app/_components/MdTextArea/MarkdownRenderer";

const Page = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [content, setContent] = useState("");

  return (
    <div className="grid grid-cols-18 md:px-4">
      <div className="relative col-span-18 h-full md:col-span-12 md:col-start-2">
        <div className="absolute -top-[42px] right-0 z-50 flex flex-row-reverse">
          <SecondaryBtn
            onClick={() => setIsEdit(false)}
            className={`mr-2 text-black/100 hover:no-underline ${!isEdit ? "font-medium" : "font-normal"}`}
          >
            <p className={`text-black`}>Preview</p>
          </SecondaryBtn>
          <SecondaryBtn
            onClick={() => setIsEdit(true)}
            className={`mx-2 text-black/100 hover:no-underline ${isEdit ? "font-medium" : "font-normal"}`}
          >
            <p className="text-black">Edit</p>
          </SecondaryBtn>
        </div>
        {isEdit ? (
          <BlogEditForm
            title={title}
            tags={tags}
            coverImage={coverImage}
            setTags={setTags}
            setCoverImage={setCoverImage}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            className="mx-1"
          />
        ) : (
          <div className="my-auto flex h-full flex-col">
            <div className="h-full w-full rounded-md border bg-white px-16 py-8">
              <MarkdownRenderer>{content}</MarkdownRenderer>
            </div>

            <div className={`flex flex-row py-6`}>
              <button
                onClick={() => setIsEdit(true)}
                type="submit"
                className={`mr-2 rounded-md bg-[#3b49df] px-4 py-2 font-medium text-white hover:bg-[#2f3ba8]`}
              >
                <p>Return to editing</p>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden p-4 md:col-span-5 md:col-start-14 md:block">
        <p className="text-lg font-bold">Editor Basics</p>
        <ul className="list-disc pl-5 text-black/70">
          <li>Use Markdown to write and format posts.</li>
          <li>
            Embed rich content such as Tweets, YouTube videos, etc. Use the
            complete URL:&nbsp;
            <pre className="inline rounded-lg bg-gray-500/25 p-px">
              <code>&#123;&#37;https://...&#37;&#125;.</code>
            </pre>
            <a href="" className={`text-[${BTN_PRIMARY_BG}]`}>
              &nbsp;See a list of supported embeds.
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            In addition to images for the post's content, you can also drag and
            drop a cover image.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;