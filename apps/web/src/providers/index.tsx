'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function AppProviders({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState<QueryClient>(() => new QueryClient());


    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
