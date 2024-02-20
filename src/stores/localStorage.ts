import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LocalStorageInterface {
  accessToken: string;
  setAccessToken: (accessToken: LocalStorageInterface['accessToken']) => void;
}

export const useLocalStorage = create<LocalStorageInterface>()(
  persist(
    (set) => ({
      accessToken: '',
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: 'local-storage',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => () => {
        // useLocalStorage.setState({accessToken: ''});
      },
    },
  ),
);
