import SignupComponent from '@/app/auth/_components/auth/signup'
import LandingText from '@/components/ui/app/landingText'
import React from 'react'

export default function SignupPage() {
    return (
        <div className='min-h-screen overflow-hidden relative flex items-center justify-center flex-col'>
            <LandingText>
                SignUp | MetaCL
            </LandingText>
            <SignupComponent />
        </div>
    )
}
