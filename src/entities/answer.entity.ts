import { UserInterface } from "./user.entity";

export interface AnswerInterface {
    id?: string;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    content?: string;
    parent_id?: string;
    images?: any;
    thumbnails?: any;
    user_id?: string;
    question_id?: string;
    user?: UserInterface;
}