import IncomeList from "@/components/IncomeList";

const Incomes = () => {
  return (
    <div className="p-2 md:p-10">
      <h2 className="font-bold text-xl md:text-3xl my-2">My Income Streams</h2>
      <IncomeList />
    </div>
  );
};

export default Incomes;
