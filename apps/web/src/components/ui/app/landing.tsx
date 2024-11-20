import React from 'react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import LandingText from './landingText';
import SignOutButton from './signOutButton';
// import { getTheCookie } from '@/app/actions/test';
import Comp from './comp';
import Link from 'next/link';


export default async function Landing() {

    const session = await getServerSession(authOptions);
    // await getTheCookie();

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <LandingText>
                Welcome to MetaCl.
            </LandingText>
            <Link href={"/dashboard"}>Go to Dashboard</Link>
            <div>
                <Comp />
            </div>
            <SignOutButton />
            <div className='w-full'>
                <pre>{JSON.stringify(session, null, 4)}</pre>
            </div>
        </div>
    )
}
