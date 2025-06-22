import { create } from 'zustand';

interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  date: string;
  description?: string;
  type: 'credit' | 'debit';
  accountNumber: string;
}

interface TransactionStore {
  balance: number;
  transactions: Transaction[];
  updateBalance: (amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'type'>) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  balance: 24155.26,
  transactions: [],
  updateBalance: (amount) => set((state) => ({ balance: state.balance - amount })),
  addTransaction: (transaction) => set((state) => {
    // Validate account number
    if (!transaction.accountNumber || transaction.accountNumber.length !== 16) {
      return state; // Don't add transaction if account number is invalid
    }

    // Create two transactions: one debit for sender and one credit for receiver
    const debitTransaction: Transaction = {
      ...transaction,
      id: `debit_${Date.now()}`,
      date: new Date().toISOString(),
      type: 'debit',
      amount: -Math.abs(transaction.amount), // Ensure negative amount for debit
    };

    const creditTransaction: Transaction = {
      ...transaction,
      id: `credit_${Date.now()}`,
      date: new Date().toISOString(),
      type: 'credit',
      amount: Math.abs(transaction.amount), // Ensure positive amount for credit
    };

    return {
      transactions: [debitTransaction, ...state.transactions],
    };
  }),
})); 









