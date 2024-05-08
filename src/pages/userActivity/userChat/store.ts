import { create } from "zustand";
import { ConversationInterface } from "../../../entities";
interface UserChatStateInterface {
  conversationSelected?: ConversationInterface;
  setConversationSelected: (
    conversationSelected: UserChatStateInterface["conversationSelected"]
  ) => void;
}
export const useUserChatState = create<UserChatStateInterface>()((set) => ({
  conversationSelected: undefined,
  setConversationSelected: (conversationSelected) =>
    set({ conversationSelected }),
}));
