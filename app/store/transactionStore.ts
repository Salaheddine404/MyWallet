import { create } from 'zustand';

interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  date: string;
  description?: string;
}

interface TransactionStore {
  balance: number;
  transactions: Transaction[];
  updateBalance: (amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  balance: 24155.26,
  transactions: [],
  updateBalance: (amount) => set((state) => ({ balance: state.balance - amount })),
  addTransaction: (transaction) => set((state) => ({
    transactions: [
      {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      },
      ...state.transactions,
    ],
  })),
})); 