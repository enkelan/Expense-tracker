'use client';
import React, { useEffect, useState } from 'react';
import { db } from '/utils/dbConfig';
import { getTableColumns, sql, eq, desc } from 'drizzle-orm';
import { Budgets, Expenses } from '/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '/app/(routes)/dashboard/budgets/_components/BudgetItem';
import AddExpense from '/app/(routes)/dashboard/expenses/[id]/_components/AddExpense';
import ExpenseListTable from '/app/(routes)/dashboard/expenses/[id]/_components/ExpenseListTable';
import { ArrowLeftToLine, Pen, PenBox, Trash } from 'lucide-react';
import { Button } from '/components/ui/button';
import CustomAlertDialog from '/app/(routes)/dashboard/expenses/[id]/_components/AlertDialog';
import { useToast } from '/app/_components/ToastManager';
import { useRouter } from 'next/navigation';
import EditBudget from '/app/(routes)/dashboard/expenses/[id]/_components/EditBudget';
import Link from 'next/link';

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const { addToast } = useToast();
  const router = useRouter();
  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  // get budget information
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);
    setbudgetInfo(result[0]);
    getExpensesList();
  };
  // get latest expenses
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  };

  // Used to Delete Budget
  const handleDelete = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();
    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
    }
    addToast('Budget Deleted!', 3000);
    router.replace('/dashboard/budgets');
  };

  return (
    <div className="p-10">
      <div className="p-10">
        <h2 className="text-2xl font-bold flex justify-between items-center">
          <Link className="flex items-center gap-2" href="/dashboard">
            <ArrowLeftToLine className="hover:bg-primary rounded-full w-10 h-10 p-2" />
            My Expenses
          </Link>
          <div className="flex gap-2 items-center">
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={() => getBudgetInfo()}
            />
            <CustomAlertDialog
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete your budget and all the expenses associated with it."
              onConfirm={handleDelete}
              trigger={
                <Button className="flex gap-2" variant="destructive">
                  <Trash /> Delete
                </Button>
              }
            />
          </div>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
