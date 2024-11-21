import SignInComponent from '@/app/auth/_components/auth/signin'
import LandingText from '@/components/ui/app/landingText'
import React from 'react'

export default function SigninPage() {
    return (
        <div className='min-h-screen overflow-hidden relative flex items-center justify-center flex-col'>
            <LandingText>
                SignIn | MetaCL
            </LandingText>
            {/* <p className='text-3xl text-black font-bold bg-clip-text text-transparent bg-gradient-to-tl from-purple-950 via-purple-900 to-purple-200'>SignIn | MetaCL</p> */}
            <SignInComponent />
        </div>
    )
}
