import { Tabs } from "antd";
// import TabPane from "antd/es/tabs/TabPane";
import { useTranslation } from "react-i18next";
import { BaseText } from "../../components";
import { useState } from "react";
import { classNames } from "../../utils/common";
import TabBarItem from "./component/TabBarItem";
import TabPane from "antd/es/tabs/TabPane";
import CommunityReport from "./component/CommunityReport";

export default function ReportPage() {
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
            title="Community Report List"
          />
        }
        key="1"
      >
       <CommunityReport/>
      </TabPane>
      <TabPane
        tab={
          <TabBarItem
            index="2"
            activeKey={activeKey}
            title="Comment report list"
          />
        }
        key="2"
      >
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  );
}
