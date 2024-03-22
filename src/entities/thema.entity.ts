export interface ThemaInterface {
    id: string;
    status: boolean;
    created_at_unix_timestamp: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: object;
    name: string;
    alias: string;
    visible_boards: Array<string>;
    ids_shop_banner: Array<string>;
    bonus_point: boolean;
    review_require: boolean;
}