
'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React from 'react'
import { useMemo } from 'react';

export default function ReactQueryProviders({ children }: { children: React.ReactNode }) {

    const queryClient = useMemo<QueryClient>(() => new QueryClient(), []);


    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
