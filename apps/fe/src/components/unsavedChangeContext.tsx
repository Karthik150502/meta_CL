'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
type Props = {
    isDirty: boolean,
    setIsDirty: React.Dispatch<React.SetStateAction<boolean>>
}

export const DirtyContext = createContext<Props | null>(null);

// Create the provider component
export const DirtyProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (isDirty) {
                console.log("Leaving the page.")
                // Do the deed
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    return <DirtyContext.Provider value={{ isDirty, setIsDirty }}>
        {children}
    </DirtyContext.Provider>
};

// Custom hook to use the DirtyContext
export const useDirtyContext = () => useContext(DirtyContext);