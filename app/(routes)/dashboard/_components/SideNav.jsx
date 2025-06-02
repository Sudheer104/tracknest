"use client"

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ]

    const path = usePathname();

    useEffect(() => {
        console.log("Current path:", path);
    }, [path]);

    return (
        <div className='h-screen p-5 border shadow-sm w-64'>
            <Image src="/logo1.svg" alt='logo' width={160} height={100} />

            <div className='mt-5'>
                {menuList.map((menu) => (
                    <Link key={menu.id} href={menu.path}>
                        <div
                            className={`flex gap-2 items-center text-gray-500 
                                font-medium p-5 cursor-pointer rounded-md
                                hover:text-blue-300 hover:bg-indigo-100 transition-colors duration-200
                                ${path === menu.path ? 'text-primary bg-blue-200' : ''}
                            `}
                        >
                            <menu.icon className="w-5 h-5" />
                            {menu.name}
                        </div>
                    </Link>
                ))}
            </div>

            <div className='fixed bottom-10 flex gap-2 p-5 items-center'>
                <UserButton />
                <span className="text-gray-600 font-medium">Profile</span>
            </div>
        </div>
    )
}

export default SideNav
