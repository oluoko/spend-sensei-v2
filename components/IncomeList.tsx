import IncomeItem from "./IncomeItem";
import { prisma } from "@/utils/db";
import CreateIncome from "./CreateIncome";
import { getUserByClerkId } from "@/utils/auth";

const IncomeList = async () => {
  const user = await getUserByClerkId();

  const incomes = await prisma.income.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!incomes) console.log("No Incomes found");

  console.log("Incomes: ", incomes);

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 gap-3"
      >
        <CreateIncome />
        {incomes?.length > 0
          ? incomes.map((budget, index) => (
              <IncomeItem budget={budget} key={index} />
            ))
          : [1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse "
              ></div>
            ))}
      </div>
    </div>
  );
};

export default IncomeList;
