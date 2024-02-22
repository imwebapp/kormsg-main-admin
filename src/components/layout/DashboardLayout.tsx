import React, { useState } from "react";
import { Breadcrumb, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import MenuHome from "../menu";
import HeaderComponent from "../header";
import { Url } from "../../routers/paths";
import Images from "../../assets/gen";
import BaseText from "../text";
import { classNames } from "../../utils/common";
const { Header, Sider } = Layout;

const DashboardLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout className="h-screen bg-white">
      <Sider
        className="border-r-[1px] flex flex-col"
        style={{
          backgroundColor: "white",
        }}
        collapsible={false}
        collapsed={collapsed}
        collapsedWidth={81}
        width={250}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex flex-row items-center py-4 border-b-[1px] px-[18px]">
          <img
            className="w-[38px] h-[38px] rounded-lg"
            src={Images.logo}
            alt=""
            onClick={() => {
              navigate(Url.dashboard);
            }}
          />
          {!collapsed && (
            <div className="pl-3 flex flex-1 min-w-[160px]">
              <BaseText bold size={18}>
                GM4 Data
              </BaseText>
            </div>
          )}
        </div>
        <div className="flex-1 h-[calc(100vh-152px)] overflow-auto no-scrollbar">
          <MenuHome />
        </div>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex flex-row items-center cursor-pointer justify-end border-t-[1px] h-[80px]"
        >
          <img
            className={classNames("w-6 h-6", !!collapsed ? "mr-6" : "")}
            src={!!collapsed ? Images.collapse2 : Images.collapse}
          />
          {!collapsed && (
            <BaseText medium size={16} className="pr-8 pl-2">
              Collapse
            </BaseText>
          )}
        </div>
      </Sider>
      <Layout className="bg-white ">
        <Header
          className="bg-white border-b h-[71px] px-6"
          children={<HeaderComponent />}
        />
        <div className="overflow-auto">{children}</div>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
