import { create } from 'zustand';

interface CommonStateInterface {
  status: boolean
  setStatus: (status: CommonStateInterface['status']) => void;
}

export const useCommonState = create<CommonStateInterface>()(
  (set) => ({
    status: false,
    setStatus: (status) => set({ status }),
  })
);
