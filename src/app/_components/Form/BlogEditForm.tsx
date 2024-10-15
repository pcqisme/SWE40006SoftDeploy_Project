"use client"

import React, {type Dispatch, type SetStateAction} from 'react';
import SecondaryBtn from "~/app/_components/Button/SecondaryBtn";
import Image from "next/image";
import {api} from "~/trpc/react";
import {useRouter} from "next/navigation";
import TextToolBar from "~/app/_components/Bar/TextToolBar";

const BlogEditForm = ({
  className,
  content,
  setContent,
  title,
  tags,
  coverImage,
  setCoverImage,
  setTags,
  setTitle,
} : {
  className: string,
  content: string,
  setContent: Dispatch<SetStateAction<string>>,
  title: string,
  tags: string,
  coverImage: File | null,
  setTitle: Dispatch<SetStateAction<string>>,
  setTags: Dispatch<SetStateAction<string>>,
  setCoverImage: Dispatch<SetStateAction<File | null>>,
}) => {
  const router = useRouter();
  const getPresignedUrl = api.aws.generatePresignedUrl.useMutation();

  const publish = api.post.addPost.useMutation({
    onSuccess: () => {
      console.log('Post added successfully');

      // reset after submission
      setTitle('');
      setTags('');
      setContent('');
      setCoverImage(null)

      router.push("/");
    },
    onError: (error) => {
      console.error('Error adding post:', error);
    },
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const uploadImageToS3 = async (file: File) => {
    try {
      // get pre-signed url for image upload
      const { uploadUrl, publicUrl } = await getPresignedUrl.mutateAsync({
        fileName: file.name,
        fileType: file.type,
      });

      // upload image to S3 using pre-signed url
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to S3");
      }

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coverImage) {
      console.error("Upload a cover image plss");
      return;
    }

    const coverImageUrl = await uploadImageToS3(coverImage);
    if (!coverImageUrl) {
      console.error("Error uploading image");
      return;
    }

    const tagsList = tags.split(',').map((tag) => tag.trim()).filter(Boolean);

    publish.mutate({
      name: title,
      content: content,
      coverImage: coverImageUrl,
      tags: tagsList,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex h-full flex-col ${className}`}
    >
      <div className="flex-grow rounded-md border bg-white">
        <div className="overflow-auto">
          <div className="h-full px-16 py-8">
            <button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="mb-5 block rounded-md border-2 border-gray-400/50 px-3.5 py-1.5 font-semibold text-black/65 shadow"
            >
              <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

              <p className="text-black/70">
                {coverImage ? coverImage.name : "Add a cover image"}
              </p>
            </button>

            <textarea
              placeholder="New post title here..."
              className="mb-2 w-full resize-none border-0 text-5xl font-black placeholder-black/70 focus:outline-0 focus:ring-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Add up to 4 tags (separate by comma)"
              className="w-full border-0 text-base placeholder-black/70 focus:outline-0 focus:ring-0"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <TextToolBar className="-ml-2 bg-[#F9F9F9] px-16 py-2" />

          <textarea
            placeholder="Write your post content here..."
            className="w-full resize-none border-0 px-16 py-8 font-devMono text-lg font-medium placeholder-black/80 focus:outline-0 focus:ring-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className={`flex flex-row py-6`}>
        <button
          type="submit"
          className={`mr-2 rounded-md bg-[#3b49df] px-4 py-2 font-medium text-white hover:bg-[#2f3ba8]`}
        >
          <p>Publish</p>
        </button>

        <SecondaryBtn className="mr-2 px-4 font-normal">
          <p className="text-black">Save draft</p>
        </SecondaryBtn>
        <SecondaryBtn className="mr-2">
          <Image src="/setting.svg" alt="" width={24} height={24} />
        </SecondaryBtn>
        <SecondaryBtn className="mr-2 px-4">
          <p className="text-sm text-black">Revert new changes</p>
        </SecondaryBtn>
      </div>
    </form>
  );
};

export default BlogEditForm;