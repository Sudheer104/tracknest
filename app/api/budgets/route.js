import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return new Response("Email required", { status: 400 });
  }

  const result = await db
    .select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, email));

  // Just return the data, no navigation here
  return new Response(JSON.stringify(result));
}
