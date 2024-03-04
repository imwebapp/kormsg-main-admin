import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "../../utils/common";

type CustomTextProps = {
  bold?: boolean;
  medium?: boolean;
  locale?: boolean;
  size?: number;
  className?: string; // for tailwindcss
  color?: string;
};

export default function BaseText(props: PropsWithChildren<CustomTextProps>) {
  const { bold, locale, size, medium, children, className, color, ...newProps } =
    props;
  const { t } = useTranslation();

  return (
    <span
      className={classNames(
        color ? color : "text-darkNight900",
        bold ? "font-bold" : "",
        medium ? "font-medium" : "",
        className || ""
      )}
      style={{ fontSize: size || 14 }}
    >
      {locale ? t(children as string) : children}
    </span>
  );
}
