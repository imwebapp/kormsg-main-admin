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
}

export default function CustomButton(
  props: PropsWithChildren<CustomButtonProps>
) {
  const { locale, children, bold, icon, medium, className, ...newProps } =
    props;
  const { t } = useTranslation();

  return (
    <Button className={classNames("font-bold", className || "")} {...newProps}>
      <Space>
        {icon && <span>{icon}</span>}
        {locale ? t(children as string) : children}
      </Space>
    </Button>
  );
}
