import { ThemaInterface } from './thema.entity';
export interface TagThemaInterface {
    id?: string;
    status?: boolean;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: object;
    name?: string;
    thema_id?: string;
    thema?: ThemaInterface;
}