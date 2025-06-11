import Link from 'next/link'
import React from 'react'

function BudgetItem({ budget }) {
    const calculateProgressPercentage = () => {
        // (spqnd/total)*100
        const per = (budget.totalSpend / budget.amount) * 100;
        return per.toFixed(2);
    }
    return (

        <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer hover:border-blue-700 h-[170px] '>
            <Link href={`/dashboard/expenses/${budget?.id}`}>
                <div className='flex gap-2 items-center justify-between '>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
                            {budget?.icon}
                        </h2>
                        <div>
                            <h2 className='font-bold '>{budget.name}</h2>
                            <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
                        </div>
                    </div>
                    <h2 className='font-bold text-primary text-lg'>${budget.amount}</h2>
                </div>

                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-3'>
                        <h2 className='text-xs text-slate-400'>
                            ${budget.totalSpend ? budget.totalSpend : 0} Spend
                        </h2>
                        <h2 className='text-xs text-slate-400'>
                            ${budget.amount - budget.totalSpend} Remaning
                        </h2>
                    </div>
                    <div className='w-full bg-slate-300 h-2 rounded-full'>  { /**This is for progress bar inside the items */}
                        <div className=' bg-blue-600 h-2 rounded-full'
                            style={{
                                width: `${calculateProgressPercentage()}%`,
                                transition: 'width 0.3s ease-in-out'
                            }}
                        >


                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BudgetItem