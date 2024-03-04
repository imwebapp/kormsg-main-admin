import { CheckOutlined } from '@ant-design/icons';
import { ConfigProvider, Select, SelectProps } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { classNames } from '../../utils/common';
import BaseText from '../text';
import { useTranslation } from 'react-i18next';

interface InputProps extends SelectProps {
    title?: string;
    titleSize?: number;
    required?: boolean;
    isError?: boolean;
    value?: string;
    size?: 'large' | 'middle' | 'small';
    onChange: (value: string) => void;
    options: { value: string | number, label: string, disabled?: boolean }[];
    disabled?: boolean;
    className?: string; // for tailwindcss
    styleTitle?: string;
    styleInputContainer?: string;
    styleInput?: string;
    iconLeft?: ReactNode;
    iconLeftInactive?: ReactNode;
    iconRight?: ReactNode;
    iconRightInactive?: ReactNode;
    placeholder?: string;
    multiple?: boolean;
};

export const BaseInputSelect = (props: InputProps) => {
    const { title, titleSize, required, value, onChange, className, size, options, multiple, disabled, styleTitle, styleInputContainer, styleInput, iconLeft, iconRight, iconLeftInactive, iconRightInactive, isError, placeholder, ...rest } = props;
    const [isFocused, setIsFocused] = useState(false);
    const { t } = useTranslation();
    const [valueSelect, setValueSelect] = useState<string | undefined>(value);

    console.log('valueSelect', valueSelect);

    const handleChange = (value: string) => {
        setValueSelect(value);
        onChange(value);
    };
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
                        },
                    },
                }}
            >
                <Select
                    value={valueSelect}
                    placeholder={t(placeholder || '')}
                    onChange={handleChange}
                    disabled={disabled}
                    options={options}
                    size={size || 'large'}
                    allowClear
                    mode={multiple ? 'multiple' : undefined}
                    optionRender={(node) => {
                        const check = multiple ? (Array.isArray(valueSelect) && valueSelect.includes(node.value)) : valueSelect === node.value;
                        return (
                            <div className={classNames('flex flex-row items-center ')}>
                                <BaseText locale size={16} medium className={classNames(
                                    "w-full",
                                    check ? 'text-blue' : "text-darkNight500"
                                )}>
                                    {node.label}
                                </BaseText>
                                {
                                    valueSelect === node.value && <CheckOutlined style={{ marginLeft: '8px' }} />
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
