import React, { ReactNode, PropsWithChildren } from "react";
import { Button, ButtonProps, Segmented, Space } from "antd";
import { useTranslation } from "react-i18next";
import { classNames } from "../../utils/common";
import "./styles.css";

interface CustomButtonProps extends ButtonProps {
  options: Array<string>;
  onChange: (value: any) => void;
  className?: string; // for tailwindcss
}

export default function BaseSegmented(props: CustomButtonProps) {
  const { className, options, onChange } = props;
  const { t } = useTranslation();

  return (
    <Segmented<string>
      rootClassName={className}
      options={options}
      defaultValue={options[1]}
      onChange={onChange}
    />
  );
}
