import { BaseText } from "../../../components";
import { classNames } from "../../../utils/common";

type TabBarProps = {
  index: string;
  activeKey: string;
  title: string;
  count?: string;
};
export default function TabBarItem(props: TabBarProps) {
  return (
    <div className="flex gap-2 px-4">
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

      <BaseText className="flex justify-center items-center p-2.5 my-auto w-6 h-6 text-base leading-6 text-center text-white whitespace-nowrap rounded bg-neutral-700">
        {props.count}
      </BaseText>
    </div>
  );
}
