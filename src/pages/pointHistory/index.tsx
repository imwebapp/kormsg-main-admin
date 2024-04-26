import { Tabs } from "antd";
// import TabPane from "antd/es/tabs/TabPane";
import { useTranslation } from "react-i18next";
import { BaseText } from "../../components";
import { useState } from "react";
import { classNames } from "../../utils/common";
import TabBarItem from "./component/TabBarItem";
import TabPane from "antd/es/tabs/TabPane";
import PointProduct from "./component/PointProduct";
// import CommunityReport from "./component/CommunityReport";
// import CommentReport from "./component/CommentReport";

export default function PointHistoryPage() {
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
            title="포인트 상품"
            count="5"
          />
        }
        key="1"
      >
        <PointProduct />
      </TabPane>
      <TabPane
        tab={
          <TabBarItem
            index="2"
            activeKey={activeKey}
            title="포인트 획득 내역"
            count="10"
          />
        }
        key="2"
      >
        <PointProduct />
      </TabPane>
      <TabPane
        tab={
          <TabBarItem
            index="3"
            activeKey={activeKey}
            title="상품 신청 내역"
            count="4"
          />
        }
        key="3"
      >
        <PointProduct />
      </TabPane>
    </Tabs>
  );
}
