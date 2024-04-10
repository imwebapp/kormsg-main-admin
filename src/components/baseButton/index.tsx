import { PropsWithChildren } from "react";
import { classNames } from "../../utils/common";
import BaseText from "../text";

type BaseButtonProps = {
  className?: string; // for tailwindcss
  classNameTitle?: string;
  icon?: string;
  classNameIcon?: string;
  type?: "primary" | "default" | "danger";
  onClick?: any;
  disabled?: boolean;
};

export default function BaseButton(props: PropsWithChildren<BaseButtonProps>) {
  const {
    children,
    icon,
    className,
    classNameTitle,
    classNameIcon,
    type = "primary",
    onClick,
    disabled,
  } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        "rounded-[10px] px-4 py-3 flex flex-row justify-center items-center flex-1",
        type === "primary" ? "bg-primary" : "",
        type === "default" ? "bg-white border-[1px] border-darkNight200" : "",
        type === "danger" ? "bg-dustRed500" : "",
        disabled ? "opacity-50" : "",
        className
      )}
    >
      {icon && (
        <img src={icon} className={classNames("w-6 h-6", classNameIcon)} />
      )}
      {typeof children === "string" ? (
        <BaseText
          locale
          size={16}
          bold
          className={classNames(
            type === "default" ? "text-dark" : "text-white",
            classNameTitle
          )}
        >
          {children}
        </BaseText>
      ) : (
        children
      )}
    </button>
  );
}
