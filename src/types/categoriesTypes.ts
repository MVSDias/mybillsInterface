import type { TransactionsPropsType } from "./transactionsTypes";

export interface CategoryTypes {
  id: string;
  name: string;
  color: string;
  type: TransactionsPropsType;
}

export interface CategorySummary {
  
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number; 
  percentage: number; 
}
