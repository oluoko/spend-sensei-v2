import { Budget, Expense, Income } from "@/utils/types";
const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewBudget = async (data: Budget) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/budgets"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create budget");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error(
      "Error in createNewBudget in @utils/api: createNewBudget: ",
      error
    );
    throw error;
  }
};

export const addNewExpense = async (data: Expense) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/expenses"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create expense");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error(
      "Error in createNewExpense in @utils/api: createNewExpense: ",
      error
    );
    throw error;
  }
};

export const addNewIncome = async (data: Income) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/incomes"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create income");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error(
      "Error in createNewIncome in @utils/api: createNewIncome: ",
      error
    );
    throw error;
  }
};

export const updateBudget = async (data: Budget) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/budgets/${data.id}`), {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update budget");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error("Error in updateBudget in @utils/api: updateBudget: ", error);
    throw error;
  }
};

export const updateExpense = async (data: Expense) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/expenses/${data.id}`), {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update expense");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error(
      "Error in updateExpense in @utils/api: updateExpense: ",
      error
    );
    throw error;
  }
};

export const updateIncome = async (data: Income) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/incomes/${data.id}`), {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update income");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error("Error in updateIncome in @utils/api: updateIncome: ", error);
    throw error;
  }
};

export const deleteBudget = async (id: string) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/budgets/${id}`), {
        method: "DELETE",
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete budget");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error("Error in deleteBudget in @utils/api: deleteBudget: ", error);
    throw error;
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/expenses/${id}`), {
        method: "DELETE",
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete expense");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error(
      "Error in deleteExpense in @utils/api: deleteExpense: ",
      error
    );
    throw error;
  }
};

export const deleteIncome = async (id: string) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/incomes/${id}`), {
        method: "DELETE",
      })
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete income");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data;
  } catch (error) {
    console.error("Error in deleteIncome in @utils/api: deleteIncome: ", error);
    throw error;
  }
};

export const getBudgets = async () => {
  try {
    const res = await fetch(
      new Request(createURL("/api/budgets"), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch budgets");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data as Budget[];
  } catch (error) {
    console.error("Error in getBudgets in @utils/api: getBudgets: ", error);
    throw error;
  }
};

export const getBudgetById = async (id: string) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/budgets/${id}`), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch budget");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data as Budget;
  } catch (error) {
    console.error(
      "Error in getBudgetById in @utils/api: getBudgetById: ",
      error
    );
    throw error;
  }
};

export const getExpensesByBudgetId = async (id: string) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/budgets/${id}/expenses`), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch expenses");
    }

    const responseData = await res.json(); // Rename to avoid shadowing
    return responseData.data as Expense[];
  } catch (error) {
    console.error(
      "Error in getExpensesByBudgetId in @utils/api: getExpensesByBudgetId: ",
      error
    );
    throw error;
  }
};
