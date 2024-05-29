import { CategoryInterface, ThemaInterface } from ".";

export interface BoardLinkInterface {
    id?: string;
    status?: boolean;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
    index?: number;
    name?: string;
    image?: string;
    accessible_user_type?: Array<string>;
    route?: string;
    geolocation_api_type?: string;
    thema_id?: string | null;
    keywords?: object;
    thema?: ThemaInterface;
    themas?: Array<any>;
    categories?: Array<any>;
    category_ids?: Array<string> | null;
}