"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";
import { toast } from "sonner";
import ExpenseListTable from "@/components/ExpenseListTable";
import AddExpense from "@/components/AddExpense";
import BudgetItem from "@/components/BudgetItem";
import EditBudget from "@/components/EditBudget";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { deleteBudget, getBudgetById } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Budget = ({ params }) => {
  const [budget, setBudget] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const truncate = (str, words) => {
    const truncatedWords = str.split(" ").slice(0, words).join(" ");
    return truncatedWords;
  };

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetWithExpenses = await getBudgetById(params?.id);
      const { budget, expenses } = budgetWithExpenses;
      setBudget(budget);
      setExpenses(expenses);
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
      setIsDeleting(false);
    } catch (error) {
      toast.error("Failed to delete budget");
      console.error("Failed to delete budget: ", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isDeleting && (
        <DeleteConfirmation
          component={"Budget"}
          subject={truncate(budget?.name, 2)}
          onConfirm={onDeleteBudget}
          onCancel={() => setIsDeleting(false)}
        />
      )}
      <div className="p-10">
        <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
          <span className="flex gap-2 items-center text-lg md:text-2xl">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => router.back()}
            />
            {budget?.name}{" "}
            <span className="text-slate-700/60 text-md md:text-lg">
              Expenses
            </span>
          </span>
          <div className="flex gap-2 items-center">
            <EditBudget budget={budget} />

            <Button
              className="flex gap-2 rounded-full"
              variant="destructive"
              onClick={() => setIsDeleting(true)}
            >
              <Trash className="w-4" /> Delete
            </Button>
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
    </>
  );
};

export default Budget;
