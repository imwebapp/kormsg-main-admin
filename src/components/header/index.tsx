import { Menu, Popover } from "antd";
import CardInfor from "../cardInfor";
import BaseText from "../text";
import Images from "../../assets/gen";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import i18next from "i18next";
import { Url } from "../../routers/paths";

const HeaderComponent = () => {
  const location = useLocation();
  const [lang, setLang] = useState<string>(i18next.language);

  const [title, setTitle] = useState("");
  const [openLangs, setOpenLangs] = useState(false);

  useEffect(() => {
    console.log("location.pathname", location.pathname);

    switch (location.pathname) {
      case "":
        setTitle("Dashboard");
        break;
      case Url.dashboard:
        setTitle("Dashboard");
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
        setLang(e.key);
        setOpenLangs(false);
      }}
    />
  );

  return (
    <div className="flex flex-row items-center justify-between h-full">
      <BaseText locale size={20} bold className="line-clamp-1">
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
            <img src={lang === "ko" ? Images.krFlags : Images.icEnglish} className="w-6 h-6" />
            <BaseText bold className="ml-3 line-clamp-1">
              {lang === "ko" ? "한국어" : "English"}
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
