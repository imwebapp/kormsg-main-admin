import React, { ReactNode, useState } from 'react';
import { classNames } from '../../utils/common';
import BaseText from '../text';
import Images from "../../assets/gen";
import { useTranslation } from 'react-i18next';
import { InputProps } from 'antd';

interface IProps {
  title?: string;
  titleSize?: number;
  required?: boolean;
  isError?: boolean;
  value: string | number;
  onChange: (value: string | any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSave?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
  type?: "text" | "password" | "number" | "email";
  disabled?: boolean;
  className?: string; // for tailwindcss
  styleTitle?: string;
  styleInputContainer?: string;
  styleInput?: string;
  iconLeft?: ReactNode | string;
  iconLeftInactive?: ReactNode | string;
  iconRight?: ReactNode | string;
  iconRightInactive?: ReactNode | string;
};

export const BaseInput = (props: IProps) => {
  const { title, titleSize, required, value, onChange, onBlur, onFocus, className, type, disabled, styleTitle, styleInputContainer, styleInput, iconLeft, iconRight, iconLeftInactive, iconRightInactive, isError, placeholder, autoFocus, onSave, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const handleFocus = () => {
    onFocus && onFocus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    onBlur && onBlur()
    setIsFocused(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (onSave) {
        onSave();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      {title && (
        <div className={classNames('flex gap-1')}>
          <BaseText locale bold size={titleSize} className={classNames('mb-2', styleTitle || '')}>
            {title}
          </BaseText>
          {required && (<span className="text-red-500">*</span>)}
        </div>
      )}
      <div
        className={classNames('flex flex-row items-center rounded-lg px-3 py-3 bg-darkNight50 w-full ',
          isFocused ? 'border border-blue' : 'border border-darkNight50',
          isError ? 'border border-dustRed500 bg-dustRed50' : '',
          styleInputContainer || "")}
      >
        {iconLeft && (
          typeof iconLeft === 'string' ? (
            <img src={iconLeft || Images.emailIconActive} className={classNames('w-6 h-6 mr-3')} />
          ) : iconLeft
        )}
        <input
          className={classNames(
            'w-full bg-darkNight50 focus:outline-none font-bold text-dark',
            isError ? ' bg-dustRed50' : '',
            styleInput || ""
          )}
          type={type || "text"}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={t(placeholder || '')}
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
          {...rest}
        />
        {iconRight && (
          <img src={iconRight || Images.emailIconActive} className={classNames('w-6 h-6 ml-3')} />
        )}
      </div>
    </div>

  );
};
