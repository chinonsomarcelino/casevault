'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io"
import { Denk_One } from 'next/font/google';
import { useSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const font = Denk_One({
    subsets: ["latin"],
    weight: ["400",],
});


const Navbar = () => {

    const [openNav, setOpenNav] = useState(false)
    const { data: session } = useSession();

    const navLinks = [
        {
            label: "Home",
            url: "/",
        },
        {
            label: "Explore",
            url: "/explore",
        },
        {
            label: "Write Case",
            url: "/writecase",
        },
        {
            label: "My Vault",
            url: "/resources",
        },
        {
            label: "Contact",
            url: "/contact",
        },

    ]

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter();


    return (
        <section className='sticky top-0 z-50 bg-[#f5f5f5]'>
            <nav className='flex items-center justify-between md:px-8 px-3 py-4 md:py-5 shadow-md font-semibold lg:px-10'>
                <Link href={"/"} className=''>
                    <h1 className={`text-xl font-semibold text-[#233D4C] md:text-2xl ${font.className} antialiased`} alt='logo'>Case<span className='font-bold'>Vault</span></h1>
                </Link>
                <div className='gap-10 lg:flex hidden items-center'>
                    {
                        navLinks.map((item, index) => (
                            <Link key={index} href={item.url} className='hover:text-[#F97316] transition-colors 
                     duration-300  text-[#233D4C] tracking-tight font-semibold'>{item.label}</Link>
                        ))
                    }

                </div>


                <div className='flex items-center gap-'>
                    {
                        session ?
                            <div className='max-md:ml-auto'>
                                <button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className=''
                                >
                                    <Avatar alt={session?.user?.name} src={session?.user?.image} sx={{
                                        width: { xs: 30, sm: 34, md: 40 },
                                        height: { xs: 30, sm: 34, md: 40 },
                                    }} className=' cursor-pointer ' 
                                    onClick={() => router.push("/profile")}/>
                                </button>
                                {/* <Menu
                                    className='max-md:hidden'
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    slotProps={{
                                        list: {
                                            'aria-labelledby': 'basic-button',
                                        },
                                    }}

                                >
                                    <div>

                                        <MenuItem onClick={handleClose}>
                                            <Link className='text-[#233D4C]' href={"/profile"}>My Profile</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link className='text-[#233D4C]' href={"/contribute"}>Dark mode</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <button onClick={() => signOut()} className='text-[#233D4C]'>Sign Out</button>
                                        </MenuItem>
                                    </div>
                                </Menu> */}
                            </div>
                            :
                            <Link href={"/signin"} className='ml-10 flex items-center gap-1 duration-300 max-md:ml-auto text-[#f5f5f5] rounded-full md:px-6 md:py-2 bg-[#233D4C] hover:bg-[#F97316] hover:text-[#233D4C]'><p className='max-md:hidden'>Sign In</p>
                                <p className='text-xl'><FaRegUserCircle /></p>
                            </Link>
                    }
                    <div className={`h-dvh bg-[#233D4C] lg:hidden w-full absolute top-0 left-0 flex-col items-center gap-10 pt-20  ${openNav ? "flex" : "hidden"} `}>
                        {
                            navLinks.map((item, i) => (
                                <Link key={i} href={item.url} className='hover:text-[#55fff6] transition-colors 
                                 duration-300  text-[#F5F5F5]'>{item.label}</Link>
                            ))
                        }
                    </div>

                    <button onClick={() => { setOpenNav(!openNav) }} className='lg:hidden ml-3 text-xl text-[#233D4C] hover:text-[#55fff6] transition-colors 
                     duration-300 z-50'>
                        {
                            openNav ? <IoMdClose /> : <GiHamburgerMenu />
                        }
                    </button>
                </div>
            </nav>
        </section>

    )
}

export default Navbar
