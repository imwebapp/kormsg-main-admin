import React, { ReactNode, useState } from 'react';
import { classNames } from '../../utils/common';
import BaseText from '../text';
import Images from "../../assets/gen";

type InputProps = {
  title?: string;
  titleSize?: number;
  required?: boolean;
  isError?: boolean;
  value: string | number;
  onChange: (value: string) => void;
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

export const BaseInput = (props: InputProps) => {
  const { title, titleSize, required, value, onChange, className, type, disabled, styleTitle, styleInputContainer, styleInput, iconLeft, iconRight, iconLeftInactive, iconRightInactive, isError, placeholder } = props;
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
          placeholder={placeholder}
        />
        {iconRight && (
          <img src={iconRight || Images.emailIconActive} className={classNames('w-6 h-6 ml-3')} />
        )}
      </div>
    </div>

  );
};
