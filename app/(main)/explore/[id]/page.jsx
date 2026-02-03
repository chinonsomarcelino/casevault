import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/config/firebase';
import { FaArrowLeft } from "react-icons/fa6";
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
    const { id } = await params;
    console.log(id);    
    
    const post = await fetchSinglePost(id);
    console.log(post);

    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <main className='min-h-dvh p-10'>
            <Link href={"/resources"} className=''><FaArrowLeft /></Link>
            <section className='w-1/2 mx-auto my-10 space-y-3'>
                <h1 className='text-center text-2xl font-bold text-gray-900'>{post.title}</h1>
                <span className='flex items-center gap-1 justify-center'>
                    <p>by</p>
                    <p className='font-semibold'>{post.author}</p>
                </span>
                <p className='bg-yellow-200 w-fit mx-auto px-4 py-1 rounded-full text-gray-800'>{post.category}</p>
                <p className='text-lg'>{post.description}</p>
                <span className='flex items-center gap-1 text-xs'>
                    <p>Posted </p>
                    
                </span>
            </section>
        </main>
    );
};

export default Page;