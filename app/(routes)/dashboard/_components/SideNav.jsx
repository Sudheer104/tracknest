import { UserButton } from '@clerk/nextjs'
import { icons, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid
        },
        {
            id:2,
            name:'Budget',
            icon:PiggyBank
        },
        {
            id:3,
            name:'Budget',
            icon:ReceiptText
        },
        {
            id:4,
            name:'Budget',
            icon:ShieldCheck
        }
    ]
    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={'./logo1.svg'}
            alt='logo'
                width={160}
                height={100}
            />
            <div className='mt-5'>
                {menuList.map((menu,index)=>(
                    <h2 key={index}
                    className='flex gap-2 items-center text-gray-500 
                    font-medium p-5 cursor-pointer rounded-md
                   hover:text-blue-300 hover:bg-indigo-100 transition-colors duration-200 '>
                        <menu.icon/>
                        {menu.name}
                    </h2>
                ))}
            </div>
            <div className='fixed bottom-10 flex gap-2 p-5 items-center'>
                <UserButton/>
                Profile
            </div>
        </div>
    )
}

export default SideNav