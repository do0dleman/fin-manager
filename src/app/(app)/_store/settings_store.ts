import { create } from 'zustand'

export type AppThemeType = "dark" | "light" | "system"

interface SettingsState {
  theme: AppThemeType
  setTheme: (theme: AppThemeType) => void
}

const useSettingsStore = create<SettingsState>()((set) => ({
  theme: "system",
  setTheme: (theme) => set((state) => ({ ...state, theme: theme })),
}))

export default useSettingsStore;