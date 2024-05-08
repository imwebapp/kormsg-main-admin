import { LastMessageInterface } from "./lastmessage.entity";

export interface ConversationInterface {
  id?: string;
  user_id?: string;
  shop_id?: string;
  last_message_id?: string;
  status?: boolean;
  hide_user_id?: any;
  hide_shop_id?: any;
  created_at?: Date;
  updated_at?: Date;
  report?: number;
  unread_message?: string;
  shop?: any;
  user?: any;
  last_message?: LastMessageInterface;
}
