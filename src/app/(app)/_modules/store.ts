import { create } from 'zustand'

interface LoaderStore {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const useLoaderStore = create<LoaderStore>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading })

}))

export default useLoaderStore;