import moment from "moment";
import { TypeUser } from "./constants";
import "moment/min/locales";

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
  current_on_event_shop: number;
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
  group_id: string | null;
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

export const checkAccountType = (account_type: string) => {
  let type = account_type;
  let CustomStyle = "";

  switch (account_type) {
    case TypeUser.ADMIN:
      type = "Admin";
      CustomStyle =
        "text-green-500 flex px-4 py-2 items-center bg-cyan50 rounded-md";
      break;
    case TypeUser.BIZ_USER:
      type = "Biz ";
      CustomStyle =
        "text-purple flex px-4 py-2 items-center bg-goldenPurple50 rounded-md";
      break;
    case TypeUser.FREE_USER:
      type = "Normal";
      CustomStyle =
        "text-orange-500 flex px-4 py-2 items-center bg-volcano50 rounded-md";
      break;
    case TypeUser.PAID_USER:
      type = "P";
      CustomStyle =
        "text-yellow-500 flex px-4 py-2 items-center bg-yellow-50 rounded-md";
      break;
    default:
      break;
  }
  return {
    type,
    CustomStyle,
  };
};

export const convertDateTime = (timestamp: Date) => {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
  const day = ("0" + dateObject.getDate()).slice(-2);

  return `${year}-${month}-${day} (${dateObject.getHours()}:${dateObject.getMinutes()})`;
};

export const convertDate = (timestamp: Date) => {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
  const day = ("0" + dateObject.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

export const handleConvertCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US").format(amount);
};

export const mathRemainingTime = (unixtimestamp: any) => {
  // return new Date(parseInt(unixtimestamp))
  return (
    (moment(new Date(parseInt(unixtimestamp)))
      .endOf("day")
      .valueOf() -
      moment().endOf("day").valueOf()) /
    (24 * 60 * 60 * 1000)
  );
};
export const ceilRemainingTime = (unixtimestamp: any) => {
  return Math.floor(
    (moment(new Date(parseInt(unixtimestamp)))
      .endOf("day")
      .valueOf() -
      moment().valueOf()) /
      (24 * 60 * 60 * 1000)
  );
};

export const generateRandomID = () => {
  // Generate a random number (e.g., between 1000 and 9999)
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  // Get the current timestamp
  const timestamp = new Date().getTime();
  // Combine timestamp and random number to create the ID
  const id = `${timestamp}${randomNum}`;
  return id;
};

export function formatTimeDiff(time: Date, locale: string) {
  const currentTime = moment();
  const timeDiff = moment(time).diff(currentTime);
  return moment.duration(timeDiff).locale(locale).humanize(true);
}

export function formatHour(time: Date, locale: string) {
  return moment(time).locale(locale).format("hh:mm A");
}

export function formatDate(time: Date, locale: string) {
  return moment(time).locale(locale).format("MMMM D, YYYY");
}

export function formatTime(time: Date) {
  return moment(time).format("YYYY-MM-DD");
}
export const formatDateTime = (timestampString: string, type: string) => {
  const timestamp = parseInt(timestampString, 10);

  if (isNaN(timestamp)) {
    return "Invalid timestamp";
  }

  // Tạo đối tượng Date từ timestamp
  const date = new Date(timestamp);

  // Lấy các thành phần của ngày giờ
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Trả về chuỗi ngày giờ định dạng
  return type === "day" ? `${year}/${month}/${day}` : `${hours}:${minutes}`;
};
