"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { createNewBudget } from "@/utils/api";
import { useRouter } from "next/navigation";

const CreateBudget = () => {
  const user = useUser();
  const router = useRouter();
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const onCreateBudget = async () => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    if (!name || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const budget = await createNewBudget({ name, amount, icon: emojiIcon });
      toast.success("Budget created successfully");
      router.push(`/budgets/${budget.id}`);
    } catch (error) {
      toast.error("Failed to create budget");
      console.error("Failed to create budget: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 my-1 md:my-2 rounded-2xl items-center flex flex-col justify-center border-2 border-dashed cursor-pointer hover:shadow-md h-[100px]">
            <h2 className="text-4xl">+</h2>
            <h2 className="text-xl font-bold">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                  <h2 className="text-black font-medium my-1">Category</h2>
                  <Input
                    placeholder="Budget Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="Budget Amount"
                    onChange={(e) =>
                      setAmount(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={(!name && !amount) || loading}
                onClick={onCreateBudget}
                className="mt-5 w-full rounded-full"
              >
                {loading ? "Creating..." : "Create Budget"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
