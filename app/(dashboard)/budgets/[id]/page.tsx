"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import ExpenseListTable from "@/components/ExpenseListTable";
import AddExpense from "@/components/AddExpense";
import BudgetItem from "@/components/BudgetItem";
import EditBudget from "@/components/EditBudget";
import { deleteBudget, getBudgetById } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Budget = ({ params }) => {
  const [budget, setBudget] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetWithExpenses = await getBudgetById(params?.id);
      const { budget, expenses } = budgetWithExpenses;
      setBudget(budget);
      setExpenses(expenses);
      console.log("Expenses: ", expenses);
    };

    fetchBudget();
  }, []);

  // function to find total expenses
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const items = expenses.length;

  const onDeleteBudget = async () => {
    try {
      await deleteBudget(params?.id);
      toast.success("Budget deleted successfully");
      router.push("/budgets");
    } catch (error) {
      toast.error("Failed to delete budget");
      console.error("Failed to delete budget: ", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft className="cursor-pointer" />
          {budget?.name} Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget budget={budget} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="flex gap-2 rounded-full"
                variant="destructive"
                onClick={() => onDeleteBudget()}
              >
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budget ? (
          <BudgetItem
            budget={budget}
            totalSpend={totalExpenses}
            items={items}
          />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        <AddExpense budgetId={params.id} />
      </div>
      <div className="mt-4">
        <ExpenseListTable expenses={expenses} />
      </div>
    </div>
  );
};

export default Budget;
