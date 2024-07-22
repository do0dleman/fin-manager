import { create } from 'zustand'

interface AppState {
  selectedMoneyAccountId: number | undefined
  setSelectedMoneyAccountId: (accountId: number) => void
  // addBankAccout: (bankAccountData: { name: string, amount: number, userId: string }) => void
  // addTransaction: (transactionData: { amount: number, category?: string, name?: string },
  //   userId: string,
  //   bankAccountId: string
  // ) => void
}

const useAppStore = create<AppState>()((set) => ({
  selectedMoneyAccountId: undefined,
  setSelectedMoneyAccountId: (accountId) => set((state) => ({ ...state, selectedMoneyAccountId: accountId })),
  // addBankAccout: (bankAccount) => set((state) => ({ ...state })),
  // addTransaction: (transactionData, userId, bankAccountId) => {

  //   set((state) => ({ ...state }))
  // },
}))

export default useAppStore;