import LandingText from '@/components/ui/app/landingText'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options';
import Link from 'next/link';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="min-h-screen overflow-hidden relative flex flex-col items-center justify-center">
            <LandingText>
                Welcome the Dashboard of the Metacl.
            </LandingText>
            <Link href={"/"}>To Home</Link>
            <div className='bg-teal-300 rounded-md p-4'>
                <pre>{JSON.stringify(session?.user, null, 4)}</pre>
            </div>
        </div>
    )
}
