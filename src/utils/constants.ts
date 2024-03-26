import { CONVERSATION } from './../apis/urlConfig';
export const Config = {
  HOST_API: process.env.REACT_APP_BASE_URL,
  SOCKET_API: process.env.REACT_APP_BASE_URL_SOCKET,
};

export enum LOCAL_STORAGE {
  TOKEN = "accessToken",
}

export const Constants = {};

export const ListTypeUser = [
  {
    id: "FREE_USER",
    name: "Normal User",
  },
  {
    id: "PAID_USER",
    name: "P",
  },
  {
    id: "BIZ_USER",
    name: "Biz User",
  },
  {
    id: "ADMIN",
    name: "Admin",
  },
];

export const TypeUser = {
  BIZ_USER: 'BIZ_USER',
  FREE_USER: 'FREE_USER',
  PAID_USER: 'PAID_USER',
  ADMIN: 'ADMIN',
}

export const listOptionUserDetail = [
  {
    title: "Information",
    value: "information",
  },
  {
    title: "Shop information",
    value: "shopInformation",
  },
  {
    title: "History Payment",
    value: "historyPayment",
  },
];

// export const BASE_URL = "https://server.kormsg.com/api/v1"; //product
export const BASE_URL = "https://server-dev.kormsg.com/api/v1"; //dev

export const RESERVATION_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  ALL: "ALL",
};

export const INIT_TAB_USER_DETAIL = {
  INFORMATION: "information",
  SHOP_INFORMATION: "shopInformation",
  HISTORY_PAYMENT: "historyPayment",
};

export const BOARD = {
  DISTANCE_ORDER_BOARD: 'DISTANCE_ORDER_BOARD',
  DISTANCE_ORDER_BOARD_2: 'DISTANCE_ORDER_BOARD_2',
  STORE_PROFILE: 'STORE_PROFILE',
  PROFILE_DESIGN1: 'PROFILE_DESIGN1',
  RECRUIT_BOARD: 'RECRUIT_BOARD',
  RECRUIT_BOARD_2: 'RECRUIT_BOARD_2',
  BULLETIN_BOARD: 'BULLETIN_BOARD',
  JUMP_UP_SHOP_LIST_BOARD: 'JUMP_UP_SHOP_LIST_BOARD',
  EVENT_BOARD: 'EVENT_BOARD',
  SHOP_SALES_BOARD: 'SHOP_SALES_BOARD',
  BLOG: 'BLOG'
}

export const BOARD_TEXT = {
  [BOARD.DISTANCE_ORDER_BOARD]: 'Store Design 1',
  [BOARD.DISTANCE_ORDER_BOARD_2]: 'Store Design 2',
  [BOARD.STORE_PROFILE]: 'Store/Profile',
  [BOARD.PROFILE_DESIGN1]: 'Profile Design1',
  [BOARD.RECRUIT_BOARD]: 'Job offer',
  [BOARD.RECRUIT_BOARD_2]: 'Job search',
  [BOARD.BULLETIN_BOARD]: 'Community',
  [BOARD.JUMP_UP_SHOP_LIST_BOARD]: 'Jump up bulletin board',
  [BOARD.EVENT_BOARD]: 'Event',
  [BOARD.SHOP_SALES_BOARD]: 'Property for Rent',
  [BOARD.BLOG]: 'Blog'
}

export const ROUTE = {
  SHOP: '/shop',
  SHOP_SECOND: '/jump-up-shop',
  EVENT: '/event',
  POST: '/post',
  BLOG: '/blog',
}


export const BOARD_ROUTE = {
  [BOARD.DISTANCE_ORDER_BOARD]: ROUTE.SHOP,
  [BOARD.DISTANCE_ORDER_BOARD_2]: ROUTE.SHOP,
  [BOARD.JUMP_UP_SHOP_LIST_BOARD]: ROUTE.SHOP_SECOND,
  [BOARD.EVENT_BOARD]: ROUTE.EVENT,
  [BOARD.BULLETIN_BOARD]: ROUTE.POST,
  [BOARD.BLOG]: ROUTE.BLOG,
}

export const NAVBAR = {
  HOME: 'Home',
  EVENT: 'Event',
  POST: 'Post',
  CONVERSATION: 'Conversation',
  RESERVATION: 'Reservation',
  SHORT_VIDEO: 'Short video',
  PROFILE: 'Profile',
}