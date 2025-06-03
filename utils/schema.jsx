import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Budgets table
export const Budgets = pgTable('budgets', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  icon: varchar('icon'),
  createdBy: varchar('createdBy').notNull()
})