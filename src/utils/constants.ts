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
  BIZ_USER: "BIZ_USER",
  FREE_USER: "FREE_USER",
  PAID_USER: "PAID_USER",
  ADMIN: "ADMIN",
};

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

export const STORE_STATUS = {
  exposure: "exposure",
  underReview: "underReview",
  reviewRejected: "reviewRejected",
  adExpired: "adExpired",
  eventOngoing: "eventOngoing",
};
export const SORTING = {
  NONE: "NONE",
  DESC: "DESC",
  ASC: "ASC",
};
export const BOARD = {
  DISTANCE_ORDER_BOARD: "DISTANCE_ORDER_BOARD",
  DISTANCE_ORDER_BOARD_2: "DISTANCE_ORDER_BOARD_2",
  STORE_PROFILE: "STORE_PROFILE",
  PROFILE_DESIGN1: "PROFILE_DESIGN1",
  RECRUIT_BOARD: "RECRUIT_BOARD",
  RECRUIT_BOARD_2: "RECRUIT_BOARD_2",
  BULLETIN_BOARD: "BULLETIN_BOARD",
  JUMP_UP_SHOP_LIST_BOARD: "JUMP_UP_SHOP_LIST_BOARD",
  EVENT_BOARD: "EVENT_BOARD",
  SHOP_SALES_BOARD: "SHOP_SALES_BOARD",
  BLOG: "BLOG",
};

export const BOARD_TEXT = {
  [BOARD.DISTANCE_ORDER_BOARD]: "Store Design 1",
  [BOARD.DISTANCE_ORDER_BOARD_2]: "Store Design 2",
  [BOARD.STORE_PROFILE]: "Store/Profile",
  [BOARD.PROFILE_DESIGN1]: "Profile Design1",
  [BOARD.RECRUIT_BOARD]: "Job offer",
  [BOARD.RECRUIT_BOARD_2]: "Job search",
  [BOARD.BULLETIN_BOARD]: "Community",
  [BOARD.JUMP_UP_SHOP_LIST_BOARD]: "Jump up bulletin board",
  [BOARD.EVENT_BOARD]: "Event",
  [BOARD.SHOP_SALES_BOARD]: "Property for Rent",
  [BOARD.BLOG]: "Blog",
};

export const ROUTE = {
  SHOP: "/shop",
  SHOP_SECOND: "/jump-up-shop",
  EVENT: "/event",
  POST: "/post",
  BLOG: "/blog",
};

export const BOARD_ROUTE = {
  [BOARD.DISTANCE_ORDER_BOARD]: ROUTE.SHOP,
  [BOARD.DISTANCE_ORDER_BOARD_2]: ROUTE.SHOP,
  [BOARD.JUMP_UP_SHOP_LIST_BOARD]: ROUTE.SHOP_SECOND,
  [BOARD.EVENT_BOARD]: ROUTE.EVENT,
  [BOARD.BULLETIN_BOARD]: ROUTE.POST,
  [BOARD.BLOG]: ROUTE.BLOG,
};

export const MAP_TYPE = {
  NAVER: 'NAVER',
  GOOGLE: 'GOOGLE'
};
export const CATEGORY_PART1 = {
  타이: "타이",
  러시아: "러시아",
  한국: "한국",
  중국: "중국",
};

