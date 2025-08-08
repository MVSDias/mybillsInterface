import type {
  CreateTransactionDTO,
  MonthlyItemsType,
  Transaction,
  TransactionsFilter,
  TransactionsSummary,
} from "../types/transactionsTypes";
import { api } from "./api";

// AQUI FILTRO AS TRANSAÇÕES QUE O FRONTEND VAI RECEBER NO DASHBORAD.
export const getTransactions = async (
  filter?: Partial<TransactionsFilter>,
): Promise<Transaction[]> => {

  const response = await api.get<Transaction[]>("/transactions", {
    
    params: filter, 
  });

  return response.data; 
};

// AQUI CRIAO UMA TRANSAÇÃO
export const createTransactions = async (
  transactionData: CreateTransactionDTO,
): Promise<Transaction> => { 

  const response = await api.post<Transaction>(
    "/transactions",
    transactionData,
  );

  return response.data; 
};

// AQUI CRIO UMA FUNÇÃO PARA RECEBER UM RESUMO DAS TRANSAÇÕES FILTRADAS POR MES E ANO APENAS.
export const getTransactionsSummary = async (
  month: number,
  year: number,
): Promise<TransactionsSummary> => {
  const response = await api.get("/transactions/summary", {
    params: { month, year },
  });

  return response.data;
};

//AQUI CRIO UMA FUNÇÃO PRA RECEBER O HISTORICO DE TRANSAÇÕES POR MÊS.
export const getTransactionsMonthly = async (
  month: number,
  year: number,
  quantityMonths?: number,
): Promise<{ history: MonthlyItemsType[] }> => {

  const response = await api.get("/transactions/historical", {
    params: {
      month,
      year,
      quantityMonths,
    },
  });

  return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};
