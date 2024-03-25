import { BaseText } from "../../../components";
import { Radio, RadioChangeEvent } from 'antd';
import { useState } from "react";
import { classNames } from "../../../utils/common";
import { useTranslation } from "react-i18next";

interface IChatMessageFuncPart1 {
    title: string;
    value: string;
    options: {
        label: string;
        value: string | number;
    }[];
    onClick: (selectedValue: string) => void;
}

export const ChatMessageFuncPart1 = (props: IChatMessageFuncPart1) => {
    const { t } = useTranslation();
    const { title, value, onClick, options } = props;
    const [selectedValue, setSelectedValue] = useState(value);
    const onChange = (e: RadioChangeEvent) => {
        const newValue = e.target.value.toString();
        setSelectedValue(newValue);
        onClick(newValue); // Pass the selected value to the onClick handler
    };
    return (
        <div className="flex flex-col gap-2">
            <BaseText locale size={16} bold>
                {title}
            </BaseText>
            <div className="flex">
                <Radio.Group name="radiogroup" onChange={onChange} value={selectedValue} className="flex w-full">
                    {
                        options.map((option, index) => (
                            <Radio key={index} value={option.value} className={'flex-1 text-[16px] font-medium'}>{t(option.label)}</Radio>
                        ))
                    }
                </Radio.Group>
            </div>
        </div>
    );
};
