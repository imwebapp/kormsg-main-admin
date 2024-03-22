import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LocalStorageInterface {
  locale: string;
  setLocale: (locale: LocalStorageInterface['locale']) => void;
  accessToken: string;
  setAccessToken: (accessToken: LocalStorageInterface['accessToken']) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: LocalStorageInterface['refreshToken']) => void;
  expiresIn: number;
  setExpiresIn: (expiresIn: LocalStorageInterface['expiresIn']) => void;
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
      refreshToken: '',
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      expiresIn: 0,
      setExpiresIn: (expiresIn) => set({ expiresIn }),
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
