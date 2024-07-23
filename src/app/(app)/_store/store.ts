import { create } from 'zustand'

interface AppState {
  selectedMoneyAccountId: number | undefined
  setSelectedMoneyAccountId: (accountId: number) => void
  selectedTransactiontId: number | undefined
  setSelectedTransactionId: (transactionId: number) => void
}

const useAppStore = create<AppState>()((set) => ({
  selectedMoneyAccountId: undefined,
  setSelectedMoneyAccountId: (accountId) => set((state) => ({ ...state, selectedMoneyAccountId: accountId })),
  selectedTransactiontId: undefined,
  setSelectedTransactionId: (transactionId) => set((state) => ({ ...state, selectedTransactiontId: transactionId })),
}))

export default useAppStore;