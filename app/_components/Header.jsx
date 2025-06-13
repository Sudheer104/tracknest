"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from "next/link"
import Image from 'next/image'
import React from 'react'

function Header() {
    const { user, isSignedIn } = useUser(); //Hook
    return (
        <div className='p-5 flex justify-between items-center border shadow-sm sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
            <Image src={'./logo1.svg'}
                alt='logo'
                width={160}
                height={100} 
                />

            {/* Correct Link to dashboard */}
            <Button>
                <Link href="./dashboard" className="font-bold cursor-pointer text-blue-600 ">
                Go To Dashboard
            </Link>
            </Button>
            {
                isSignedIn ?
                    <UserButton /> :
                    <Link href={'./sign-in'}>
                        <Button className="cursor-pointer text-blue-600 ">Get Started</Button>
                    </Link>
            }
        </div>
    )
}

export default Header