'use client'
import React, { useCallback } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { signUpSchema, signUpSchemaType } from '@/schema';
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"
import { SIGN_UP_URL } from '@/lib/api'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function SignupComponent() {



    const form = useForm<signUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {}
    });


    const router = useRouter();


    const { mutate, isPending } = useMutation({
        mutationFn: async (form: signUpSchemaType) => {
            await axios.post(SIGN_UP_URL, form)
        },
        onSuccess: () => {
            toast.success("User Signed up.", { id: "user-signup" });
            router.push("/auth/sign-in")
        },
        onError: (e) => {
            console.log(e)
            toast.error("Failed to signup.", { id: "user-signup" })
        }
    })

    const onSubmit = useCallback((values: signUpSchemaType) => {
        toast.loading("Signing up....", { id: "user-signup" });
        mutate(values);
    }, [mutate])



    return (
        <div className='max-w-[400px] min-w-[320px] w-[360px] p-4 rounded-md shadow-lg'>
            <Form {...form}>
                <form className='space-y-4 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex gap-1 text-xs items-center'>
                                    Username
                                    <p className='text-xs font-extrabold text-black/70'>(required)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className='text-xs w-full text-right' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex text-xs gap-1 items-center'>
                                    Firstname
                                    <p className='text-xs font-extrabold text-black/70'>(required)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className='text-xs w-full text-right' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex gap-1 text-xs items-center'>
                                    Lastname
                                    <p className='text-xs font-extrabold text-black/70'>(optional)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className='text-xs w-full text-right' />
                            </FormItem>
                        )}
                    />





                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex gap-1 text-xs items-center'>
                                    Password
                                    <p className='text-xs font-extrabold text-black/70'>(required)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className='text-xs w-full text-right' />
                            </FormItem>
                        )}
                    />



                    <Button type='submit' className='w-full my-4' disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        {!isPending && "Register"}
                    </Button>
                </form>
                <div className='border-t border-t-black/15 py-6 text-center'>
                    <p className='text-xs'>
                        Already signed up? <Link href={"/auth/sign-in"} className='text-teal-500 font-bold'>Sign in</Link>
                    </p>
                </div>
            </Form>
        </div>
    )
}
