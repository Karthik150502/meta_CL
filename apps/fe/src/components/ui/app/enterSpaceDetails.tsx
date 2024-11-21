'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { CreateSpaceSchema, CreateSpaceSchemaType } from "@repo/common"
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '../input';
import { Button } from '../button';
export default function EnterSpaceDetails({ onSubmit }: { onSubmit: (vals: CreateSpaceSchemaType) => void }) {


    const form = useForm<CreateSpaceSchemaType>({
        resolver: zodResolver(CreateSpaceSchema),
        defaultValues: {}
    });


    return (
        <div className='w-full h-full px-4'>
            <div className='py-8'>
                <p className='text-3xl text-center'>Configure the Space</p>
            </div>
            <Form {...form}>
                <form className='space-y-4 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex gap-1 text-xs items-center'>
                                    Enter a name for your Space
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
                        name="dimensions"
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel className='flex gap-1 text-xs items-center'>
                                    Enter the dimensions
                                    <p className='text-xs font-extrabold text-black/70'>(required)</p>
                                </FormLabel>
                                <FormControl>
                                    <Input className='pr-12' {...field} />
                                </FormControl>
                                <FormLabel className="text-xs text-slate-700">
                                    eg: 500x400, 650x750
                                </FormLabel>
                                <FormMessage className='text-xs w-full text-right' />
                            </FormItem>
                        )}
                    />




                    <Button type='submit' className='w-full my-4'>
                        Submit
                    </Button>
                </form>

            </Form>
        </div>
    )
}
