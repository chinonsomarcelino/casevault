import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/config/firebase';
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';

const fetchSinglePost = async (id) => {
    try {
        const docRef = doc(db, "cases", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("AN ERROR OCCURRED", error);
        throw error;
    }
};

const Page = async ({ params }) => {
    const { id } = await params; // ✅ FIXED: params is not async, removed "await"

    const post = await fetchSinglePost(id);

    if (!post) {
        return <p>Post not found.</p>;
    }

    // ✅ FIXED: Convert Firestore Timestamp → JS Date → readable string
    const formattedDate =
        post.createdAt?.toDate().toLocaleString() || "No date";

    return (
    <main className="min-h-dvh bg-[#f5f5f5] py-14 px-4">
      <section className="max-w-3xl mx-auto bg-gray-50 shadow-lg rounded-2xl p-8">

        {/* Back Button */}
        <Link
          href="/explore"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
        >
          <FaArrowLeftLong />
          Back to cases
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#233D4C] leading-snug">
          {post.title}
        </h1>

        {/* Category */}
        <div className="flex justify-center">
          <span className="text-[#F97316] text-sm font-semibold capitalize">
            {post.category}
          </span>
        </div>

        {/* Author Section */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 md:flex-col mt-3 text-center">
          <img
            src={post.authorImage || "/avatar.png"} // fallback image
            alt="author"
            className="w-10 h-10 rounded-full object-cover border"
          /><span className="font-semibold text-gray-700">{post.author}</span>
        </div>

        <div className="h-px bg-gray-200 mt-3" />

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-md md:text-lg whitespace-pre-line mx-auto text-center">
          {post.description}
        </p>
        <p className='flex items-center text-sm font-semibold text-gray-500 gap-1 mt-3'>
          <p>Posted</p><span>{formattedDate}</span>  
        </p>
      </section>
    </main>
  );
};

export default Page;
