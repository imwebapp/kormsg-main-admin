import React from 'react';
import { BaseInput, IProps as BaseInputProps } from './BaseInput';
import { handleConvertCurrency } from '../../utils/common';

interface CurrencyInputProps extends BaseInputProps {
}

export const CurrencyInput = (props: CurrencyInputProps) => {
  const formatCurrency = (value: string | number): string => {
    console.log('value formatCurrency', value);
    const stringValue = typeof value === 'number' ? handleConvertCurrency(value) : value;
    return stringValue;
  };

  const handleChange = (value: string): void => {
    const newValue = value.replace(/[^0-9.]/g, '');
    props.onChange && props.onChange(newValue);
  };

  return (
    <BaseInput
      {...props}
      value={formatCurrency(props.value || '')}
      onChange={handleChange}
    />
  );
};
