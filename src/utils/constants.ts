import { Children } from "react";
import { CONVERSATION } from "./../apis/urlConfig";
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
    name: "Paid User",
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
export const BASE_URL_ANALYTICS = "https://ga.bamgama.com"; // analytics
export const BASE_URL_LINK_SHOP = "https://dev.kormsg.com/detail"; // link shop

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
  STORE_PROFILE: "/store_profile",
  PROFILE_DESIGN1: "/profile_design1",
};

export const QUESTION_STATUS = {
  ALL: "ALL",
  MORE: "MORE",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
};

export const QUESTION_STATUS_INFO = {
  [QUESTION_STATUS.ALL]: {
    text: "All Status",
    color: "#2BB81F",
  },
  [QUESTION_STATUS.COMPLETED]: {
    text: "Complete",
    color: "#2BB81F",
  },
  [QUESTION_STATUS.PENDING]: {
    text: "Waiting for reply",
    color: "#0078FF",
  },
  [QUESTION_STATUS.MORE]: {
    text: "Additional questions",
    color: "#FF1400",
  },
};

export const BOARD_ROUTE = {
  [BOARD.DISTANCE_ORDER_BOARD]: ROUTE.SHOP,
  [BOARD.DISTANCE_ORDER_BOARD_2]: ROUTE.SHOP,
  [BOARD.STORE_PROFILE]: ROUTE.STORE_PROFILE,
  [BOARD.PROFILE_DESIGN1]: ROUTE.PROFILE_DESIGN1,
  [BOARD.RECRUIT_BOARD]: ROUTE.SHOP,
  [BOARD.RECRUIT_BOARD_2]: ROUTE.SHOP,
  [BOARD.BULLETIN_BOARD]: ROUTE.POST,
  [BOARD.JUMP_UP_SHOP_LIST_BOARD]: ROUTE.SHOP_SECOND,
  [BOARD.EVENT_BOARD]: ROUTE.EVENT,
  [BOARD.SHOP_SALES_BOARD]: ROUTE.SHOP,
  [BOARD.BLOG]: ROUTE.BLOG,
};

export const VISIBLE_BOARDS = [
  BOARD.BULLETIN_BOARD,
  BOARD.EVENT_BOARD,
  BOARD.RECRUIT_BOARD,
  BOARD.RECRUIT_BOARD_2,
  BOARD.SHOP_SALES_BOARD,
];

export const NAVBAR = {
  HOME: "Home",
  // EVENT: "Event",
  // POST: "Post",
  CONVERSATION: "Conversation",
  RESERVATION: "Reservation",
  SHORT_VIDEO: "Short video",
  PROFILE: "Profile",
};

export const MAP_TYPE = {
  NAVER: "NAVER",
  GOOGLE: "GOOGLE",
};

export const SELECT_ALL = "__SELECT_ALL__";

export const USER_PERMISSION = {
  ALL: SELECT_ALL,
  LOGIN_USER: "LOGIN_USER",
  NON_LOGIN_USER: "NON_LOGIN_USER",
  BIZ_USER: "BIZ_USER",
  PAID_USER: "PAID_USER",
  ADMIN: "ADMIN",
};

export const USER_PERMISSION_TEXT = {
  [USER_PERMISSION.ALL]: "All users",
  [USER_PERMISSION.LOGIN_USER]: "Login user",
  [USER_PERMISSION.NON_LOGIN_USER]: "Non-logged in user",
  [USER_PERMISSION.BIZ_USER]: "Biz user",
  [USER_PERMISSION.PAID_USER]: "Paid member",
  [USER_PERMISSION.ADMIN]: "Manager",
};

export const CATEGORY_PART1 = {
  타이: "타이",
  러시아: "러시아",
  한국: "한국",
  중국: "중국",
};

