// import { UserButton } from '@clerk/nextjs'
// import React from 'react'

// function DashboardHeader() {
//   return (
//     <div className='p-5 shadow-sm border-b flex justify-between'>
//         <div>
//             SearchBar
//         </div>
//         <div>
//             <UserButton/>
//         </div>
        
//     </div>
//   )
// }
// hello
// export default DashboardHeader

"use client";
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'  // you can install lucide-react icons

function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center bg-white dark:bg-gray-900'>
      {/* Left: Logo or Search */}
      <div className='font-bold text-lg text-blue-600'>SearchBar</div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-38 font-medium items-center'>
        <Link href="/dashboard" className='hover:text-blue-500'>Dashboard</Link>
        <Link href="/dashboard/expenses" className='hover:text-blue-500'>Expenses</Link>
        <Link href="/dashboard/budgets" className='hover:text-blue-500'>Budgets</Link>
        <Link href="/dashboard/upgrade" className='hover:text-blue-500'>Upgrade</Link>
        <UserButton/>
      </div>

      {/* Mobile Hamburger */}
      <div className='md:hidden flex items-center gap-3'>
        <UserButton/>
        <button onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute top-16 right-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 flex flex-col gap-4 font-medium w-40'>
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/dashboard/expenses" onClick={() => setIsOpen(false)}>Expenses</Link>
          <Link href="/dashboard/budgets" onClick={() => setIsOpen(false)}>Budgets</Link>
          <Link href="/dashboard/upgrade" onClick={() => setIsOpen(false)}>Upgrade</Link>
        </div>
      )}
    </div>
  )
}

export default DashboardHeader;
