export const classNames = (...names: (string | undefined | null)[]): string =>
  (names || []).filter((e) => !!e && typeof e === "string").join(" ");

export function getURL(url: string) {
  if (!url.includes("http://") && !url.includes("https://")) {
    url = "https://" + url;
  }

  return url;
}
export interface BaseResponse<T = any> {
  success: boolean;
  errorCode: string;
  message: string;
  result: T;
  results: T[];
}

export interface Reservation {
  results: {
    objects: {
      count: number;
      rows: [];
    };
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  company_name: string | null;
  phone: string;
  avatar: string;
  cover_avatar: string | null;
  login_type: string;
  account_type: string;
  latitude: number;
  longitude: number;
  verified: boolean;
  show_shop_tag: boolean;
  post_limit: number;
  current_active_post: number;
  current_pending_post: number;
  current_expired_post: number;
  current_rejected_post: number;
  current_recommendation_post: number;
  event_type: string;
  post_start_date: string | null;
  post_expired_date: string;
  paid_user_expiration_date: string;
  post_period: number;
  memo: string | null;
  exp: number;
  level: number;
  ranking: number;
  group: string | null;
  groups: [string];
  depositor: string | null;
  contact: string | null;
  deposit_date: string | null;
  deposit_amount: string | null;
  exposure_bulletin_board: string | null;
  start_date: string | null;
  end_date: string | null;
  uniqueness: string | null;
  attachments: [];
  daily_ranking_delta: number;
  noti_sound: boolean;
  language: string;
  status: boolean;
  image_id_card: string | null;
  approve: boolean;
  jump_limit: number;
  created_at_unix_timestamp: number;
  notice_messenger_status: boolean;
  point: number;
  sign_in_time_unix_timestamp: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: string | null;
}
