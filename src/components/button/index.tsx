import React, { ReactNode, PropsWithChildren } from "react";
import { Button, ButtonProps, Space } from "antd";
import { useTranslation } from "react-i18next";
import { classNames } from "../../utils/common";
import "./styles.css";
interface CustomButtonProps extends ButtonProps {
  children?: ReactNode;
  locale?: boolean;
  icon?: ReactNode;
  bold?: boolean;
  medium?: boolean;
  className?: string; // for tailwindcss
  url?: string;
  primary?: boolean;
}

export default function CustomButton(
  props: PropsWithChildren<CustomButtonProps>
) {
  const {
    locale,
    children,
    bold,
    icon,
    medium,
    className,
    url,
    primary,
    ...newProps
  } = props;
  const { t } = useTranslation();

  return (
    <Button
      className={classNames("font-bold", className || "")}
      {...newProps}
      type={primary ? "primary" : "default"}
    >
      <Space className={classNames("justify-center  items-center")}>
        {icon && <span>{icon}</span>}
        {url && (
          <img
            src={url}
            className={"w-4 h-4 justify-center items-center mt-1"}
          />
        )}
        {locale ? t(children as string) : children}
      </Space>
    </Button>
  );
}
