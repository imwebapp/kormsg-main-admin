export interface LastMessageInterface {
    id?: string;
    conversation_id?: string;
    user_id?: any;
    shop_id?: string;
    content?: string;
    images?: any;
    thumbs?: any;
    status?: boolean;
    is_call?: boolean;
    duration?: any;
    call_status?: any;
    hide_user_id?: any;
    hide_shop_id?: any;
    _10_minutes_unread?: boolean;
    _1_hour_unread?: boolean;
    _1_day_unread?: boolean;
    created_at?: Date;
    updated_at?: Date;
}