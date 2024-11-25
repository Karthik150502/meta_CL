
import { useEffect } from 'react'
import { useState } from 'react'
import { getTheCookie } from '@/actions/test'
import { useQuery } from '@tanstack/react-query';
export default function useAccessToken() {

    const [token, setToken] = useState<string>("");

    const { data } = useQuery({
        queryKey: ['acc_token'],
        queryFn: async () => await getTheCookie(),
    })

    useEffect(() => {
        if (data) {
            setToken(data)
        }
    }, [data])

    return token
}
