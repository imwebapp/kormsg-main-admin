import { UserInterface } from "./user.entity";

export interface QuestionInterface {
    id?: string;
    type?: string;
    status?: string;
    phone_number?: string;
    category?: string;
    content?: string;
    images?: Array<string>;
    thumbnails?: Array<string>;
    user_id?: string;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
    user?: UserInterface;
}