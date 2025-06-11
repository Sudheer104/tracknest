"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
//This work as a router which direct render in ui using localhost:3000/dashboard
function Dashboard() {
  const {user} = useUser(); //This provided by the cleark login user name

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
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi,{user?.fullName}✌️</h2>
      <p className='text-gray-500'>Here's what happning with your money, Lets manage your expense</p>

      <CardInfo budgetList={budgetList} />
    </div>
  )
}

export default Dashboard