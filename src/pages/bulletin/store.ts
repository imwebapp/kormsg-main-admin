import { create } from 'zustand';
import { BoardLinkInterface } from '../../entities';

interface BulletinStateInterface {
  boardSelected: BoardLinkInterface
  setBoardSelected: (boardSelected: BulletinStateInterface['boardSelected']) => void;
}

export const useBulletinState = create<BulletinStateInterface>()(
  (set) => ({
    boardSelected: {
      id: "HOME",
      name: "Home",
    } as BoardLinkInterface,
    setBoardSelected: (boardSelected) => set({ boardSelected }),
  })
);
