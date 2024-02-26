import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LocalStorageInterface {
  locale: string;
  setLocale: (locale: LocalStorageInterface['locale']) => void;
  accessToken: string;
  setAccessToken: (accessToken: LocalStorageInterface['accessToken']) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: LocalStorageInterface['collapsed']) => void;
}

export const useLocalStorage = create<LocalStorageInterface>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
      accessToken: '',
      setAccessToken: (accessToken) => set({ accessToken }),
      collapsed: false,
      setCollapsed: (collapsed) => set({ collapsed }),
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
