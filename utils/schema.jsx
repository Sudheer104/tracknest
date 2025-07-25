import { integer } from "drizzle-orm/gel-core";
import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Budgets table
export const Budgets = pgTable('budgets', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull()
})

// Expenses Table
export const Expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: numeric('amount').notNull().default(0),
  budgetId:integer('budgetId').references(()=>Budgets.id),
  createdAt: varchar('createdAt').notNull()
})