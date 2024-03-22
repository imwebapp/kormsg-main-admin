import { ThemaInterface } from ".";

export interface CategoryInterface {
    id: string;
    status: boolean;
    created_at_unix_timestamp: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: object;
    name: string;
    alias: string;
    theme_color: string;
    thema_id: string;
    thema: ThemaInterface;
}