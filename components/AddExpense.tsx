"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

import { Loader } from "lucide-react";
import { addNewExpense } from "@/utils/api";

const AddExpense = ({ budgetId }) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const createNewExpense = async () => {
    try {
      setLoading(true);
      const expense = await addNewExpense({ name, amount, budgetId });
      toast.success("Expense created successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to create expense");
      console.error("Failed to create expense: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => createNewExpense()}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
};

export default AddExpense;
