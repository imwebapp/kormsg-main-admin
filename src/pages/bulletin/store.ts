import { create } from 'zustand';
import { BoardLinkInterface } from '../../entities';

interface BulletinStateInterface {
  boardSelected: BoardLinkInterface
  setBoardSelected: (boardSelected: BulletinStateInterface['boardSelected']) => void;
  lastRefresh: number,
  setLastRefresh: (lastRefresh: BulletinStateInterface['lastRefresh']) => void;
}

export const useBulletinState = create<BulletinStateInterface>()(
  (set) => ({
    boardSelected: {
      id: "HOME",
      name: "Home",
    },
    setBoardSelected: (boardSelected) => set({ boardSelected }),
    lastRefresh: Date.now(),
    setLastRefresh: (lastRefresh) => set({ lastRefresh }),
  })
);
