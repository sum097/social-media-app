"use client"

import { auth } from "@/firebase";
import { signOutUser } from "@/redux/slices/userSlice";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function SideBarUserInfo() {
  const dispatch = useDispatch()

  async function handleSignOut() {
    await signOut(auth)

    dispatch(signOutUser())
  }

  return (
    <div
      className="absolute bottom-3 flex items-center 
            space-x-2 xl:p-3 xl:pe-6 hover:bg-gray-500 hover:bg-opacity-10
            rounded-full transition cursor-pointer
            "
      onClick={() => handleSignOut()}
    >
      <Image
        src={"/assets/profile-pic.png"}
        width={36}
        height={36}
        alt="Profile Picture"
        className="w-9 h-9"
      />
      <div className="hidden xl:flex flex-col text-sm">
        <span className="font-bold">Guest</span>
        <span className="text-gray-500">@guest000234</span>
      </div>
    </div>
  );
}
