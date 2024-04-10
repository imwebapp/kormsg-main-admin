import { Tabs } from "antd";
// import TabPane from "antd/es/tabs/TabPane";
import { useTranslation } from "react-i18next";
import { BaseText } from "../../components";
import { useState } from "react";
import { classNames } from "../../utils/common";
import TabBarItem from "./component/TabBarItem";
import TabPane from "antd/es/tabs/TabPane";
import CommunityReport from "./component/CommunityReport";
import CommentReport from "./component/CommentReport";

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
        <CommunityReport key={Date.now()} />
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
        <CommentReport key={Date.now()}/>
      </TabPane>
    </Tabs>
  );
}
