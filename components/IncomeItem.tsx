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

const IncomeItem = ({ budget }) => {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);

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
  console.log("Budget: ", budget);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="p-5 border rounded-2xl
    hover:shadow-md cursor-pointer h-[150px]"
          >
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <h2
                  className="text-2xl p-3 px-4
              bg-slate-100 rounded-full 
              "
                >
                  {budget?.icon}
                </h2>
                <div>
                  <h2 className="font-bold">{budget.name}</h2>
                  <h2 className="text-sm text-gray-500">
                    {budget.totalItem} Item
                  </h2>
                </div>
              </div>
              <h2 className="font-bold text-primary text-lg">
                Ksh {budget.amount}
              </h2>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Income Source</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Source Name</h2>
                  <Input
                    placeholder="e.g. Youtube"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Montly Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onIncomeUpdate()}
                className="mt-5 w-full rounded-full"
              >
                Create Income Source
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeItem;
