import { CheckOutlined } from '@ant-design/icons';
import { ConfigProvider, Select, SelectProps } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { classNames } from '../../utils/common';
import BaseText from '../text';
import { useTranslation } from 'react-i18next';
import { SELECT_ALL } from '../../utils/constants';

interface InputProps extends SelectProps {
    title?: string;
    titleSize?: number;
    required?: boolean;
    isError?: boolean;
    value?: any;
    defaultValue?: any;
    size?: 'large' | 'middle' | 'small';
    textInputSize?: number;
    onChange: (value: any) => void;
    options: { value: string | number, label: any, disabled?: boolean }[];
    disabled?: boolean;
    className?: string; // for tailwindcss
    styleTitle?: string;
    styleInputContainer?: string;
    styleInput?: string;
    customizeStyleSelect?: any;
    iconLeft?: ReactNode;
    iconLeftInactive?: ReactNode;
    iconRight?: ReactNode;
    iconRightInactive?: ReactNode;
    placeholder?: string;
    multiple?: boolean;
    allowClear?: boolean;
}

export const BaseInputSelect = (props: InputProps) => {
    const { title, titleSize, textInputSize, required, value, defaultValue, onChange, className, size, allowClear, options, multiple, disabled, customizeStyleSelect, styleTitle, styleInputContainer, styleInput, iconLeft, iconRight, iconLeftInactive, iconRightInactive, isError, placeholder, ...rest } = props;
    const [isFocused, setIsFocused] = useState(false);
    const { t } = useTranslation();
    const [valueSelect, setValueSelect] = useState<any>(value);
    const allValue = options.filter((item) => item.value !== SELECT_ALL).map((item) => item.value);

    const handleChange = (newValue: any) => {
        if (multiple && Array.isArray(newValue) && newValue.length > 0 && !!options.find((item) => item.value === SELECT_ALL)) {
            if ((newValue[newValue.length - 1] === SELECT_ALL)) {
                setValueSelect([SELECT_ALL]);
                onChange(allValue);
            } else if (newValue.includes(SELECT_ALL)) {
                setValueSelect(newValue.filter((item) => item !== SELECT_ALL));
                onChange(newValue.filter((item) => item !== SELECT_ALL));
            } else if (!newValue.includes(SELECT_ALL) && newValue.length === options.length - 1) {
                setValueSelect([SELECT_ALL]);
                onChange(allValue);
            } else {
                setValueSelect(newValue);
                onChange(newValue);
            }
        } else {
            setValueSelect(newValue);
            onChange(newValue);
        }
    };

    useEffect(() => {
        if (multiple && Array.isArray(defaultValue) && defaultValue.length > 0) {
            if (!defaultValue.includes(SELECT_ALL) && defaultValue.length === options.length - 1) {
                setValueSelect([SELECT_ALL]);
            } else {
                setValueSelect(defaultValue);
            }
        } else {
            setValueSelect(defaultValue);
        }
    }, [defaultValue, options])

    useEffect(() => {
        if (value)
            setValueSelect(value);
        else
            setValueSelect(undefined);
    }, [value]);

    return (
        <div className={classNames('flex flex-col min-w-fit', className)}>
            {title && (
                <div className={classNames('flex gap-1')}>
                    <BaseText locale bold size={titleSize} className={classNames('mb-2', styleTitle || '')}>
                        {title}
                    </BaseText>
                    {required && (<span className="text-red-500">*</span>)}
                </div>
            )}
            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            selectorBg: isError ? '#FFF1F0' : '#F6F6F6',
                            colorBorder: isError ? '#FF4D4F' : '#F6F6F6',
                            colorTextPlaceholder: '#141414',
                            colorText: '#141414',
                            optionSelectedBg: '#ffffff',
                            optionSelectedColor: '#0866FF',
                            algorithm: true, // Enable algorithm
                            ...customizeStyleSelect
                        },
                    },
                }}
            >
                <Select
                    className={styleInputContainer}
                    value={valueSelect}
                    defaultValue={defaultValue}
                    placeholder={t(placeholder || '')}
                    onChange={handleChange}
                    disabled={disabled}
                    options={options}
                    size={size || 'large'}
                    allowClear={allowClear != undefined ? allowClear : true}
                    mode={multiple ? 'multiple' : undefined}
                    optionRender={(node: any) => {
                        const check = multiple ? (Array.isArray(valueSelect) && valueSelect.includes(node.value)) : (valueSelect === node.value || (!valueSelect && node.value === defaultValue));
                        return (
                            <div className={classNames('flex flex-row items-center ')}>
                                {typeof node.label === 'string' ? <BaseText locale size={textInputSize || 16} medium className={classNames(
                                    "w-full",
                                    check ? 'text-blue' : "text-darkNight500", styleInput
                                )} >
                                    {node.label}
                                </BaseText> : node.label}
                                {
                                    !multiple && (valueSelect === node.value || (!valueSelect && node.value === defaultValue)) && <CheckOutlined style={{ marginLeft: '8px' }} />
                                }
                            </div>
                        );
                    }}
                    {...rest}
                />
            </ConfigProvider>
        </div>
    );
};
