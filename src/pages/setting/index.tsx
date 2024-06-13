import { useState } from "react";
import { Tabs } from "antd";
import TabBarItem from "./component/TabBarItem";
import TabPane from "antd/es/tabs/TabPane";
import BranchIntroduction from "./component/BranchIntroduction";
import CompanyInformation from "./component/CompanyInformation";
import { useTranslation } from "react-i18next";
import QASetting from "./component/QASetting";
import CustomService from "./component/CustomService";
import { RegionAndSubwaySetting } from "./component/RegionAndSubwaySetting";
const SettingPage = () => {
  const { t } = useTranslation();

  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key: any) => {
    setActiveKey(key);
  };
  return (
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      <TabPane
        tab={
          <TabBarItem
            index="1"
            activeKey={activeKey}
            title={t("브랜드 소개")}
          />
        }
        key="1"
      >
        <BranchIntroduction />
      </TabPane>
      <TabPane
        tab={
          <TabBarItem index="2" activeKey={activeKey} title={t("회사 정보")} />
        }
        key="2"
      >
        <CompanyInformation />
      </TabPane>
      <TabPane
        tab={
          <TabBarItem
            index="3"
            activeKey={activeKey}
            title={t("자주 묻는 질문")}
          />
        }
        key="3"
      >
        <QASetting />
      </TabPane>
      <TabPane
        tab={
          <TabBarItem
            index="4"
            activeKey={activeKey}
            title={t("고객 서비스")}
          />
        }
        key="4"
      >
        <CustomService />
      </TabPane>
      <TabPane
        tab={
          <TabBarItem
            index="5"
            activeKey={activeKey}
            title={t("필터 지역 및 지하철 설정")}
          />
        }
        key="5"
      >
        <RegionAndSubwaySetting />
      </TabPane>
    </Tabs>
  );
};

export default SettingPage;
