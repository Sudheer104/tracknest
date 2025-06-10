"use client";

import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, use, useState } from 'react'; // ✅ Import `use` from React
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';

function ExpensesScreen({ params }) {
    const { user, isLoaded } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList,setExpensesList] = useState([]);

    // ✅ unwrap the promise
    const resolvedParams = use(params); 
    const budgetId = resolvedParams.id;

    useEffect(() => {
        if (isLoaded && user) {
            getBudgetInformation();
        }
    }, [isLoaded, user]);

    /**
     * Get Budget Information
     */
    const getBudgetInformation = async () => {
        const result = await db
            .select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${Expenses.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, budgetId))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        getExpensesList();
    };

    /**
     * Get Latest Expenses
     */
    const getExpensesList = async()=>{
        const result = await db.select().from(Expenses)
        .where(eq(Expenses.budgetId,budgetId))
        .orderBy(desc(Expenses.id));
        setExpensesList(result);
        // console.log(result);
    }

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold">My Expenses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
                )}
                <AddExpense
                    budgetId={budgetId} // ✅ fixed: using resolvedParams.id instead of params.id
                    user={user}
                     refreshData={()=>getBudgetInformation()}
                />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg'>
                    Latest Expenses
                </h2>
                <ExpenseListTable expensesList={expensesList}
                refreshData={()=>getBudgetInformation()}
                />
            </div>
        </div>
    );
}

export default ExpensesScreen;

