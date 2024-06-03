import type { MenuProps, MenuTheme } from "antd";
import { Button, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { menuList } from "./menuList";
import Images from "../../assets/gen";
import "./menu.css";
type MenuItem = Required<MenuProps>["items"][number];

const MenuHome: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(Url.dashboard);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
      onClick: () => {
        if (!children && menuList[key as any]) {
          navigate(menuList[key as any]);
        }
      },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      t("Dashboard"),
      Url.dashboard,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.dashboard ? Images.dashboard : Images.dashboard2
        }
      />
    ),
    getItem(
      t("User Manage"),
      Url.user,
      <img
        className="w-6 h-6"
        src={selectedKeys === Url.user ? Images.userManage : Images.userManage2}
      />
    ),
    getItem(
      t("Bulletin Board"),
      Url.bulletinBoard,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.bulletinBoard
            ? Images.bulletinBoard
            : Images.bulletinBoard2
        }
      />
    ),
    getItem(
      t("Store"),
      Url.store,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.storeListing ||
          selectedKeys === Url.reservationDetails
            ? Images.store
            : Images.store2
        }
      />,
      [
        getItem(t("Store Listing"), Url.storeListing),
        getItem(t("Reservation details"), Url.reservationDetails),
      ]
    ),
    getItem(
      t("Shopping"),
      Url.shopping,
      <img className="w-6 h-6" src={Images.shopping2} />,
      []
    ),
    getItem(
      t("Help Center"),
      Url.helpCenter,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.helpCenter
            ? Images.helpCenter
            : Images.helpCenter2
        }
      />
    ),
    getItem(
      t("Reports"),
      Url.report,
      <img
        className="w-6 h-6"
        src={selectedKeys === Url.report ? Images.reports : Images.reports2}
      />
    ),
    getItem(
      t("Subscription"),
      Url.subcription,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.subcription
            ? Images.subscription
            : Images.subscription2
        }
      />
    ),
    getItem(
      t("Point History"),
      Url.pointHistory,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.pointHistory
            ? Images.pointHistory
            : Images.pointHistory2
        }
      />
    ),
    getItem(
      t("Blogs Manage"),
      Url.blogs,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.blogs ? Images.blogsManage : Images.blogsManage2
        }
      />
    ),
    getItem(
      t("App Version"),
      Url.appVersion,
      <img
        className="w-6 h-6"
        src={
          selectedKeys === Url.appVersion
            ? Images.appVersion
            : Images.appVersion2
        }
      />
    ),
    getItem(
      t("SEO Page"),
      Url.seo,
      <img
        className="w-6 h-6"
        src={selectedKeys === Url.seo ? Images.seoPage : Images.seoPage2}
      />
    ),
    getItem(
      t("Site Link"),
      Url.site,
      <img
        className="w-6 h-6"
        src={selectedKeys === Url.site ? Images.seoPage : Images.seoPage2}
      />
    ),
    getItem(
      t("Setting"),
      Url.setting,
      <img
        className="w-6 h-6"
        src={selectedKeys === Url.setting ? Images.setting : Images.setting2}
      />
    ),
  ];

  useEffect(() => {
    if (
      location.pathname.includes(Url.dashboard) ||
      location.pathname === "/"
    ) {
      setSelectedKeys(Url.dashboard);
    } else {
      setSelectedKeys(location.pathname);
    }
  }, [location.pathname]);

  return (
    <Menu
      className="px-3 pt-2"
      defaultSelectedKeys={[selectedKeys]}
      selectedKeys={[selectedKeys]}
      items={items}
      mode="inline"
    />
  );
};

export default MenuHome;
