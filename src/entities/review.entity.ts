export interface ReviewInterface {
    id?: string;
    status?: boolean;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    content?: string;
    board_type?: any;
    parent_id?: any;
    parent_user_id?: any;
    private?: boolean;
    image?: any;
    thumbnail?: any;
    type?: string;
    sub_type?: string;
    last_5_comments?: Array<any>;
    report?: number;
    user_id?: string;
    shop_id?: any;
    recruit_id?: any;
    post_id?: string;
    user_name?: any;
    employee_id?: any;
    like?: number;
    dislike?: number;
    user?: any;
}