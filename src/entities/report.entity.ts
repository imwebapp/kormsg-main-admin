export interface ReportInterface {
    id?: string;
    user_id?: string;
    shop_id?: string;
    post_id?: string;
    review_id?: string;
    status?: boolean;
    is_solved?: boolean;
    message?: string;
    created_at_unix_timestamp?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}