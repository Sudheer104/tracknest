"use client";
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpensesListTable from './expenses/_components/ExpenseListTable';  // ✅ Correct import with capital letter

//This work as a router which direct render in ui using localhost:3000/dashboard
function Dashboard() {
  const { user } = useUser(); //This provided by the cleark login user name

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user])

  /**
   * 
   *@returns  Used to get budgetlist (means try to fetch budgetlist from data)
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
    getAllExpenses();
  }

  /**
   * Used to get all expenses belongs to user
   */
  const getAllExpenses = async () => {
  const result = await db.select({
    id: Expenses.id,
    name: Expenses.name,
    amount: Expenses.amount,
    createdAt: Expenses.createdAt
  }).from(Expenses)
    .leftJoin(Budgets, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Budgets.id));

  setExpensesList(result);
}

  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi,{user?.fullName}✌️</h2>
      <p className='text-gray-500'>Here's what happening with your money, Let's manage your expense</p>

      {/**This is CardInfo.jsx Component*/}
      <CardInfo budgetList={budgetList} />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>

          {/**This is BarChartComponent.jsx */}
          {budgetList.length > 0 && (
            <BarChartDashboard budgetList={budgetList} />
          )}

          {/**This is ExpenseListTable.jsx */}
          <ExpensesListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>

        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard;
