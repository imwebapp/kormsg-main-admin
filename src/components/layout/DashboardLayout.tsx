import React, { useState } from "react";
import { Breadcrumb, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import MenuHome from "../menu";
import HeaderComponent from "../header";
import { Url } from "../../routers/paths";
import Images from "../../assets/gen";
const { Header, Sider } = Layout;

const DashboardLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <Sider
        style={{
          backgroundColor: "white",
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
        }}
        collapsible={false}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div>
          <p >
            <i
              className="fa-solid fa-bars"
              style={{ paddingLeft: collapsed ? "0.35rem" : 0 }}
              onClick={() => setCollapsed(!collapsed)}
            ></i>
            {!collapsed && (
              <img
                className="w-[38px] h-[38px] rounded-lg"
                src={Images.logo}
                alt=""
                onClick={() => {
                  navigate(Url.dashboard);
                }}
              />
            )}
          </p>
        </div>
        <MenuHome />
      </Sider>
      <Layout
        className="site-layout"
        style={{ backgroundColor: "#fafafa", margin: "0 1.5rem" }}
      >
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
          children={<HeaderComponent />}
        />
        {children}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
