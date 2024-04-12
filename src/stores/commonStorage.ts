import { create } from 'zustand';

interface CommonStateInterface {
  loading: boolean
  setLoading: (loading: CommonStateInterface['loading']) => void;
}

export const useCommonState = create<CommonStateInterface>()(
  (set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
  })
);
