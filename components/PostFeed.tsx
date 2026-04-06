"use client";

import React, { useEffect, useState } from "react";
import Postinput from "./PostInput";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";
import Post from "./Post";
import { useDispatch } from "react-redux";
import { closeLoadingScreen } from "@/redux/slices/loadingSlice";

interface PostData {
  id: string;
  data: DocumentData;
}

export default function PostFeed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setPosts(snapshotDocs);
      dispatch(closeLoadingScreen());
    });

    return unsubscribe;
  }, []);

  return (
    <div
      className="flex-grow
    max-w-2xl
    border-x
    border-gray-100
    "
    >
      <div
        className="py-4 px-3 text-lg sm:text-xl sticky top-0
        z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold
        border-b border-gray-100
        "
      >
        Home
      </div>
      <Postinput />

      {posts.map((post) => {
        if (!post.data || !post.data.username) return null;
        return <Post key={post.id} id={post.id} data={post.data} />;
      })}
    </div>
  );
}