
"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

// const originalBeforeUnload = window.onbeforeunload;
export default function TestingPage() {

    const [count, setCount] = useState(0);


    // useEffect(() => {
    //     window.onbeforeunload = () => {
    //         console.log("Leaving the page..........");
    //     }
    //     return () => {
    //         window.onbeforeunload = originalBeforeUnload;
    //     }
    // }, [])


    return (
        <div>
            Count: {count}
            <Button
                onClick={() => {
                    setCount(count + 1)
                }}
            >Increment</Button>
        </div>
    )
}
