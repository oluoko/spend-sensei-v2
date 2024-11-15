import React, { useState, useEffect } from "react";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import formatNumber from "../../../../../utils";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ += totalBudget_ + Number(element.amount);
      totalSpend_ += totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ += totalIncome_ + element.totalAmount;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    setTotalIncome(totalIncome_);

    return (
      <div>
        {budgetList.length > 0 ? (
          <div>
            <div className="p-7 border mt-4 rounded-2xl flex items-center justify-between">
              <div className="">
                <div className="flex mb-2 flex-row space-x-1 items-center">
                  <h2> Spend Sensei AI</h2>
                  <Sparkles className="text-white rounded-full size-6 p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 background-animate" />
                </div>
                <h2 className="text-sm md:text-md font-light">
                  {financialAdvice || "Loading financial advice..."}
                </h2>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-7border rounded-2xl flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-light">Total Budget</h2>
                  <h2 className="font-bld text-2xl">
                    ${formatNumber(totalBudget)}
                  </h2>
                </div>
                <PiggyBank className="size-10 p-3 rounded-full text-white bg-[#936B3C]" />
              </div>

              <div className="p-7border rounded-2xl flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-light">Total Spend</h2>
                  <h2 className="font-bld text-2xl">
                    ${formatNumber(totalSpend)}
                  </h2>
                </div>
                <ReceiptText className="size-10 p-3 rounded-full text-white bg-[#936B3C]" />
              </div>
            </div>

            <div className="p-7border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm font-light">No. of Budgets</h2>
                <h2 className="font-bld text-2xl">${budgetList.length}</h2>
              </div>
              <Wallet className="size-10 p-3 rounded-full text-white bg-[#936B3C]" />
            </div>

            <div className="p-7border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm font-light">Sum of Income Streams</h2>
                <h2 className="font-bld text-2xl">
                  ${formatNumber(totalIncome)}
                </h2>
              </div>
              <CircleDollarSign className="size-10 p-3 rounded-full text-white bg-[#936B3C]" />
            </div>
          </div>
        ) : (
          <div className="p-7 border mt-4 rounded-2xl flex items-center justify-between">
            <h2 className="text-sm font-light">No budgets found</h2>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      // const fetchFinancialAdvice = async () => {
      //   const advice = await getFinancialAdvice(
      //     totalIncome,
      //     totalBudget,
      //     totalSpend
      //   );
      //   setFinancialAdvice(advice);
      // };
      // fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);
}

export default CardInfo;
