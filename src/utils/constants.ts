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
