import Images from "../../assets/gen";
import { classNames } from "../../utils/common";
import BaseText from "../text";

type CardStatisticProps = {
  title: string;
  icon: string;
  count: string;
  growth: number;
  className?: string; // for tailwindcss
};

export default function CardStatistic(props: CardStatisticProps) {
  const { className, title, icon, count, growth } = props;
  return (
    <div
      className={classNames(
        "flex flex-col items-center min-w-[180px]",
        className
      )}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col">
          <img src={icon} className="w-6 h-6" />
          <BaseText locale bold size={16} className="pt-[10px]">
            {title}
          </BaseText>
        </div>
        <img
          className="w-[74px] h-[50px]"
          src={growth > 0 ? Images.smallChart : Images.smallChart1}
        />
      </div>
      <div className="flex flex-row items-end justify-start w-full">
        <BaseText size={36} bold className="leading-none mr-2">
          {count}
        </BaseText>
        <BaseText
          size={16}
          medium
          className={classNames(
            growth > 0 ? "text-polaGreen500" : "text-dustRed500"
          )}
        >
          {growth > 0 ? `+${growth}` : `${growth}`}
        </BaseText>
        <img
          className="w-6 h-6"
          src={growth > 0 ? Images.statistics : Images.statistics1}
        />
      </div>
    </div>
  );
}
