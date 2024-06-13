import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Segmented } from 'antd';
import { RegionSetting } from './RegionSetting';
import { SubwaySetting } from './SubwaySetting';

export const RegionAndSubwaySetting = () => {
    const { t } = useTranslation();
    const [optionTime, setOptionTime] = useState<string>("지역 설정");
    return (
        <div className='flex flex-col gap-2 px-6'>
            <Segmented<string>
                className="flex-1 bg-red-500"
                options={[
                    {
                        label: t('지역 설정'),
                        value: '지역 설정'
                    },
                    {
                        label: t('지하철 설정'),
                        value: '지하철 설정'
                    }
                ]}
                onChange={(value) => {
                    setOptionTime(value);
                }}
                block
            />
            <div>
                {
                    optionTime === "지역 설정" ? (
                        <RegionSetting />
                    ) : (
                        <SubwaySetting />
                    )
                }
            </div>
        </div>
    );
};