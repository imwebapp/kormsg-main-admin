import { useState } from "react";
import { Tabs } from "antd";
import TabBarItem from "./component/TabBarItem";
import TabPane from "antd/es/tabs/TabPane";
import BranchIntroduction from "./component/BranchIntroduction";
const SettingPage = () => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key: any) => {
    setActiveKey(key);
  };
  return (
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      <TabPane
        tab={<TabBarItem index="1" activeKey={activeKey} title="브랜드 소개" />}
        key="1"
      >
        <BranchIntroduction />
      </TabPane>
      <TabPane
        tab={<TabBarItem index="2" activeKey={activeKey} title="회사 정보" />}
        key="2"
      >
        <div>회사 정보</div>
      </TabPane>
      <TabPane
        tab={
          <TabBarItem index="3" activeKey={activeKey} title="자주 묻는 질문" />
        }
        key="3"
      >
        <div>자주 묻는 질문</div>
      </TabPane>
      <TabPane
        tab={<TabBarItem index="4" activeKey={activeKey} title="고객 서비스" />}
        key="4"
      >
        <div>고객 서비스</div>
      </TabPane>
      <TabPane
        tab={
          <TabBarItem
            index="5"
            activeKey={activeKey}
            title="필터 지역 및 지하철 설정"
          />
        }
        key="5"
      >
        <div>필터 지역 및 지하철 설정</div>
      </TabPane>
    </Tabs>
  );
};

export default SettingPage;
