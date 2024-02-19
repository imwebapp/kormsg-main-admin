import type { MenuProps, MenuTheme } from "antd";
import { Button, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { menuList, menuListSwap } from "./menuList";
import Images from "../../assets/gen";

type MenuItem = Required<MenuProps>["items"][number];

const MenuHome: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("Dashboard");

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
        if (menuList[key as any]) {
          navigate(menuList[key as any]);
        }
      },
      style: { color: "#758D96" },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    //home
    getItem(t("Dashboard"), "dashboard", <img src={Images.arrowLeft} />),
    // //org
    // getItem(t("Menu.2"), "syb1", <i className="fa-solid fa-people-group"></i>, [
    //   getItem(t("Menu.2_1"), "2", <i className="fa-solid fa-sitemap"></i>),
    //   getItem(t("Menu.2_2"), "3", <i className="fa-solid fa-circle-user"></i>),
    //   getItem(t("Menu.2_3"), "4", <i className="fa-solid fa-key"></i>),
    // ]),
  ];

  useEffect(() => {
    setSelectedKeys(menuListSwap[location.pathname]);
  }, [location.pathname]);

  return (
    <Menu
      style={{
        color: "#758D96",
      }}
      defaultSelectedKeys={[selectedKeys]}
      selectedKeys={[selectedKeys]}
      items={items}
    />
  );
};

export default MenuHome;
