"use client";
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem';
import { index } from 'drizzle-orm/gel-core';

function BudgetsList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);


  useEffect(() => {
    user && getBudgetList();
  }, [user])

  /**
   * 
   *@returns  Used to get budgetlist(means try to fetch budgetlist from data)
   * 
   */

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    // console.log(result);
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget
          refreshData={() => getBudgetList()}
        />
        {budgetList?.length > 0 ? budgetList.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))
          //This is for skeleton loading 
          : 
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="w-full p-4 bg-slate-200 rounded-lg h-[150px] animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                <div className="h-3 bg-slate-300 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-slate-300 rounded w-full mt-4"></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BudgetsList