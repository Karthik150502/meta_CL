'use client'
import React, { useCallback, useState } from 'react'
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
import { signInSchemaType, signInSchema } from '../../../../../schema'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react";
import Link from 'next/link'
export default function SignInComponent() {


    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<signInSchemaType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {}
    });



    const { mutate, isPending } = useMutation({
        mutationFn: async (form: signInSchemaType) => {
            await signIn("credentials", {
                username: form.username,
                password: form.password,
                redirect: true,
                callbackUrl: "/"
            })
        },
        onSuccess: () => {
            toast.success("User Signed in.", { id: "user-signin" });
        },
        onError: (e) => {
            console.log(e)
            toast.error("Failed to signin.", { id: "user-signin" })
        }
    })

    const onSubmit = useCallback((values: signInSchemaType) => {
        toast.loading("Signing in....", { id: "user-signin" });
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
                        name="password"
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel className='flex gap-1 text-xs items-center'>
                                    Password
                                    <p className='text-xs font-extrabold text-black/70'>(required)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input className='pr-12' {...field} type={showPassword ? "text" : "password"} />
                                </FormControl>
                                <FormMessage className='text-xs w-full text-right' />
                                <Button variant={"ghost"} className='absolute top-4 right-0' size={"icon"} onClick={() => { setShowPassword(!showPassword) }}>
                                    {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
                                </Button>
                            </FormItem>
                        )}
                    />




                    <Button type='submit' className='w-full my-4' disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        {!isPending && "Sign In"}
                    </Button>
                </form>
                <div className='border-t border-t-black/15 py-6 text-center'>
                    <p className='text-xs'>
                        Dont have an Account? <Link href={"/auth/sign-up"} className='text-teal-500 font-bold'>Sign up</Link>
                    </p>
                </div>
            </Form>
        </div>
    )
}