export const LIST_REGION = [
  {
    id: "서울",
    name: "서울",
    children: [
      {
        value: "해운대/센텀시티/재송",
        title: "해운대/센텀시티/재송",
      },
      {
        value: "송정/기장/정관/오시리아 관광단지",
        title: "송정/기장/정관/오시리아 관광단지",
      },
      {
        value: "광안리/수영",
        title: "광안리/수영",
      },
      {
        value: "중국",
        title: "중국",
      },
    ],
  },
  {
    id: "경기",
    name: "경기",
    children: [
      {
        value: "가평/청평/양평",
        title: "가평/청평/양평",
      },
      {
        value: "수원/화성",
        title: "수원/화성",
      },
      {
        value: "고양/파주/김포",
        title: "고양/파주/김포",
      },
      {
        value: "의정부/포천/동두천",
        title: "의정부/포천/동두천",
      },
      {
        value: "용인/동탄",
        title: "용인/동탄",
      },
      {
        value: "오산/평택",
        title: "오산/평택",
      },
      {
        value: "남양주/구리/성남/분당",
        title: "남양주/구리/성남/분당",
      },
      {
        value: "부천/광명시/시흥/안산",
        title: "부천/광명시/시흥/안산",
      },
      {
        value: "안양/의왕/군포",
        title: "안양/의왕/군포",
      },
    ],
  },
  {
    id: "인천",
    name: "인천",
    children: [
      {
        value: "송도/소래포구",
        title: "송도/소래포구",
      },
      {
        value: "인천국제공항/강화/을왕리",
        title: "인천국제공항/강화/을왕리",
      },
      {
        value: "영종도/월미도",
        title: "영종도/월미도",
      },
      {
        value: "주안/간석/인천시청",
        title: "주안/간석/인천시청",
      },
      {
        value: "청라/계양/부평",
        title: "청라/계양/부평",
      },
    ],
  },
  {
    id: "부산",
    name: "부산",
    children: [
      {
        value: "해운대/마린시티",
        title: "해운대/마린시티",
      },
      {
        value: "벡스코/센텀시티",
        title: "벡스코/센텀시티",
      },
      {
        value: "송정/기장/정관",
        title: "송정/기장/정관",
      },
      {
        value: "광안리/경성대",
        title: "광안리/경성대",
      },
      {
        value: "부산역",
        title: "부산역",
      },
      {
        value: "자갈치/남포동/영도",
        title: "자갈치/남포동/영도",
      },
      {
        value: "송도/다대포",
        title: "송도/다대포",
      },
      {
        value: "서면/연산/범일",
        title: "서면/연산/범일",
      },
      {
        value: "동래/온천/금정구",
        title: "동래/온천/금정구",
      },
      {
        value: "사상/강서/김해공항",
        title: "사상/강서/김해공항",
      },
    ],
  },
  {
    id: "제주",
    name: "제주",
    children: [
      {
        value: "해운대/마린시티",
        title: "해운대/마린시티",
      },
      {
        value: "벡스코/센텀시티",
        title: "벡스코/센텀시티",
      },
      {
        value: "송정/기장/정관",
        title: "송정/기장/정관",
      },
      {
        value: "광안리/경성대",
        title: "광안리/경성대",
      },
      {
        value: "부산역",
        title: "부산역",
      },
      {
        value: "자갈치/남포동/영도",
        title: "자갈치/남포동/영도",
      },
      {
        value: "송도/다대포",
        title: "송도/다대포",
      },
      {
        value: "서면/연산/범일",
        title: "서면/연산/범일",
      },
      {
        value: "동래/온천/금정구",
        title: "동래/온천/금정구",
      },
      {
        value: "사상/강서/김해공항",
        title: "사상/강서/김해공항",
      },
    ],
  },
  {
    id: "강원",
    name: "강원",
    children: [
      {
        value: "강릉",
        title: "강릉",
      },
      {
        value: "속초/고성",
        title: "속초/고성",
      },
      {
        value: "양양(서피비치/낙산)",
        title: "양양(서피비치/낙산)",
      },
      {
        value: "춘천/인제/철원",
        title: "춘천/인제/철원",
      },
      {
        value: "평창/정선/영월",
        title: "평창/정선/영월",
      },
      {
        value: "동해/삼척/태백",
        title: "동해/삼척/태백",
      },
      {
        value: "홍천/횡성/원주",
        title: "홍천/횡성/원주",
      },
    ],
  },
  {
    id: "경상",
    name: "경상",
    children: [
      {
        value: "대구/구미/안동/문경",
        title: "대구/구미/안동/문경",
      },
      {
        value: "경주",
        title: "경주",
      },
      {
        value: "울산/양산",
        title: "울산/양산",
      },
      {
        value: "거제/통영",
        title: "거제/통영",
      },
      {
        value: "포항/영덕/울진/청송",
        title: "포항/영덕/울진/청송",
      },
      {
        value: "창원/마산/진해/김해/부곡",
        title: "창원/마산/진해/김해/부곡",
      },
      {
        value: "남해/사천/하동/진주",
        title: "남해/사천/하동/진주",
      },
    ],
  },
  {
    id: "전라",
    name: "전라",
    children: [
      {
        value: "전주/완주",
        title: "전주/완주",
      },
      {
        value: "광주/나주/함평",
        title: "광주/나주/함평",
      },
      {
        value: "여수",
        title: "여수",
      },
      {
        value: "순천/광양/담양/보성/화순",
        title: "순천/광양/담양/보성/화순",
      },
      {
        value: "남원/부인/정읍/고창/무주/구례",
        title: "남원/부인/정읍/고창/무주/구례",
      },
      {
        value: "군산/익산",
        title: "군산/익산",
      },
      {
        value: "목포/신안/영광/진도/고흥/영암/완도/강진",
        title: "목포/신안/영광/진도/고흥/영암/완도/강진",
      },
    ],
  },
  {
    id: "충청",
    name: "충청",
    children: [
      {
        value: "대전/세종",
        title: "대전/세종",
      },
      {
        value: "천안/아산/도고",
        title: "천안/아산/도고",
      },
      {
        value: "안면도/태안/서산/덕산",
        title: "안면도/태안/서산/덕산",
      },
      {
        value: "보령/대천/부여/공주/금산",
        title: "보령/대천/부여/공주/금산",
      },
      {
        value: "청주/음성/진천",
        title: "청주/음성/진천",
      },
      {
        value: "충주/제천/단양/괴산/증평",
        title: "충주/제천/단양/괴산/증평",
      },
    ],
  },
];

