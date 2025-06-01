"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from "next/link"
import Image from 'next/image'
import React from 'react'

function Header() {
    const { user, isSignedIn } = useUser(); //Hook
    return (
        <div className='p-5 flex justify-between items-center border shadow-sm'>
            <Image src={'./logo1.svg'}
                alt='logo'
                width={160}
                height={100} />
            {
            isSignedIn ?
                <UserButton /> :
                <Link href={'./sign-in'}>
                <Button className="cursor-pointer">Get Started</Button>
                </Link>
            }
        </div>
    )
}

export default Header