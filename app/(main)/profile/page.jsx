import React from 'react'
import Avatar from "@mui/material/Avatar";
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Update from './Update';

const page = async () => {
    const session = await auth()
    console.log(session);

    if (!session) {
        redirect("/")
    }

    return (
        <section className="min-h-screen px-6 py-12 bg-[#233D4C]">

            {/* Profile Card */}
            <div className="max-w-3xl mx-auto bg-[#233D4C] rounded-2xl  md:p-8">

                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <Avatar alt={session?.user?.name} src={session?.user?.image} sx={{
                        width: { xs: 80, sm: 84, md: 100 },
                        height: { xs: 80, sm: 84, md: 100 },
                    }} className='' />
                    <h1 className="md:text-2xl font-bold mt-4 text-[#f5f5f5] text-lg">
                        {session.user.name}
                    </h1>
                    <p className="text-gray-200 text-xs md:text-sm">Member since 2026</p>
                </div>

                {/* Divider */}
                <hr className="my-8 text-gray-400" />

                {/* Info Section */}
                <div className="grid md:grid-cols-2 gap-6 text-sm">

                    <div>
                        <h2 className="font-semibold text-[#55fff6] mb-2">Email</h2>
                        <p className="text-[#f5f5f5]">{session.user.email}</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-[#55fff6] mb-2">Role</h2>
                        <p className="text-gray-200">Case Contributor</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-[#55fff6] mb-2">Cases Written</h2>
                        <p className="text-gray-200">12</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-[#55fff6] mb-2">Status</h2>
                        <p className="text-green-400">Active</p>
                    </div>

                </div>

                {/* Buttons */}
                <div className='mt-10 justify-center flex flex-col gap-4 items-center'>
                    <div className='w-full justify-center'><Update session={session}/></div>
                    <div className="flex gap-4 justify-center">
                        <button className="border border-[#f5f5f5] text-[#f5f5f5] md:px-6 py-1 rounded-lg hover:bg-white/10 duration-300 cursor-pointer text-sm md:text-base font-semibold px-4">
                            Edit Profile
                        </button>
                        <form action={async () => {
                            "use server"
                            await signOut()
                        }}> <button className="bg-[#f5f5f5] text-[#233D4C] font-semibold md:px-6 md:py-2 rounded-lg hover:opacity-90 duration-300 transition cursor-pointer text-sm md:text-base px-4 py-1" type='submit'>
                                Logout </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}


export default page