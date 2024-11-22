'use client'
import React from 'react'
import { Menu } from 'lucide-react';
import Link from 'next/link';
import LogoIcon from '../logoIcon';
import { signOut, useSession } from 'next-auth/react';
import CreateSpace from './createSpace';
export default function Header() {


    const { data: session } = useSession();

    const isAdmin = session?.user?.role === "Admin";
    return (
        <header className='py-4 border-b border-white/15 md:border-none fixed top-0 z-10 backdrop-blur-xl md:backdrop-blur-none w-full'>
            {/* <div className="absolute inset-0 backdrop-blur-xl -z-10"></div> */}
            <div className="container">
                {/*removed - md:border border-white/15 */}
                <div className='flex justify-between items-center md:p-2.5 rounded-xl max-w-2xl md:shadow-lg mx-auto md:backdrop-blur-xl'>
                    <div className='px-4'>
                        <div className='w-10 h-10 rounded-lg inline-flex justify-center  items-center'>
                            <LogoIcon size={55} />
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <nav className='flex gap-8 text-xs px-4'>


                            <CreateSpace />

                            <Link href={"/join-space"} className='text-black/70 hover:text-black transition-colors' >Join Space</Link>

                            {/* {
                                isAdmin && <Link href={"/builder"} className='text-black/70 hover:text-black transition-colors'>Builder</Link>
                            } */}

                            <Link href={"#"} className='text-black/70 hover:text-black transition-colors'
                                onClick={(e) => {
                                    e.preventDefault();
                                    signOut()
                                }}
                            >Sign Out</Link>
                        </nav>
                    </div>
                    <div className='flex gap-4 items-center md:hidden'>
                        <Menu className='md:hidden' />
                    </div>
                </div>
            </div>
        </header>
    )
}
