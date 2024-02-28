import { Menu, Popover } from "antd";
import CardInfor from "../cardInfor";
import BaseText from "../text";
import Images from "../../assets/gen";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import i18next from "i18next";
import { Url } from "../../routers/paths";
import { useLocalStorage } from "../../stores/localStorage";

const HeaderComponent = () => {
  const location = useLocation();
  const { locale, setLocale } = useLocalStorage((state) => state);
  const [title, setTitle] = useState<any>();
  const [openLangs, setOpenLangs] = useState(false);

  const getSubTitle = (title: string, subtitle: string) => {
    return (
      <div className="flex flex-row line-clamp-1">
        <BaseText locale size={20} bold className=" !text-darkNight600">
          {title}
        </BaseText>
        <BaseText size={20} bold>
          /
        </BaseText>
        <BaseText locale size={20} bold>
          {subtitle}
        </BaseText>
      </div>
    );
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Dashboard");
        break;
      case Url.dashboard:
        setTitle("Dashboard");
        break;
      case Url.dashboardOverview:
        setTitle(getSubTitle("Dashboard", "Overview"));
        break;
      case Url.dashboardReferral:
        setTitle(getSubTitle("Dashboard", "Referral URL"));
        break;
      case Url.dashboardInflowDomaine:
        setTitle(getSubTitle("Dashboard", "Inflow Domaine"));
        break;
      case Url.dashboardVisit:
        setTitle(getSubTitle("Dashboard", "Most visited pages"));
        break;
      case Url.dashboardIncoming:
        setTitle(getSubTitle("Dashboard", "Incoming search terms"));
        break;
      case Url.user:
        setTitle("User Manage");
        break;
      case Url.bulletinBoard:
        setTitle("Bulletin Board");
        break;
      case Url.storeListing:
        setTitle("Store Listing");
        break;
      case Url.reservationDetails:
        setTitle("Reservation details");
        break;
      case Url.shopping:
        setTitle("Shopping");
        break;
      case Url.helpCenter:
        setTitle("Help Center");
        break;
      case Url.report:
        setTitle("Reports");
        break;
      case Url.subcription:
        setTitle("Subscription");
        break;
      case Url.pointHistory:
        setTitle("Point History");
        break;
      case Url.blogs:
        setTitle("Blogs Manage");
        break;
      case Url.appVersion:
        setTitle("App Version");
        break;
      case Url.seo:
        setTitle("SEO Page");
        break;
      case Url.setting:
        setTitle("Setting");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const items = [
    {
      key: "ko",
      label: "한국어",
    },
    {
      key: "en",
      label: "English",
    },
  ];
  const menuLangs = (
    <Menu
      items={items}
      onClick={(e) => {
        i18next.changeLanguage(e.key);
        setLocale(e.key);
        setOpenLangs(false);
      }}
    />
  );

  return (
    <div className="flex flex-row items-center justify-between h-full">
      <BaseText
        locale={typeof title === "string"}
        size={20}
        bold
        className="line-clamp-1"
      >
        {title}
      </BaseText>
      <div className="flex flex-row items-center">
        <Popover
          placement="bottomRight"
          content={menuLangs}
          trigger="click"
          open={openLangs}
          onOpenChange={() => {
            setOpenLangs(true);
          }}
        >
          <div className="px-3 h-11 border rounded flex justify-center items-center ml-6 cursor-pointer">
            <img
              src={locale === "ko" ? Images.krFlags : Images.icEnglish}
              className="w-6 h-6"
            />
            <BaseText bold className="ml-3 line-clamp-1">
              {locale === "ko" ? "한국어" : "English"}
            </BaseText>
          </div>
        </Popover>
        <Popover
          placement="bottomRight"
          // content={<CardInfor />}
          trigger="click"
        >
          <div className="w-11 h-11 border rounded flex justify-center items-center ml-6 cursor-pointer">
            <img src={Images.bell} className="w-6 h-6" />
          </div>
        </Popover>
        <Popover
          placement="bottomRight"
          content={<CardInfor />}
          trigger="click"
        >
          <img
            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg"
            className="w-11 h-11 rounded-full ml-6 cursor-pointer"
          />
        </Popover>
      </div>
    </div>
  );
};

export default HeaderComponent;
