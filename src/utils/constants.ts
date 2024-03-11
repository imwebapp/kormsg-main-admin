export const Config = {
  HOST_API: process.env.REACT_APP_BASE_URL,
  SOCKET_API: process.env.REACT_APP_BASE_URL_SOCKET,
};

export enum LOCAL_STORAGE {
  TOKEN = "accessToken",
}

export const Constants = {
};

export const TypeUser = [
  {
    id: "FREE_USER",
    name: "Normal User",
  },
  {
    id: "admin",
    name: "Admin",
  },
  {
    id: "BIZ_USER",
    name: "Biz User",
  },
];

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

export const BASE_URL = 'https://server.kormsg.com/api/v1'