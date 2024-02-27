import { PropsWithChildren } from "react";
import { classNames } from "../../utils/common";

type BaseCardProps = {
  className?: string; // for tailwindcss
};

export default function BaseCard(props: PropsWithChildren<BaseCardProps>) {
  const { children, className } = props;
  return <div className={classNames("border rounded-xl px-5 py-4 overflow-auto", className)}>{children}</div>;
}
