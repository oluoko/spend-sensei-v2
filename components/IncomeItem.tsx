"use client";

import Link from "next/link";
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogClose, DialogFooter, DialogHeader } from "./ui/dialog";
import { useState } from "react";
import { Pen, Trash } from "lucide-react";
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteIncome } from "@/utils/api";

const IncomeItem = ({ budget }) => {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const truncate = (str, words) => {
    const truncatedWords = str.split(" ").slice(0, words).join(" ");
    return truncatedWords;
  };

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const onIncomeUpdate = async () => {
    try {
      setLoading(true);
      // await addNewIncome({ name, amount, icon: emojiIcon });
      toast.success("Income updated successfully");
      // window.location.reload();
    } catch (error) {
      toast.error("Failed to update income");
      console.error("Failed to update income: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteIncome = async () => {
    try {
      await deleteIncome(budget?.id);
      toast.success("Budget deleted successfully");
      window.location.reload();
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
          component={"Income Stream"}
          subject={truncate(budget?.name, 2)}
          onConfirm={onDeleteIncome}
          onCancel={() => setIsDeleting(false)}
        />
      )}
      <div
        className="border rounded-2xl
    hover:shadow-md cursor-pointer h-[150px] flex flex-col justify-between"
      >
        <div className="flex gap-2 items-center justify-between px-2 md:px-3 py-[8px]">
          <div className="flex gap-2 items-center">
            <h2
              className="text-xl p-2
              bg-slate-100 rounded-full 
              "
            >
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget.totalItem
                  ? `${budget.totalItem} item(s)`
                  : "No Items Yet"}
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">
            Ksh {budget.amount}
          </h2>
        </div>
        <div className="text-xs md:text-lg flex items-center w-full justify-between border-t border-slate-400/30 px-2 md:px-3 py-[8px]">
          <h2
            className="text-red-500 cursor-pointer flex items-center gap-2 rounded-full hover:bg-red-500 hover:text-white border border-red-500 px-2"
            onClick={() => setIsDeleting(true)}
          >
            <Trash className="size-4 md:size-[20px] " /> Delete
          </h2>
          <h2
            className="text-black cursor-pointer flex items-center gap-2 rounded-full hover:bg-black border hover:text-white border-black px-2 "
            onClick={() => setIsEditing(true)}
          >
            <Pen className="size-4 md:size-[20px]" /> Edit
          </h2>
        </div>
      </div>
    </>
  );
};

export default IncomeItem;
