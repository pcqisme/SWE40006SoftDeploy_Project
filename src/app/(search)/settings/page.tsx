"use client"

import React from 'react';
import SettingNavBar from "~/app/_components/Bar/SettingNavBar";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {pageRoutes} from "~/app/_constants/pageRoutes";
import {useRouter} from "next/navigation";
import BaseCard from "~/app/_components/Card/BaseCard";
import {api} from "~/trpc/react";

const Page = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [profileImage, setProfileImage] = React.useState<File | null>(null);

  const [prevName, setPrevName] = React.useState("");
  const [prevEmail, setPrevEmail] = React.useState("");
  const [prevImage, setPrevImage] = React.useState<File | null>(null);

  if (status === "unauthenticated") {
    router.push(pageRoutes.LOGIN);
  }

  if (!session && status !== "loading") {
    console.error("Error loading session (Session is null).");
    return (
      <div>
        Cant load session.
      </div>
    )
  }

  const updateUser = api.user.updateUserDetails.useMutation({
    onMutate: async (newData) => {
      // save old states
      await update({
        ...session,
        user: {
          ...session?.user,
          ...newData
        }
      })
      return { previousSession: session }
    },
    onError: async (error, newData, ctx) => {
      if (ctx?.previousSession) {
        await update(ctx.previousSession);
      }
    },
    onSuccess: async (newData) => {
      await update(newData);
    }
  });

  const getPresignedUrl = api.aws.generatePresignedUrl.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  }

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

    if (!session) {
      console.error("Session is null");
      return;
    }

    if (name !== "") {
      await updateUser.mutateAsync({
        userId: session.user.id,
        name: name,
      })
    }
    if (email !== "") {
      await updateUser.mutateAsync({
        userId: session.user.id,
        email: email,
      })
    }
    if (profileImage) {
      const coverImageUrl = await uploadImageToS3(profileImage);

      if (!coverImageUrl) {
        console.error("Error uploading coverImage");
        return;
      }

      if (coverImageUrl !== "") {
        await updateUser.mutateAsync({
          userId: session.user.id,
          image: coverImageUrl,
        })
      }
    }

    // reset states
    setName("");
    setEmail("");
    setProfileImage(null);
  }

  return (
    <div className="mx-auto flex h-screen max-w-screen-lg p-2 lg:p-4">
      <form onSubmit={handleSubmit} className="mt-3 grid w-full md:grid-cols-[240px,1fr] gap-4">
        <SettingNavBar />

        <div>
          <div className="mb-4">
            <Link
              href={pageRoutes.SELF + "/" + session?.user.id}
              className="text-3xl font-bold text-dev-blue"
            >
              @{session?.user?.name}
            </Link>
          </div>

          <BaseCard className="mb-6 p-6">
            <h1 className="mb-6 text-2xl font-bold">User</h1>

            <div className="mb-6">
              <p className="mb-2 font-medium">Name</p>
              <input
                type="text"
                className="w-full rounded-md placeholder-black border border-black/30 p-2 focus:border-2 focus:border-dev-blue focus:outline-none"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder={session?.user?.name ?? ""}
              />
            </div>

            <div className="mb-6">
              <p className="mb-2 font-medium">Email</p>
              <input
                type="text"
                className="w-full rounded-md border placeholder-black border-black/30 p-2 focus:border-2 focus:border-dev-blue focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={session?.user?.email ?? ""}
              />
            </div>

            <div className="mb-6">
              <p className="mb-2 font-medium">Profile image</p>
              <div className="flex flex-row items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="rounded-full mr-2 w-12 h-12" src={session?.user?.image ?? ""} alt=""/>
                <div className="flex border rounded-md h-16 p-3 items-center w-full">
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer mr-1 hover:bg-gray-400/80 bg-gray-300 transition-colors duration-200 text-black/70 font-semibold py-2 px-4 rounded-md"
                  >
                    Choose File
                  </label>
                  <p>{profileImage ? profileImage.name : "No file chosen"}</p>
                </div>
              </div>
            </div>
          </BaseCard>

          <BaseCard className="p-6">
            <button type="submit" className="rounded-md w-full py-2 px-4 text-white bg-dev-blue hover:bg-dev-blue-hover">
              <p className="font-medium">Save Profile Information</p>
            </button>
          </BaseCard>
        </div>
      </form>
    </div>
  );
};

export default Page;