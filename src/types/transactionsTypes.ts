import type { CategorySummary, CategoryTypes } from "./categoriesTypes";

export const TransactionType = { 
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export type TransactionsPropsType = (typeof TransactionType)[keyof typeof TransactionType]; // usado apenas para tipar

export interface TransactionsFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionsPropsType;
}

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  date: string | Date;
  category: CategoryTypes;
  categoryId: string;
  type: TransactionsPropsType;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TransactionsSummary {
  totalIncomes: number; 
  totalExpenses: number; 
  balance: number; 
  expensesByCategory: CategorySummary[]; 
}

export interface MonthlyItemsType {
  name: string; 
  expenses: number;
  income: number;
}

export interface CreateTransactionDTO { 
  description: string;
  amount: number;
  date: Date | string;
  categoryId: string;
  type: TransactionsPropsType;
}
