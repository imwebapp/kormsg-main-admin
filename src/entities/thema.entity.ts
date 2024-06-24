export interface ThemaInterface {
    id?: string;
    status?: boolean;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
    name?: string;
    alias?: string;
    description?: string;
    start_time?: string;
    end_time?: string;
    groups?: Array<any>;
    visible_boards?: Array<any>;
    ids_shop_banner?: Array<any>;
    bonus_point?: boolean;
    review_require?: boolean;
    mentor_status?: boolean;
    is_for_adults?: boolean;
    is_post_moderation?: boolean;
    view_user_permissions?: any;
    post_user_permissions?: any;
    comment_user_permissions?: any;
    view_group_ids?: Array<any>;
    post_group_ids?: Array<any>;
    comment_group_ids?: Array<any>;
    geolocation_api_type?: string;
}