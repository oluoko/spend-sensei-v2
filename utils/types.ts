export interface Budget {
  id: string;
  name: string;
  amount: number;
  icon?: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  budgetId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Income {
  id: string;
  name: string;
  amount: number;
  icon?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
