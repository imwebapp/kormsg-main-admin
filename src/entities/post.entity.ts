export interface PostInterface {
    id?: string;
    status?: boolean;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    title?: any;
    content?: string;
    images?: Array<string>;
    thumbnails?: Array<string>;
    videos?: Array<any>;
    comment?: number;
    soft_comment_count?: number;
    like?: number;
    dislike?: number;
    report?: number;
    view?: number;
    user_id?: any;
    employee_id?: string;
    category_id?: string;
    location?: Date;
    execute_at?: Date;
    user_name?: string;
    user?: any;
}