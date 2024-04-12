export interface BlogInterface {
    id?: string;
    title?: string;
    content?: string;
    images?: Array<string>;
    thumbnails?: Array<string>;
    tags?: Array<any>;
    created_at?: Date;
    execute_at?: Date;
    view?: number;
    status?: boolean;
    category_id?: string;
    updated_at?: Date;
    deleted_at?: any;
    category?: any;
}