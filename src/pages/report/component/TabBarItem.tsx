import TabPane, { TabPaneProps } from "antd/es/tabs/TabPane";
import { BaseText } from "../../../components";
import { classNames } from "../../../utils/common";

type TabBarProps = {
  index: string;
  activeKey: string;
  title: string;
};
export default function TabBarItem(props: TabBarProps) {
  return (
    <div className="px-4">
      <BaseText
        size={16}
        bold
        locale
        className={classNames(
          props.activeKey !== props.index ? "!text-darkNight500" : ""
        )}
      >
        {props.title}
      </BaseText>
    </div>
  );
}
