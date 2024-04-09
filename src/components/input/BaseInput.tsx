import React, { ReactNode, useEffect, useState } from 'react';
import { classNames } from '../../utils/common';
import BaseText from '../text';
import Images from "../../assets/gen";
import { useTranslation } from 'react-i18next';
import { InputProps } from 'antd';

export interface IProps {
  title?: string;
  titleSize?: number;
  required?: boolean;
  isError?: boolean | string;
  textArea?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | any) => void;
  onBlur?: (value?: string | any) => void;
  onFocus?: () => void;
  onSave?: (value?: string | any) => void;
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
  widgetRight?: ReactNode;
  iconRightInactive?: ReactNode | string;
  rows?: number;
};

export const BaseInput = (props: IProps) => {
  const { title, titleSize, required, value, defaultValue, textArea, rows, onChange, onBlur, onFocus, className, type, disabled, styleTitle, styleInputContainer, styleInput, iconLeft, widgetRight, iconRight, iconLeftInactive, iconRightInactive, isError, placeholder, autoFocus, onSave, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  const handleFocus = () => {
    onFocus && onFocus();
    setIsFocused(true);
  };

  const handleBlur = (event: any) => {
    onBlur && onBlur(event.target.value)
    setIsFocused(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (onSave) {
        onSave(event.target.value);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    onChange && onChange(event.target.value);
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
        {textArea ? (
          <textarea
            className={classNames(
              'w-full bg-darkNight50 focus:outline-none font-bold text-dark',
              isError ? ' bg-dustRed50' : '',
              styleInput || ""
            )}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={t(placeholder || '')}
            autoFocus={autoFocus}
            onKeyDown={handleKeyDown}
            rows={rows || 5}
            {...rest}
          />
        ) : <input
          className={classNames(
            'w-full bg-darkNight50 focus:outline-none font-bold text-dark',
            isError ? ' bg-dustRed50' : '',
            styleInput || ""
          )}
          type={type || "text"}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={t(placeholder || '')}
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
          {...rest}
        />}
        {typeof iconRight === 'string' ? (
          <img src={iconRight || Images.emailIconActive} className={classNames('w-6 h-6 ml-3')} />
        ) : iconRight}
        {widgetRight}
      </div>
      {isError && (
        <BaseText locale size={12} className=" text-dustRed500">
          {isError}
        </BaseText>
      )}
    </div>

  );
};
