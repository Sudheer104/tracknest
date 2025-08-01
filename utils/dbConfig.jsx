import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'


import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle(sql,{schema});

// const result = await db.execute('select 1');
