import { Breadcrumb, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import MenuHome from "../menu";
import HeaderComponent from "../header";
import { Url } from "../../routers/paths";
import Images from "../../assets/gen";
import BaseText from "../text";
import { classNames } from "../../utils/common";
import { useLocalStorage } from "../../stores/localStorage";
import { useEffect, useState } from "react";
import { seoApi } from "../../apis/seoApi";
import { settingApi } from "../../apis/settingApi";
const { Header, Sider } = Layout;

const DashboardLayout = ({ children }: any) => {
  // const [collapsed, setCollapsed] = useState(true);
  const { collapsed, setCollapsed, logo, setLogo, appName, setAppName } = useLocalStorage((state) => state);
  const navigate = useNavigate();

  const _getDataSeo = async () => {
    const response: any = await seoApi.getSEO();
    if (response.code === 200) {
      setLogo(response?.results?.object?.avatar);
    }
  }

  const _getSettingPage = async () => {
    try {
      const params = {
        fields: '["$all"]',
        filter: JSON.stringify({ field: "APP_NAME" }),
      };
      let result: any = await settingApi.getList(params);
      if (result.code === 200) {
        setAppName(result?.results?.objects?.rows[0]?.value);
      }
    } catch (error) { }
  };

  useEffect(() => {
    _getDataSeo()
    _getSettingPage()
  }, []);

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
          {logo && <img
            className="w-[38px] h-[38px] rounded-lg"
            src={logo}
            alt=""
            onClick={() => {
              navigate(Url.dashboard);
            }}
          />}
          {!collapsed && (
            <div className="pl-3 flex flex-1 min-w-[160px]">
              <BaseText bold size={18}>
                {appName}
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
            <BaseText medium size={16} className="pl-2 pr-8">
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
