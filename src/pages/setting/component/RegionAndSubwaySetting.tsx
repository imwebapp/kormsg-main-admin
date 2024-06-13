import React from 'react';
import { BaseSegmented } from '../../../components';
import { useTranslation } from 'react-i18next';
import { Segmented } from 'antd';

export const RegionAndSubwaySetting = () => {
    const { t } = useTranslation();
    const [optionTime, setOptionTime] = React.useState<string>(t("지역 설정"));
    return (
        <div className='flex flex-col gap-2 px-6'>
            <Segmented<string>
                className="flex-1 bg-red-500"
                options={[t("지역 설정"), t("지하철 설정")]}
                onChange={(value) => {
                    console.log(value); // string
                    setOptionTime(value);
                }}
            />
            <div>
                {
                    optionTime === t("지역 설정") ? (
                        <div className="flex-1 bg-gray-500">
                            지역 설정
                        </div>
                    ) : (
                        <div className="flex-1 bg-blue-500">
                            지하철 설정
                        </div>
                    )
                }
            </div>
        </div>
    );
};