export const PLATFORM = {
  APPLE: "APPLE",
  ANDROID: "ANDROID",
  BROWSER: "BROWSER",
  BROWSER_MOBILE: 'BROWSER_MOBILE',
};
export const LIST_REGION = [
  {
    id: "서울",
    name: "서울",
    children: [
      {
        value: "강남/역삼/삼성",
        title: "강남/역삼/삼성",
      },
      {
        value: "신사/청담/압구정",
        title: "신사/청담/압구정",
      },
      {
        value: "서초/교대/사당",
        title: "서초/교대/사당",
      },
      {
        value: "잠실/송파/강동",
        title: "잠실/송파/강동",
      },
      {
        value: "을지로/명동/중구/동대문",
        title: "을지로/명동/중구/동대문",
      },
      {
        value: "서울역/이태원/용산",
        title: "서울역/이태원/용산",
      },
      {
        value: "종로/인사동",
        title: "종로/인사동",
      },
      {
        value: "홍대/합정/마포/서대문",
        title: "홍대/합정/마포/서대문",
      },
      {
        value: "여의도",
        title: "여의도",
      },
      {
        value: "영등포역",
        title: "영등포역",
      },
      {
        value: "구로/신도림/금천",
        title: "구로/신도림/금천",
      },
      {
        value: "김포공항/염창/강서",
        title: "김포공항/염창/강서",
      },
      {
        value: "건대입구/성수/왕십리",
        title: "건대입구/성수/왕십리",
      },
      {
        value: "성북/강북/노원/도봉",
        title: "성북/강북/노원/도봉",
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
        value: "제주시/제주국제공항",
        title: "제주시/제주국제공항",
      },
      {
        value: "서귀포시/모슬포",
        title: "서귀포시/모슬포",
      },
      {
        value: "애월/한림/협재",
        title: "애월/한림/협재",
      },
      {
        value: "중문",
        title: "중문",
      },
      {
        value: "표선/성산",
        title: "표선/성산",
      },
      {
        value: "함덕/김녕/세화",
        title: "함덕/김녕/세화",
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
export enum REPORT {
  REPORT_LIST,
  AUTO_DELETED_LIST,
}

export const STATION = [
  {
    name: "수도권",
    stationLineList: [
      {
        name: "1호선",
        color: "#003499",
        stationSubwayList: [
          "소요산",
          "동두천",
          "보산",
          "동두천중앙",
          "지행",
          "덕정",
          "덕계",
          "양주",
          "녹양",
          "가능",
          "의정부",
          "회룡",
          "망월사",
          "도봉산",
          "도봉",
          "방학",
          "창동",
          "녹천",
          "월계",
          "광운대",
          "석계",
          "신이문",
          "외대앞",
          "회기",
          "청량리",
          "제기동",
          "신설동",
          "동묘앞",
          "동대문",
          "종로5가",
          "종로3가",
          "종각",
          "시청",
          "서울역",
          "남영",
          "용산",
          "노량진",
          "대방",
          "신길",
          "영등포",
          "신도림",
          "구로",
          "구일",
          "개봉",
          "오류동",
          "온수",
          "역곡",
          "소사",
          "부천",
          "중동",
          "송내",
          "부개",
          "부평",
          "백운",
          "동암",
          "간석",
          "주안",
          "도화",
          "제물포",
          "도원",
          "동인천",
          "인천",
          "가산디지털단지",
          "독산",
          "금천구청",
          "광명",
          "석수",
          "관악",
          "안양",
          "명학",
          "금정",
          "군포 당정",
          "의왕",
          "성균관대",
          "화서",
          "수원",
          "세류",
          "병점",
          "서동탄",
          "세마",
          "오산대",
          "오산",
          "진위",
          "송탄",
          "서정리",
          "평택지제",
          "평택",
          "성환",
          "직산",
          "두정",
          "천안",
          "봉명",
          "쌍용(나사렛대)",
          "아산",
          "배방",
          "온양온천",
          "신창",
        ],
      },
      {
        name: "2호선",
        color: "#37B42D",
        stationSubwayList: [
          "시청",
          "충정로",
          "아현",
          "이대",
          "신촌",
          "홍대입구",
          "합정",
          "당산",
          "영등포구청",
          "문래",
          "신도림",
          "대림",
          "구로디지털단지",
          "신대방",
          "신림",
          "봉천",
          "서울대입구",
          "낙성대",
          "사당",
          "방배",
          "서초",
          "교대",
          "강남",
          "역삼",
          "선릉",
          "삼성",
          "종합운동장",
          "잠실새내",
          "잠실",
          "잠실나루",
          "강변",
          "구의",
          "건대입구",
          "성수",
          "뚝섬",
          "한양대 왕십리",
          "상왕십리",
          "신당",
          "동대문역사문화공원",
          "을지로4가",
          "을지로3가",
          "을지로입구",
          "도림천",
          "양천구청",
          "신정네거리",
          "까치산",
          "용답",
          "신답",
          "용두",
          "신설동",
        ],
      },
      {
        name: "3호선",
        color: "#FA5F2C",
        stationSubwayList: [
          "대화",
          "주엽",
          "정발산",
          "마두",
          "백석",
          "대곡",
          "화정",
          "원당",
          "원흥",
          "삼송",
          "지축",
          "구파발",
          "연신내",
          "불광",
          "녹번",
          "홍제",
          "무악재",
          "독립문",
          "경복궁",
          "안국",
          "종로3가",
          "을지로3가",
          "충무로",
          "약수",
          "금호",
          "옥수",
          "압구정",
          "신사",
          "잠원",
          "고속터미널",
          "교대",
          "남부터미널",
          "양재",
          "매봉",
          "도곡",
          "대치 학여울",
          "대청",
          "일원",
          "수서",
          "가락시장",
          "경찰병원",
        ],
      },
      {
        name: "4호선",
        color: "#3171D3",
        stationSubwayList: [
          "당고개",
          "상계",
          "노원",
          "창동",
          "쌍문",
          "수유",
          "미아",
          "미아사거리",
          "길음",
          "성신여대입구",
          "한성대입구",
          "혜화",
          "동대문",
          "동대문역사문화공원",
          "충무로",
          "명동",
          "회현",
          "서울역",
          "숙대입구",
          "삼각지",
          "신용산",
          "이촌",
          "동작",
          "총신대입구(이수)",
          "사당",
          "남태령",
          "선바위",
          "경마공원",
          "대공원",
          "과천",
          "정부과천청사",
          "인덕원",
          "평촌",
          "범계",
          "금정",
          "산본 수리산",
          "대야미",
          "반월",
          "상록수",
          "한대앞",
          "중앙",
          "고잔",
          "초지",
          "안산",
          "신길온천",
          "정왕",
          "오이도",
        ],
      },
      {
        name: "5호선",
        color: "#8E43B8",
        stationSubwayList: [
          "방화",
          "개화산",
          "김포공항",
          "송정",
          "마곡",
          "발산",
          "우장산",
          "화곡",
          "신정",
          "목동",
          "오목교",
          "양평",
          "영등포구청",
          "영등포시장",
          "신길",
          "여의도",
          "여의나루",
          "마포",
          "공덕",
          "애오개",
          "충정로",
          "서대문",
          "광화문",
          "종로3가",
          "을지로4가",
          "동대문역사문화공원",
          "청구",
          "신금호",
          "행당",
          "왕십리",
          "마장",
          "답십리",
          "장한평",
          "군자",
          "아차산",
          "광나루 천호",
          "강동",
          "둔촌동",
          "올림픽공원",
          "방이",
          "오금",
          "개롱",
          "거여",
          "마천",
          "길동",
          "굽은다리",
          "명일",
          "고덕",
          "상일동",
          "강일",
          "미사",
          "하남풍산",
          "하남시청",
          "하남검단산",
        ],
      },
      {
        name: "6호선",
        color: "#9B4F10",
        stationSubwayList: [
          "응암",
          "역촌",
          "불광",
          "독바위",
          "연신내",
          "구산",
          "새절",
          "증산",
          "디지털미디어시티",
          "월드컵경기장",
          "마포구청",
          "망원",
          "합정",
          "상수",
          "광흥창",
          "대흥",
          "공덕",
          "효창공원앞",
          "삼각지",
          "녹사평",
          "이태원",
          "한강진",
          "버티고개",
          "약수",
          "청구",
          "신당",
          "동묘앞",
          "창신",
          "보문",
          "안암",
          "고려대",
          "월곡",
          "상월곡",
          "돌곶이",
          "석계",
          "태릉입구 화랑대",
          "봉화산",
          "신내",
        ],
      },
      {
        name: "7호선",
        color: "#606D00",
        stationSubwayList: [
          "장암",
          "도봉산",
          "수락산",
          "마들",
          "노원",
          "중계",
          "하계",
          "공릉",
          "태릉입구",
          "먹골",
          "중화",
          "상봉",
          "면목",
          "사가정",
          "용마산",
          "중곡",
          "군자",
          "어린이대공원",
          "건대입구",
          "뚝섬유원지",
          "청담",
          "강남구청",
          "학동",
          "논현",
          "반포",
          "고속터미널",
          "내방",
          "총신대입구(이수)",
          "남성",
          "숭실대입구",
          "상도",
          "장승배기",
          "신대방삼거리",
          "보라매",
          "신풍",
          "대림 남구로",
          "가산디지털단지",
          "철산",
          "광명사거리",
          "천왕",
          "온수",
          "까치울",
          "부천종합운동장",
          "춘의",
          "신중동",
          "부천시청",
          "상동",
          "삼산체육관",
          "굴포천",
          "부평구청",
          "산곡",
          "석남",
        ],
      },
      {
        name: "8호선",
        color: "#E71E6E",
        stationSubwayList: [
          "암사",
          "천호",
          "강동구청",
          "몽촌토성",
          "잠실",
          "석촌",
          "송파",
          "가락시장",
          "문정",
          "장지",
          "복정",
          "산성",
          "남한산성입구",
          "단대오거리",
          "신흥",
          "수진",
          "모란",
        ],
      },
      {
        name: "9호선",
        color: "#BF9F1E",
        stationSubwayList: [
          "개화",
          "김포공항",
          "공항시장",
          "신방화",
          "마곡나루",
          "양천향교",
          "가양",
          "증미",
          "등촌",
          "염창",
          "신목동",
          "선유도",
          "당산",
          "국회의사당",
          "여의도",
          "샛강",
          "노량진",
          "노들",
          "흑석",
          "동작",
          "구반포",
          "신반포",
          "고속터미널",
          "사평",
          "신논현",
          "언주",
          "선정릉",
          "삼성중앙",
          "봉은사",
          "종합운동장",
          "삼전",
          "석촌고분",
          "석촌",
          "송파나루",
          "한성백제",
          "올림픽공원 둔촌오륜",
          "중앙보훈병원",
        ],
      },
      {
        name: "인천1호선",
        color: "#2673F2",
        stationSubwayList: [
          "계양",
          "귤현",
          "박촌",
          "임학",
          "게산",
          "경인교대입구",
          "작전",
          "갈산",
          "부평구청",
          "부평시장",
          "부평",
          "동수",
          "부평삼거리",
          "간석오거리",
          "인천시청",
          "예술회관",
          "인천터미널",
          "문학경기장",
          "선학",
          "신연수",
          "원인재",
          "동춘",
          "동막",
          "캠퍼스타운",
          "테크노파크",
          "지식정보단지",
          "인천대입구",
          "센트럴파크",
          "국제업무지구",
          "송도달빛축제공원",
        ],
      },
      {
        name: "인천2호선",
        color: "#FFB951",
        stationSubwayList: [
          "검단오류",
          "왕길",
          "검단사거리",
          "마전",
          "완정",
          "독정",
          "검암",
          "검바위",
          "아시아드경기장",
          "서구청",
          "가정",
          "가정중앙시장",
          "석남",
          "서부여성회관",
          "인천가좌",
          "가재울",
          "주안국가산단",
          "주안",
          "시민공원",
          "석바위시장",
          "인천시청",
          "석천사거리",
          "모래내시장",
          "만수",
          "남동구청",
          "인천대공원",
          "운연",
        ],
      },
      {
        name: "신분당",
        color: "#A9022D",
        stationSubwayList: [
          "강남",
          "양재",
          "양재시민의숲",
          "청계산입구",
          "판교",
          "정자",
          "미금",
          "동천",
          "수지구청",
          "성복",
          "상현",
          "광교중앙",
          "광교",
        ],
      },
      {
        name: "경의중앙선",
        color: "#7EC4A5",
        stationSubwayList: [
          "임진강",
          "문산",
          "파주",
          "월롱",
          "금촌",
          "금릉",
          "운정",
          "야당",
          "탄현",
          "일산",
          "풍산",
          "백마",
          "곡산",
          "대곡",
          "능곡",
          "행신",
          "강매",
          "화전",
          "수색",
          "디지털미디어시티",
          "가좌",
          "신촌",
          "서울역",
          "홍대입구",
          "서강대",
          "공덕",
          "효창공원앞",
          "용산",
          "이촌",
          "서빙고",
          "한남",
          "옥수",
          "응봉",
          "왕십리",
          "청량리",
          "상봉 망우",
          "양원",
          "구리",
          "도농",
          "양정",
          "덕소",
          "도심",
          "팔당",
          "운길산",
          "양수",
          "신원",
          "국수",
          "아신",
          "오빈",
          "양평",
          "원덕",
          "용문",
          "지평",
        ],
      },
      {
        name: "경춘선",
        color: "#2BAB82",
        stationSubwayList: [
          "춘천",
          "남춘천",
          "김유정",
          "강촌",
          "백양리",
          "굴봉산",
          "가평",
          "상천",
          "청평",
          "대성리",
          "마석",
          "천마산",
          "평내호평",
          "금곡",
          "사릉",
          "퇴계원",
          "별내",
          "갈매",
          "신내",
          "망우",
          "상봉",
          "광운대",
          "중랑",
          "회기",
          "청량리",
        ],
      },
      {
        name: "수인분당",
        color: "#EDB41C",
        stationSubwayList: [
          "청량리",
          "왕십리",
          "서울숲",
          "압구정로데오",
          "강남구청",
          "선정릉",
          "선릉",
          "한티",
          "도곡",
          "구룡",
          "개포동",
          "대모산입구",
          "수서",
          "복정",
          "가천대",
          "태평",
          "야탑",
          "이매",
          "서현",
          "수내",
          "정자",
          "미금",
          "오리",
          "죽전",
          "보정",
          "구성",
          "신갈",
          "기흥",
          "상갈",
          "청명",
          "영통",
          "망포",
          "매탄권선",
          "수원시청",
          "매교",
          "수원 고색",
          "오목천",
          "어천",
          "야목",
          "사리",
          "한대앞",
          "중앙",
          "고잔",
          "초지",
          "안산",
          "신길온천",
          "정왕",
          "오이도",
          "달월",
          "월곶",
          "소래포구",
          "인천논현",
          "호구포",
          "남동인더스파크",
          "원인재",
          "연수",
          "송도",
          "인하대",
          "숭의",
          "신포",
          "인천",
        ],
      },
      {
        name: "공항",
        color: "#70B7E5",
        stationSubwayList: [
          "인천공항2터미널",
          "인천공항1터미널",
          "공항화물청사",
          "운서",
          "영종",
          "청라국제도시",
          "검암",
          "계양",
          "김포공항",
          "마곡나루",
          "디지털미디어시티",
          "홍대입구",
          "공덕",
          "서울역",
        ],
      },
      {
        name: "의정부",
        color: "#FF8E00",
        stationSubwayList: [
          "발곡",
          "회룡",
          "범골",
          "경전철의정부",
          "의정부시청",
          "흥선",
          "의정부중앙",
          "동오",
          "새말",
          "경기도청북부청사",
          "효자",
          "곤제",
          "어룡",
          "송산",
          "탑석",
        ],
      },
      {
        name: "에버라인",
        color: "#80CF7A",
        stationSubwayList: [
          "전대.에버랜드",
          "둔전",
          "보평",
          "고진",
          "운동장.송담대",
          "김량장",
          "명지대",
          "시청.용인대",
          "삼가",
          "초당",
          "동백",
          "어정",
          "지석",
          "강남대",
          "기흥",
        ],
      },
      {
        name: "자기부상",
        color: "#FF9D5A",
        stationSubwayList: [
          "인천공항1터미널",
          "장기주차장",
          "합동청사",
          "파라다이스시티",
          "워터파크",
          "용유",
        ],
      },
      {
        name: "경강선",
        color: "#2774F2",
        stationSubwayList: [
          "판교",
          "이매",
          "삼동",
          "경기광주",
          "초월",
          "곤지암",
          "신둔도에촌",
          "이천",
          "부발",
          "세종대왕릉",
          "여주",
        ],
      },
      {
        name: "우이신설",
        color: "#C6C100",
        stationSubwayList: [
          "북한산우이",
          "솔밭공원",
          "4.19민주묘지",
          "가오리",
          "화계",
          "삼양",
          "삼양사거리",
          "솔샘",
          "북한산보국문",
          "정릉",
          "성신여대입구",
          "보문",
          "신설동",
        ],
      },
      {
        name: "서해선",
        color: "#8EC643",
        stationSubwayList: [
          "원시",
          "시우",
          "초지",
          "선부",
          "달미",
          "시흥능곡",
          "시흥시청",
          "신현",
          "신천",
          "시흥대야",
          "소새울",
          "소사",
        ],
      },
      {
        name: "김포골드",
        color: "#97720C",
        stationSubwayList: [
          "양촌",
          "구래",
          "마산",
          "장기",
          "운양",
          "걸포북변",
          "사우(김포시청)",
          "풍무",
          "고촌",
          "김포공항",
        ],
      },
    ],
  },
  {
    name: "부산",
    stationLineList: [
      {
        name: "1호선",
        color: "#f86c3e",
        stationSubwayList: [
          "다대포해수욕장",
          "다대포항",
          "낫개",
          "신장림",
          "장림",
          "동매",
          "신평",
          "하단",
          "당리",
          "사하",
          "괴정",
          "대티",
          "서대신",
          "동대신",
          "토성",
          "자갈치",
          "남포",
          "중앙",
          "부산역",
          "초량",
          "부산진",
          "좌천",
          "범일",
          "범내골",
          "서면",
          "부전",
          "양정",
          "시청",
          "연산",
          "교대",
          "동래",
          "명륜",
          "온천장",
          "부산대",
          "장전",
          "남산 범어사",
          "노포",
        ],
      },
      {
        name: "2호선",
        color: "#37b42d",
        stationSubwayList: [
          "장산",
          "중동",
          "해운대",
          "동백",
          "벡스코",
          "센텀시티",
          "민락",
          "수영",
          "광안",
          "금련산",
          "남천",
          "경성대부경대",
          "대연",
          "못골",
          "지게골",
          "문현",
          "국제금융센터.부산은행",
          "전포",
          "서면",
          "부암",
          "가야",
          "동의대",
          "개금",
          "냉정",
          "주례",
          "감전",
          "사상",
          "덕포",
          "모덕",
          "모라",
          "구남",
          "구명",
          "덕천",
          "수정",
          "화명율리",
          "동원 금곡",
          "호포",
          "증산",
          "부산대양산캠퍼스",
          "남양산",
          "양산",
          "수영",
        ],
      },
      {
        name: "3호선",
        color: "#d7ac65",
        stationSubwayList: [
          "망미",
          "배산",
          "물만골",
          "연산",
          "거제",
          "종합운동장",
          "사직",
          "미남",
          "만덕",
          "남산정",
          "숙등",
          "구포",
          "강서구청",
          "체육공원",
          "대저",
        ],
      },
      {
        name: "4호선",
        color: "#286fdb",
        stationSubwayList: [
          "미남",
          "동래",
          "수안",
          "낙민",
          "충렬사",
          "명장",
          "서동",
          "금사",
          "반여농산물시장",
          "석대",
          "영산대",
          "윗반송",
          "고촌",
          "안평",
        ],
      },
      {
        name: "부산김해선",
        color: "#b251ce",
        stationSubwayList: [
          "사상",
          "괘법르네시떼",
          "서부산유통지구",
          "공항",
          "덕두",
          "등구",
          "대저",
          "평강",
          "대사",
          "불암",
          "지내",
          "김해대학",
          "인제대",
          "김해시청",
          "부원",
          "봉황",
          "수로왕릉",
          "박물관",
          "연지공원",
          "장신대",
          "가야대",
        ],
      },
      {
        name: "동해선",
        color: "#80a8d8",
        stationSubwayList: [
          "부전(동해선)",
          "거제해맞이",
          "거제",
          "교대",
          "동래(동해선)",
          "안락",
          "부산원동",
          "재송",
          "센텀",
          "벡스코",
          "신해운대",
          "송정",
          "오시리아",
          "기장",
          "일광",
        ],
      },
    ],
  },
  {
    name: "대구",
    stationLineList: [
      {
        name: "1호선",
        color: "#f86c3e",
        stationSubwayList: [
          "설화명곡",
          "화원",
          "대곡",
          "진천",
          "월배",
          "상인",
          "월촌",
          "송현",
          "서부정류장",
          "대명",
          "안지랑",
          "현충로",
          "영대병원",
          "교대",
          "명덕",
          "반월당",
          "중앙로",
          "대구역",
          "칠성시장",
          "신천",
          "동대구역",
          "동구청",
          "아양교",
          "동촌",
          "해안",
          "방촌",
          "용계",
          "율하",
          "신기",
          "반야월",
          "각산",
          "안심",
        ],
      },
      {
        name: "2호선",
        color: "#37b42d",
        stationSubwayList: [
          "설화명곡",
          "화원",
          "대곡",
          "진천",
          "월배",
          "상인",
          "월촌",
          "송현",
          "서부정류장",
          "대명",
          "안지랑",
          "현충로",
          "영대병원",
          "교대",
          "명덕",
          "반월당",
          "중앙로",
          "대구역",
          "칠성시장",
          "신천",
          "동대구역",
          "동구청",
          "아양교",
          "동촌",
          "해안",
          "방촌",
          "용계",
          "율하",
          "신기",
          "반야월",
          "각산",
          "안심",
        ],
      },
      {
        name: "3호선",
        color: "#fec057",
        stationSubwayList: [
          "칠곡경대병원",
          "학정",
          "팔거",
          "동천",
          "칠곡운암",
          "구암",
          "태전",
          "매천",
          "매천시장",
          "팔달",
          "공당",
          "만평",
          "팔달시장",
          "원대",
          "북구청",
          "달성공원",
          "청라언덕",
          "남산",
          "명덕",
          "건들바위",
          "대봉교",
          "수성시장",
          "수성구민운동장",
          "어린이회관",
          "황금",
          "수성못",
          "지산",
          "범물",
          "용지",
        ],
      },
    ],
  },
  {
    name: "대전",
    stationLineList: [
      {
        name: "1호선",
        color: "#37b42d",
        stationSubwayList: [
          "반석",
          "지족",
          "노은",
          "월드컵경기장",
          "현충원",
          "구암",
          "유성온천",
          "갑천",
          "월평",
          "갈마",
          "정부청사",
          "시청",
          "탄방",
          "용문",
          "오룡",
          "서대전네거리",
          "중구청",
          "중앙로",
          "대전역",
          "대동",
          "신흥",
          "판암",
        ],
      },
    ],
  },
  {
    name: "광주",
    stationLineList: [
      {
        name: "1호선",
        color: "#37b42d",
        stationSubwayList: [
          "평동",
          "도산",
          "광주송정",
          "송정공원",
          "공항",
          "김대중컨벤션센터",
          "상무",
          "운천",
          "쌍촌",
          "화정",
          "농성",
          "돌고개",
          "양동시장",
          "금남로5가",
          "금남로4가",
          "문화전당",
          "남광주",
          "학동.중심사입구",
          "소태",
          "농동",
        ],
      },
    ],
  },
];
export const ListCountries = [
  {
    "name": "Afghanistan",
    "flag": "🇦🇫",
    "code": "AF",
    "dial_code": "+93"
  },
  {
    "name": "Åland Islands",
    "flag": "🇦🇽",
    "code": "AX",
    "dial_code": "+358"
  },
  {
    "name": "Albania",
    "flag": "🇦🇱",
    "code": "AL",
    "dial_code": "+355"
  },
  {
    "name": "Algeria",
    "flag": "🇩🇿",
    "code": "DZ",
    "dial_code": "+213"
  },
  {
    "name": "American Samoa",
    "flag": "🇦🇸",
    "code": "AS",
    "dial_code": "+1684"
  },
  {
    "name": "Andorra",
    "flag": "🇦🇩",
    "code": "AD",
    "dial_code": "+376"
  },
  {
    "name": "Angola",
    "flag": "🇦🇴",
    "code": "AO",
    "dial_code": "+244"
  },
  {
    "name": "Anguilla",
    "flag": "🇦🇮",
    "code": "AI",
    "dial_code": "+1264"
  },
  {
    "name": "Antarctica",
    "flag": "🇦🇶",
    "code": "AQ",
    "dial_code": "+672"
  },
  {
    "name": "Antigua and Barbuda",
    "flag": "🇦🇬",
    "code": "AG",
    "dial_code": "+1268"
  },
  {
    "name": "Argentina",
    "flag": "🇦🇷",
    "code": "AR",
    "dial_code": "+54"
  },
  {
    "name": "Armenia",
    "flag": "🇦🇲",
    "code": "AM",
    "dial_code": "+374"
  },
  {
    "name": "Aruba",
    "flag": "🇦🇼",
    "code": "AW",
    "dial_code": "+297"
  },
  {
    "name": "Australia",
    "flag": "🇦🇺",
    "code": "AU",
    "dial_code": "+61"
  },
  {
    "name": "Austria",
    "flag": "🇦🇹",
    "code": "AT",
    "dial_code": "+43"
  },
  {
    "name": "Azerbaijan",
    "flag": "🇦🇿",
    "code": "AZ",
    "dial_code": "+994"
  },
  {
    "name": "Bahamas",
    "flag": "🇧🇸",
    "code": "BS",
    "dial_code": "+1242"
  },
  {
    "name": "Bahrain",
    "flag": "🇧🇭",
    "code": "BH",
    "dial_code": "+973"
  },
  {
    "name": "Bangladesh",
    "flag": "🇧🇩",
    "code": "BD",
    "dial_code": "+880"
  },
  {
    "name": "Barbados",
    "flag": "🇧🇧",
    "code": "BB",
    "dial_code": "+1246"
  },
  {
    "name": "Belarus",
    "flag": "🇧🇾",
    "code": "BY",
    "dial_code": "+375"
  },
  {
    "name": "Belgium",
    "flag": "🇧🇪",
    "code": "BE",
    "dial_code": "+32"
  },
  {
    "name": "Belize",
    "flag": "🇧🇿",
    "code": "BZ",
    "dial_code": "+501"
  },
  {
    "name": "Benin",
    "flag": "🇧🇯",
    "code": "BJ",
    "dial_code": "+229"
  },
  {
    "name": "Bermuda",
    "flag": "🇧🇲",
    "code": "BM",
    "dial_code": "+1441"
  },
  {
    "name": "Bhutan",
    "flag": "🇧🇹",
    "code": "BT",
    "dial_code": "+975"
  },
  {
    "name": "Bolivia, Plurinational State of bolivia",
    "flag": "🇧🇴",
    "code": "BO",
    "dial_code": "+591"
  },
  {
    "name": "Bosnia and Herzegovina",
    "flag": "🇧🇦",
    "code": "BA",
    "dial_code": "+387"
  },
  {
    "name": "Botswana",
    "flag": "🇧🇼",
    "code": "BW",
    "dial_code": "+267"
  },
  {
    "name": "Bouvet Island",
    "flag": "🇧🇻",
    "code": "BV",
    "dial_code": "+47"
  },
  {
    "name": "Brazil",
    "flag": "🇧🇷",
    "code": "BR",
    "dial_code": "+55"
  },
  {
    "name": "British Indian Ocean Territory",
    "flag": "🇮🇴",
    "code": "IO",
    "dial_code": "+246"
  },
  {
    "name": "Brunei Darussalam",
    "flag": "🇧🇳",
    "code": "BN",
    "dial_code": "+673"
  },
  {
    "name": "Bulgaria",
    "flag": "🇧🇬",
    "code": "BG",
    "dial_code": "+359"
  },
  {
    "name": "Burkina Faso",
    "flag": "🇧🇫",
    "code": "BF",
    "dial_code": "+226"
  },
  {
    "name": "Burundi",
    "flag": "🇧🇮",
    "code": "BI",
    "dial_code": "+257"
  },
  {
    "name": "Cambodia",
    "flag": "🇰🇭",
    "code": "KH",
    "dial_code": "+855"
  },
  {
    "name": "Cameroon",
    "flag": "🇨🇲",
    "code": "CM",
    "dial_code": "+237"
  },
  {
    "name": "Canada",
    "flag": "🇨🇦",
    "code": "CA",
    "dial_code": "+1"
  },
  {
    "name": "Cape Verde",
    "flag": "🇨🇻",
    "code": "CV",
    "dial_code": "+238"
  },
  {
    "name": "Cayman Islands",
    "flag": "🇰🇾",
    "code": "KY",
    "dial_code": "+345"
  },
  {
    "name": "Central African Republic",
    "flag": "🇨🇫",
    "code": "CF",
    "dial_code": "+236"
  },
  {
    "name": "Chad",
    "flag": "🇹🇩",
    "code": "TD",
    "dial_code": "+235"
  },
  {
    "name": "Chile",
    "flag": "🇨🇱",
    "code": "CL",
    "dial_code": "+56"
  },
  {
    "name": "China",
    "flag": "🇨🇳",
    "code": "CN",
    "dial_code": "+86"
  },
  {
    "name": "Christmas Island",
    "flag": "🇨🇽",
    "code": "CX",
    "dial_code": "+61"
  },
  {
    "name": "Cocos (Keeling) Islands",
    "flag": "🇨🇨",
    "code": "CC",
    "dial_code": "+61"
  },
  {
    "name": "Colombia",
    "flag": "🇨🇴",
    "code": "CO",
    "dial_code": "+57"
  },
  {
    "name": "Comoros",
    "flag": "🇰🇲",
    "code": "KM",
    "dial_code": "+269"
  },
  {
    "name": "Congo",
    "flag": "🇨🇬",
    "code": "CG",
    "dial_code": "+242"
  },
  {
    "name": "Congo, The Democratic Republic of the Congo",
    "flag": "🇨🇩",
    "code": "CD",
    "dial_code": "+243"
  },
  {
    "name": "Cook Islands",
    "flag": "🇨🇰",
    "code": "CK",
    "dial_code": "+682"
  },
  {
    "name": "Costa Rica",
    "flag": "🇨🇷",
    "code": "CR",
    "dial_code": "+506"
  },
  {
    "name": "Cote d'Ivoire",
    "flag": "🇨🇮",
    "code": "CI",
    "dial_code": "+225"
  },
  {
    "name": "Croatia",
    "flag": "🇭🇷",
    "code": "HR",
    "dial_code": "+385"
  },
  {
    "name": "Cuba",
    "flag": "🇨🇺",
    "code": "CU",
    "dial_code": "+53"
  },
  {
    "name": "Cyprus",
    "flag": "🇨🇾",
    "code": "CY",
    "dial_code": "+357"
  },
  {
    "name": "Czech Republic",
    "flag": "🇨🇿",
    "code": "CZ",
    "dial_code": "+420"
  },
  {
    "name": "Denmark",
    "flag": "🇩🇰",
    "code": "DK",
    "dial_code": "+45"
  },
  {
    "name": "Djibouti",
    "flag": "🇩🇯",
    "code": "DJ",
    "dial_code": "+253"
  },
  {
    "name": "Dominica",
    "flag": "🇩🇲",
    "code": "DM",
    "dial_code": "+1767"
  },
  {
    "name": "Dominican Republic",
    "flag": "🇩🇴",
    "code": "DO",
    "dial_code": "+1849"
  },
  {
    "name": "Ecuador",
    "flag": "🇪🇨",
    "code": "EC",
    "dial_code": "+593"
  },
  {
    "name": "Egypt",
    "flag": "🇪🇬",
    "code": "EG",
    "dial_code": "+20"
  },
  {
    "name": "El Salvador",
    "flag": "🇸🇻",
    "code": "SV",
    "dial_code": "+503"
  },
  {
    "name": "Equatorial Guinea",
    "flag": "🇬🇶",
    "code": "GQ",
    "dial_code": "+240"
  },
  {
    "name": "Eritrea",
    "flag": "🇪🇷",
    "code": "ER",
    "dial_code": "+291"
  },
  {
    "name": "Estonia",
    "flag": "🇪🇪",
    "code": "EE",
    "dial_code": "+372"
  },
  {
    "name": "Ethiopia",
    "flag": "🇪🇹",
    "code": "ET",
    "dial_code": "+251"
  },
  {
    "name": "Falkland Islands (Malvinas)",
    "flag": "🇫🇰",
    "code": "FK",
    "dial_code": "+500"
  },
  {
    "name": "Faroe Islands",
    "flag": "🇫🇴",
    "code": "FO",
    "dial_code": "+298"
  },
  {
    "name": "Fiji",
    "flag": "🇫🇯",
    "code": "FJ",
    "dial_code": "+679"
  },
  {
    "name": "Finland",
    "flag": "🇫🇮",
    "code": "FI",
    "dial_code": "+358"
  },
  {
    "name": "France",
    "flag": "🇫🇷",
    "code": "FR",
    "dial_code": "+33"
  },
  {
    "name": "French Guiana",
    "flag": "🇬🇫",
    "code": "GF",
    "dial_code": "+594"
  },
  {
    "name": "French Polynesia",
    "flag": "🇵🇫",
    "code": "PF",
    "dial_code": "+689"
  },
  {
    "name": "French Southern Territories",
    "flag": "🇹🇫",
    "code": "TF",
    "dial_code": "+262"
  },
  {
    "name": "Gabon",
    "flag": "🇬🇦",
    "code": "GA",
    "dial_code": "+241"
  },
  {
    "name": "Gambia",
    "flag": "🇬🇲",
    "code": "GM",
    "dial_code": "+220"
  },
  {
    "name": "Georgia",
    "flag": "🇬🇪",
    "code": "GE",
    "dial_code": "+995"
  },
  {
    "name": "Germany",
    "flag": "🇩🇪",
    "code": "DE",
    "dial_code": "+49"
  },
  {
    "name": "Ghana",
    "flag": "🇬🇭",
    "code": "GH",
    "dial_code": "+233"
  },
  {
    "name": "Gibraltar",
    "flag": "🇬🇮",
    "code": "GI",
    "dial_code": "+350"
  },
  {
    "name": "Greece",
    "flag": "🇬🇷",
    "code": "GR",
    "dial_code": "+30"
  },
  {
    "name": "Greenland",
    "flag": "🇬🇱",
    "code": "GL",
    "dial_code": "+299"
  },
  {
    "name": "Grenada",
    "flag": "🇬🇩",
    "code": "GD",
    "dial_code": "+1473"
  },
  {
    "name": "Guadeloupe",
    "flag": "🇬🇵",
    "code": "GP",
    "dial_code": "+590"
  },
  {
    "name": "Guam",
    "flag": "🇬🇺",
    "code": "GU",
    "dial_code": "+1671"
  },
  {
    "name": "Guatemala",
    "flag": "🇬🇹",
    "code": "GT",
    "dial_code": "+502"
  },
  {
    "name": "Guernsey",
    "flag": "🇬🇬",
    "code": "GG",
    "dial_code": "+44"
  },
  {
    "name": "Guinea",
    "flag": "🇬🇳",
    "code": "GN",
    "dial_code": "+224"
  },
  {
    "name": "Guinea-Bissau",
    "flag": "🇬🇼",
    "code": "GW",
    "dial_code": "+245"
  },
  {
    "name": "Guyana",
    "flag": "🇬🇾",
    "code": "GY",
    "dial_code": "+592"
  },
  {
    "name": "Haiti",
    "flag": "🇭🇹",
    "code": "HT",
    "dial_code": "+509"
  },
  {
    "name": "Heard Island and Mcdonald Islands",
    "flag": "🇭🇲",
    "code": "HM",
    "dial_code": "+672"
  },
  {
    "name": "Holy See (Vatican City State)",
    "flag": "🇻🇦",
    "code": "VA",
    "dial_code": "+379"
  },
  {
    "name": "Honduras",
    "flag": "🇭🇳",
    "code": "HN",
    "dial_code": "+504"
  },
  {
    "name": "Hong Kong",
    "flag": "🇭🇰",
    "code": "HK",
    "dial_code": "+852"
  },
  {
    "name": "Hungary",
    "flag": "🇭🇺",
    "code": "HU",
    "dial_code": "+36"
  },
  {
    "name": "Iceland",
    "flag": "🇮🇸",
    "code": "IS",
    "dial_code": "+354"
  },
  {
    "name": "India",
    "flag": "🇮🇳",
    "code": "IN",
    "dial_code": "+91"
  },
  {
    "name": "Indonesia",
    "flag": "🇮🇩",
    "code": "ID",
    "dial_code": "+62"
  },
  {
    "name": "Iran, Islamic Republic of Persian Gulf",
    "flag": "🇮🇷",
    "code": "IR",
    "dial_code": "+98"
  },
  {
    "name": "Iraq",
    "flag": "🇮🇶",
    "code": "IQ",
    "dial_code": "+964"
  },
  {
    "name": "Ireland",
    "flag": "🇮🇪",
    "code": "IE",
    "dial_code": "+353"
  },
  {
    "name": "Isle of Man",
    "flag": "🇮🇲",
    "code": "IM",
    "dial_code": "+44"
  },
  {
    "name": "Israel",
    "flag": "🇮🇱",
    "code": "IL",
    "dial_code": "+972"
  },
  {
    "name": "Italy",
    "flag": "🇮🇹",
    "code": "IT",
    "dial_code": "+39"
  },
  {
    "name": "Jamaica",
    "flag": "🇯🇲",
    "code": "JM",
    "dial_code": "+1876"
  },
  {
    "name": "Japan",
    "flag": "🇯🇵",
    "code": "JP",
    "dial_code": "+81"
  },
  {
    "name": "Jersey",
    "flag": "🇯🇪",
    "code": "JE",
    "dial_code": "+44"
  },
  {
    "name": "Jordan",
    "flag": "🇯🇴",
    "code": "JO",
    "dial_code": "+962"
  },
  {
    "name": "Kazakhstan",
    "flag": "🇰🇿",
    "code": "KZ",
    "dial_code": "+7"
  },
  {
    "name": "Kenya",
    "flag": "🇰🇪",
    "code": "KE",
    "dial_code": "+254"
  },
  {
    "name": "Kiribati",
    "flag": "🇰🇮",
    "code": "KI",
    "dial_code": "+686"
  },
  {
    "name": "Korea, Democratic People's Republic of Korea",
    "flag": "🇰🇵",
    "code": "KP",
    "dial_code": "+850"
  },
  {
    "name": "Korea, Republic of South Korea",
    "flag": "🇰🇷",
    "code": "KR",
    "dial_code": "+82"
  },
  {
    "name": "Kosovo",
    "flag": "🇽🇰",
    "code": "XK",
    "dial_code": "+383"
  },
  {
    "name": "Kuwait",
    "flag": "🇰🇼",
    "code": "KW",
    "dial_code": "+965"
  },
  {
    "name": "Kyrgyzstan",
    "flag": "🇰🇬",
    "code": "KG",
    "dial_code": "+996"
  },
  {
    "name": "Laos",
    "flag": "🇱🇦",
    "code": "LA",
    "dial_code": "+856"
  },
  {
    "name": "Latvia",
    "flag": "🇱🇻",
    "code": "LV",
    "dial_code": "+371"
  },
  {
    "name": "Lebanon",
    "flag": "🇱🇧",
    "code": "LB",
    "dial_code": "+961"
  },
  {
    "name": "Lesotho",
    "flag": "🇱🇸",
    "code": "LS",
    "dial_code": "+266"
  },
  {
    "name": "Liberia",
    "flag": "🇱🇷",
    "code": "LR",
    "dial_code": "+231"
  },
  {
    "name": "Libyan Arab Jamahiriya",
    "flag": "🇱🇾",
    "code": "LY",
    "dial_code": "+218"
  },
  {
    "name": "Liechtenstein",
    "flag": "🇱🇮",
    "code": "LI",
    "dial_code": "+423"
  },
  {
    "name": "Lithuania",
    "flag": "🇱🇹",
    "code": "LT",
    "dial_code": "+370"
  },
  {
    "name": "Luxembourg",
    "flag": "🇱🇺",
    "code": "LU",
    "dial_code": "+352"
  },
  {
    "name": "Macao",
    "flag": "🇲🇴",
    "code": "MO",
    "dial_code": "+853"
  },
  {
    "name": "Macedonia",
    "flag": "🇲🇰",
    "code": "MK",
    "dial_code": "+389"
  },
  {
    "name": "Madagascar",
    "flag": "🇲🇬",
    "code": "MG",
    "dial_code": "+261"
  },
  {
    "name": "Malawi",
    "flag": "🇲🇼",
    "code": "MW",
    "dial_code": "+265"
  },
  {
    "name": "Malaysia",
    "flag": "🇲🇾",
    "code": "MY",
    "dial_code": "+60"
  },
  {
    "name": "Maldives",
    "flag": "🇲🇻",
    "code": "MV",
    "dial_code": "+960"
  },
  {
    "name": "Mali",
    "flag": "🇲🇱",
    "code": "ML",
    "dial_code": "+223"
  },
  {
    "name": "Malta",
    "flag": "🇲🇹",
    "code": "MT",
    "dial_code": "+356"
  },
  {
    "name": "Marshall Islands",
    "flag": "🇲🇭",
    "code": "MH",
    "dial_code": "+692"
  },
  {
    "name": "Martinique",
    "flag": "🇲🇶",
    "code": "MQ",
    "dial_code": "+596"
  },
  {
    "name": "Mauritania",
    "flag": "🇲🇷",
    "code": "MR",
    "dial_code": "+222"
  },
  {
    "name": "Mauritius",
    "flag": "🇲🇺",
    "code": "MU",
    "dial_code": "+230"
  },
  {
    "name": "Mayotte",
    "flag": "🇾🇹",
    "code": "YT",
    "dial_code": "+262"
  },
  {
    "name": "Mexico",
    "flag": "🇲🇽",
    "code": "MX",
    "dial_code": "+52"
  },
  {
    "name": "Micronesia, Federated States of Micronesia",
    "flag": "🇫🇲",
    "code": "FM",
    "dial_code": "+691"
  },
  {
    "name": "Moldova",
    "flag": "🇲🇩",
    "code": "MD",
    "dial_code": "+373"
  },
  {
    "name": "Monaco",
    "flag": "🇲🇨",
    "code": "MC",
    "dial_code": "+377"
  },
  {
    "name": "Mongolia",
    "flag": "🇲🇳",
    "code": "MN",
    "dial_code": "+976"
  },
  {
    "name": "Montenegro",
    "flag": "🇲🇪",
    "code": "ME",
    "dial_code": "+382"
  },
  {
    "name": "Montserrat",
    "flag": "🇲🇸",
    "code": "MS",
    "dial_code": "+1664"
  },
  {
    "name": "Morocco",
    "flag": "🇲🇦",
    "code": "MA",
    "dial_code": "+212"
  },
  {
    "name": "Mozambique",
    "flag": "🇲🇿",
    "code": "MZ",
    "dial_code": "+258"
  },
  {
    "name": "Myanmar",
    "flag": "🇲🇲",
    "code": "MM",
    "dial_code": "+95"
  },
  {
    "name": "Namibia",
    "flag": "🇳🇦",
    "code": "NA",
    "dial_code": "+264"
  },
  {
    "name": "Nauru",
    "flag": "🇳🇷",
    "code": "NR",
    "dial_code": "+674"
  },
  {
    "name": "Nepal",
    "flag": "🇳🇵",
    "code": "NP",
    "dial_code": "+977"
  },
  {
    "name": "Netherlands",
    "flag": "🇳🇱",
    "code": "NL",
    "dial_code": "+31"
  },
  {
    "name": "Netherlands Antilles",
    "flag": "",
    "code": "AN",
    "dial_code": "+599"
  },
  {
    "name": "New Caledonia",
    "flag": "🇳🇨",
    "code": "NC",
    "dial_code": "+687"
  },
  {
    "name": "New Zealand",
    "flag": "🇳🇿",
    "code": "NZ",
    "dial_code": "+64"
  },
  {
    "name": "Nicaragua",
    "flag": "🇳🇮",
    "code": "NI",
    "dial_code": "+505"
  },
  {
    "name": "Niger",
    "flag": "🇳🇪",
    "code": "NE",
    "dial_code": "+227"
  },
  {
    "name": "Nigeria",
    "flag": "🇳🇬",
    "code": "NG",
    "dial_code": "+234"
  },
  {
    "name": "Niue",
    "flag": "🇳🇺",
    "code": "NU",
    "dial_code": "+683"
  },
  {
    "name": "Norfolk Island",
    "flag": "🇳🇫",
    "code": "NF",
    "dial_code": "+672"
  },
  {
    "name": "Northern Mariana Islands",
    "flag": "🇲🇵",
    "code": "MP",
    "dial_code": "+1670"
  },
  {
    "name": "Norway",
    "flag": "🇳🇴",
    "code": "NO",
    "dial_code": "+47"
  },
  {
    "name": "Oman",
    "flag": "🇴🇲",
    "code": "OM",
    "dial_code": "+968"
  },
  {
    "name": "Pakistan",
    "flag": "🇵🇰",
    "code": "PK",
    "dial_code": "+92"
  },
  {
    "name": "Palau",
    "flag": "🇵🇼",
    "code": "PW",
    "dial_code": "+680"
  },
  {
    "name": "Palestinian Territory, Occupied",
    "flag": "🇵🇸",
    "code": "PS",
    "dial_code": "+970"
  },
  {
    "name": "Panama",
    "flag": "🇵🇦",
    "code": "PA",
    "dial_code": "+507"
  },
  {
    "name": "Papua New Guinea",
    "flag": "🇵🇬",
    "code": "PG",
    "dial_code": "+675"
  },
  {
    "name": "Paraguay",
    "flag": "🇵🇾",
    "code": "PY",
    "dial_code": "+595"
  },
  {
    "name": "Peru",
    "flag": "🇵🇪",
    "code": "PE",
    "dial_code": "+51"
  },
  {
    "name": "Philippines",
    "flag": "🇵🇭",
    "code": "PH",
    "dial_code": "+63"
  },
  {
    "name": "Pitcairn",
    "flag": "🇵🇳",
    "code": "PN",
    "dial_code": "+64"
  },
  {
    "name": "Poland",
    "flag": "🇵🇱",
    "code": "PL",
    "dial_code": "+48"
  },
  {
    "name": "Portugal",
    "flag": "🇵🇹",
    "code": "PT",
    "dial_code": "+351"
  },
  {
    "name": "Puerto Rico",
    "flag": "🇵🇷",
    "code": "PR",
    "dial_code": "+1939"
  },
  {
    "name": "Qatar",
    "flag": "🇶🇦",
    "code": "QA",
    "dial_code": "+974"
  },
  {
    "name": "Romania",
    "flag": "🇷🇴",
    "code": "RO",
    "dial_code": "+40"
  },
  {
    "name": "Russia",
    "flag": "🇷🇺",
    "code": "RU",
    "dial_code": "+7"
  },
  {
    "name": "Rwanda",
    "flag": "🇷🇼",
    "code": "RW",
    "dial_code": "+250"
  },
  {
    "name": "Reunion",
    "flag": "🇷🇪",
    "code": "RE",
    "dial_code": "+262"
  },
  {
    "name": "Saint Barthelemy",
    "flag": "🇧🇱",
    "code": "BL",
    "dial_code": "+590"
  },
  {
    "name": "Saint Helena, Ascension and Tristan Da Cunha",
    "flag": "🇸🇭",
    "code": "SH",
    "dial_code": "+290"
  },
  {
    "name": "Saint Kitts and Nevis",
    "flag": "🇰🇳",
    "code": "KN",
    "dial_code": "+1869"
  },
  {
    "name": "Saint Lucia",
    "flag": "🇱🇨",
    "code": "LC",
    "dial_code": "+1758"
  },
  {
    "name": "Saint Martin",
    "flag": "🇲🇫",
    "code": "MF",
    "dial_code": "+590"
  },
  {
    "name": "Saint Pierre and Miquelon",
    "flag": "🇵🇲",
    "code": "PM",
    "dial_code": "+508"
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "flag": "🇻🇨",
    "code": "VC",
    "dial_code": "+1784"
  },
  {
    "name": "Samoa",
    "flag": "🇼🇸",
    "code": "WS",
    "dial_code": "+685"
  },
  {
    "name": "San Marino",
    "flag": "🇸🇲",
    "code": "SM",
    "dial_code": "+378"
  },
  {
    "name": "Sao Tome and Principe",
    "flag": "🇸🇹",
    "code": "ST",
    "dial_code": "+239"
  },
  {
    "name": "Saudi Arabia",
    "flag": "🇸🇦",
    "code": "SA",
    "dial_code": "+966"
  },
  {
    "name": "Senegal",
    "flag": "🇸🇳",
    "code": "SN",
    "dial_code": "+221"
  },
  {
    "name": "Serbia",
    "flag": "🇷🇸",
    "code": "RS",
    "dial_code": "+381"
  },
  {
    "name": "Seychelles",
    "flag": "🇸🇨",
    "code": "SC",
    "dial_code": "+248"
  },
  {
    "name": "Sierra Leone",
    "flag": "🇸🇱",
    "code": "SL",
    "dial_code": "+232"
  },
  {
    "name": "Singapore",
    "flag": "🇸🇬",
    "code": "SG",
    "dial_code": "+65"
  },
  {
    "name": "Slovakia",
    "flag": "🇸🇰",
    "code": "SK",
    "dial_code": "+421"
  },
  {
    "name": "Slovenia",
    "flag": "🇸🇮",
    "code": "SI",
    "dial_code": "+386"
  },
  {
    "name": "Solomon Islands",
    "flag": "🇸🇧",
    "code": "SB",
    "dial_code": "+677"
  },
  {
    "name": "Somalia",
    "flag": "🇸🇴",
    "code": "SO",
    "dial_code": "+252"
  },
  {
    "name": "South Africa",
    "flag": "🇿🇦",
    "code": "ZA",
    "dial_code": "+27"
  },
  {
    "name": "South Sudan",
    "flag": "🇸🇸",
    "code": "SS",
    "dial_code": "+211"
  },
  {
    "name": "South Georgia and the South Sandwich Islands",
    "flag": "🇬🇸",
    "code": "GS",
    "dial_code": "+500"
  },
  {
    "name": "Spain",
    "flag": "🇪🇸",
    "code": "ES",
    "dial_code": "+34"
  },
  {
    "name": "Sri Lanka",
    "flag": "🇱🇰",
    "code": "LK",
    "dial_code": "+94"
  },
  {
    "name": "Sudan",
    "flag": "🇸🇩",
    "code": "SD",
    "dial_code": "+249"
  },
  {
    "name": "Suriname",
    "flag": "🇸🇷",
    "code": "SR",
    "dial_code": "+597"
  },
  {
    "name": "Svalbard and Jan Mayen",
    "flag": "🇸🇯",
    "code": "SJ",
    "dial_code": "+47"
  },
  {
    "name": "Swaziland",
    "flag": "🇸🇿",
    "code": "SZ",
    "dial_code": "+268"
  },
  {
    "name": "Sweden",
    "flag": "🇸🇪",
    "code": "SE",
    "dial_code": "+46"
  },
  {
    "name": "Switzerland",
    "flag": "🇨🇭",
    "code": "CH",
    "dial_code": "+41"
  },
  {
    "name": "Syrian Arab Republic",
    "flag": "🇸🇾",
    "code": "SY",
    "dial_code": "+963"
  },
  {
    "name": "Taiwan",
    "flag": "🇹🇼",
    "code": "TW",
    "dial_code": "+886"
  },
  {
    "name": "Tajikistan",
    "flag": "🇹🇯",
    "code": "TJ",
    "dial_code": "+992"
  },
  {
    "name": "Tanzania, United Republic of Tanzania",
    "flag": "🇹🇿",
    "code": "TZ",
    "dial_code": "+255"
  },
  {
    "name": "Thailand",
    "flag": "🇹🇭",
    "code": "TH",
    "dial_code": "+66"
  },
  {
    "name": "Timor-Leste",
    "flag": "🇹🇱",
    "code": "TL",
    "dial_code": "+670"
  },
  {
    "name": "Togo",
    "flag": "🇹🇬",
    "code": "TG",
    "dial_code": "+228"
  },
  {
    "name": "Tokelau",
    "flag": "🇹🇰",
    "code": "TK",
    "dial_code": "+690"
  },
  {
    "name": "Tonga",
    "flag": "🇹🇴",
    "code": "TO",
    "dial_code": "+676"
  },
  {
    "name": "Trinidad and Tobago",
    "flag": "🇹🇹",
    "code": "TT",
    "dial_code": "+1868"
  },
  {
    "name": "Tunisia",
    "flag": "🇹🇳",
    "code": "TN",
    "dial_code": "+216"
  },
  {
    "name": "Turkey",
    "flag": "🇹🇷",
    "code": "TR",
    "dial_code": "+90"
  },
  {
    "name": "Turkmenistan",
    "flag": "🇹🇲",
    "code": "TM",
    "dial_code": "+993"
  },
  {
    "name": "Turks and Caicos Islands",
    "flag": "🇹🇨",
    "code": "TC",
    "dial_code": "+1649"
  },
  {
    "name": "Tuvalu",
    "flag": "🇹🇻",
    "code": "TV",
    "dial_code": "+688"
  },
  {
    "name": "Uganda",
    "flag": "🇺🇬",
    "code": "UG",
    "dial_code": "+256"
  },
  {
    "name": "Ukraine",
    "flag": "🇺🇦",
    "code": "UA",
    "dial_code": "+380"
  },
  {
    "name": "United Arab Emirates",
    "flag": "🇦🇪",
    "code": "AE",
    "dial_code": "+971"
  },
  {
    "name": "United Kingdom",
    "flag": "🇬🇧",
    "code": "GB",
    "dial_code": "+44"
  },
  {
    "name": "United States",
    "flag": "🇺🇸",
    "code": "US",
    "dial_code": "+1"
  },
  {
    "name": "Uruguay",
    "flag": "🇺🇾",
    "code": "UY",
    "dial_code": "+598"
  },
  {
    "name": "Uzbekistan",
    "flag": "🇺🇿",
    "code": "UZ",
    "dial_code": "+998"
  },
  {
    "name": "Vanuatu",
    "flag": "🇻🇺",
    "code": "VU",
    "dial_code": "+678"
  },
  {
    "name": "Venezuela, Bolivarian Republic of Venezuela",
    "flag": "🇻🇪",
    "code": "VE",
    "dial_code": "+58"
  },
  {
    "name": "Vietnam",
    "flag": "🇻🇳",
    "code": "VN",
    "dial_code": "+84"
  },
  {
    "name": "Virgin Islands, British",
    "flag": "🇻🇬",
    "code": "VG",
    "dial_code": "+1284"
  },
  {
    "name": "Virgin Islands, U.S.",
    "flag": "🇻🇮",
    "code": "VI",
    "dial_code": "+1340"
  },
  {
    "name": "Wallis and Futuna",
    "flag": "🇼🇫",
    "code": "WF",
    "dial_code": "+681"
  },
  {
    "name": "Yemen",
    "flag": "🇾🇪",
    "code": "YE",
    "dial_code": "+967"
  },
  {
    "name": "Zambia",
    "flag": "🇿🇲",
    "code": "ZM",
    "dial_code": "+260"
  },
  {
    "name": "Zimbabwe",
    "flag": "🇿🇼",
    "code": "ZW",
    "dial_code": "+263"
  }
]
