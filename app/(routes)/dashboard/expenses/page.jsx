"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import ExpensesListTable from './_components/ExpenseListTable'; // ✅ Correct path

function Page() {
    const { user } = useUser();

    const [expensesList, setExpensesList] = useState([]);
    const [budgetList, setBudgetList] = useState([]);

    useEffect(() => {
        if (user) {
            getAllExpenses();
            getBudgetList();
        }
    }, [user]);

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
    };

    /**
     * Used to refresh budget list if needed
     */
    const getBudgetList = async () => {
        const result = await db.select().from(Budgets)
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Budgets.id));

        setBudgetList(result);
    };

    return (
        <div className="p-8">
            <div className='grid grid-cols-1 w-fit'>
                <h1 className='font-bold text-4xl'>My Expenses</h1>
                <h3 className='pt-2 text-lg'>Latest Expenses</h3>
            </div>
            {/** This is ExpenseListTable.jsx */}
            <ExpensesListTable
                expensesList={expensesList}
                refreshData={() => getBudgetList()}
            />
        </div>
    );
}

export default Page;
