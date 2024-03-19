export interface LoginType {
  object: {
    avatar: string;
    created_at: string;
    email: string;
    fullname: string;
    id: string;
    phone: string | number;
    status: boolean;
    type: string;
    updated_at: string;
    username: string;
  };
  token: string;
}
