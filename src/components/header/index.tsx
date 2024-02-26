import { Menu, Popover } from "antd";
import CardInfor from "../cardInfor";
import BaseText from "../text";
import Images from "../../assets/gen";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18next from "i18next";
import { Url } from "../../routers/paths";
import { useLocalStorage } from "../../stores/localStorage";

const HeaderComponent = () => {
  const location = useLocation();
  // const [lang, setLang] = useState<string>(i18next.language);
  const { locale, setLocale } = useLocalStorage((state) => state);
  const [title, setTitle] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [openLangs, setOpenLangs] = useState(false);

  useEffect(() => {
    console.log("location.pathname", location.pathname);

    switch (location.pathname) {
      case "/":
        setTitle("Dashboard");
        break;
      case Url.dashboard:
        setTitle("Dashboard");
        break;
      case Url.user:
        setTitle("User Manage");
        break;
      case Url.userDetail:
        setTitle("User Detail");
        setIsDetail(true);
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
      <div className="flex flex-row items-center gap-3">
        {isDetail && <img src={Images.arrowLeft} className="w-6 h-6" onClick={() => { navigate(-1) }} />}
        <BaseText locale size={20} bold className="line-clamp-1">
          {title}
        </BaseText>
      </div>
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
          <div className="flex items-center justify-center px-3 ml-6 border rounded cursor-pointer h-11">
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
          <div className="flex items-center justify-center ml-6 border rounded cursor-pointer w-11 h-11">
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
            className="ml-6 rounded-full cursor-pointer w-11 h-11"
          />
        </Popover>
      </div>
    </div>
  );
};

export default HeaderComponent;
