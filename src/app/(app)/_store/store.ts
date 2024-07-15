import { create } from 'zustand'
import type BankAccount from '../_models/BankAccount';
import type Transaction from '../_models/Transaction';

interface AppState {
  bankAccounts: BankAccount[]
  addBankAccout : (bankAccount: BankAccount) => void
  addTransaction: (transaction: Transaction, bankAccountId: string) => void
}

const useAppStore = create<AppState>()((set) => ({
  bankAccounts: [],
  addBankAccout: (bankAccount) => set((state) => ({ ...state })),
  addTransaction: (transaction, bankAccountId) => {
    
    set((state) => ({ ...state }))
  },
}))

export default useAppStore;