import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modal/BaseModal'
import { BaseText, CustomButton } from '../../../components'
import { classNames, generateRandomID } from '../../../utils/common'
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';
import { BaseInputSelect } from '../../../components/input/BaseInputSelect';
import { ChatMessageFuncPart1 } from './ChatMessageFuncPart1';
import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Checkbox, Tag, TimePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';

const Weekdays = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' },
    { id: 'saturday', name: 'Saturday' },
    { id: 'sunday', name: 'Sunday' },
]

const holidays = [
    "새해 첫날", "연휴", "설날", "연휴", "삼일절", "어린이날",
    "부처님 오신", "현충일", "광복절", "연휴", "설날", "연휴",
    "개천절", "한글날", "성탄절"
];
interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: any) => void;
    data?: string;
}
export const ModalSelectOpeningHours = (props: IProps) => {
    const { isOpen, onClose, onSubmit, data } = props
    const [t] = useTranslation();
    const [dataOpening, setDataOpening] = useState('00:00')
    const [dataClosing, setDataClosing] = useState('00:00')
    const [isSelected, setIsSelected] = useState(false)
    const [typePickTime, setTypePickTime] = useState(false)

    console.log('dataOpening', dataOpening);


    const handleCloseModalOpeningHours = () => {
        setIsSelected(false)
        setTypePickTime(false)
        onClose && onClose();
    }
    const handleSubmitModalOpeningHours = () => {
        setIsSelected(false)
        setTypePickTime(false)
        const dataConvert = dataOpening + '~' + dataClosing;
        onSubmit && onSubmit(dataConvert);
    }

    const onChangeTime: TimePickerProps['onChange'] = (time, timeString) => {
        if (typeof timeString === 'string') {
            setDataOpening(timeString);
        }
    };
    const onChangeTimeClosing: TimePickerProps['onChange'] = (time, timeString) => {
        if (typeof timeString === 'string') {
            setDataClosing(timeString);
        }
    };

    useEffect(() => {
        if (data) {
            const dataEditConvert = data && data.split('~');
            dataEditConvert && setDataOpening(dataEditConvert[0]);
            dataEditConvert && setDataClosing(dataEditConvert[1]);
        }
    }, [data]);

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleCloseModalOpeningHours}
            onSubmit={handleSubmitModalOpeningHours}
            title="영업시간"
            disableSubmitBtn={!dataOpening || !dataClosing}
        >
            <div className='flex items-center gap-6 mb-4'>
                <div
                    onClick={() => {
                        if (isSelected) setIsSelected(!isSelected)
                    }}
                    className={classNames(
                        'flex items-center justify-center flex-1 py-2 border rounded-lg',
                        !isSelected ? 'bg-dayBreakBlue50 border-primary' : ''
                    )}
                >
                    <BaseText locale bold className={classNames(!isSelected ? 'text-primary' : '')}>휴무일이 있어요</BaseText>
                </div>
                <div
                    onClick={() => {
                        if (!isSelected) setIsSelected(!isSelected)
                    }}
                    className={classNames(
                        'flex items-center justify-center flex-1 py-2 border rounded-lg',
                        isSelected ? 'bg-dayBreakBlue50 border-primary' : ''
                    )}
                >
                    <BaseText locale bold className={classNames(isSelected ? 'text-primary' : '')}>휴무일이 있어요</BaseText>
                </div>
            </div>
            {
                !isSelected ? (
                    <>
                        <div className='flex flex-col gap-1 mb-4'>
                            <BaseText bold locale>정기 휴무일이 있나요?</BaseText>
                            <div className='flex gap-4'>
                                <div className='px-4 py-2 rounded-lg bg-darkNight50'>
                                    <BaseText medium locale>매주</BaseText>
                                </div>
                                <div className='flex gap-2'>
                                    {Weekdays.map((item, index) => {
                                        return (
                                            <div key={index} className='px-4 py-2 rounded-lg bg-darkNight50'>
                                                <BaseText medium locale>{item.name}</BaseText>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 mb-4'>
                            <BaseText bold locale>공휴일 중 휴무일이 있나요?</BaseText>
                            <div className='flex gap-4'>
                                <div className='flex gap-2'>
                                    <Checkbox >
                                        <BaseText medium locale>설,추석 당일만 휴무</BaseText>
                                    </Checkbox>
                                    <Checkbox >
                                        <BaseText medium locale>전체 휴무</BaseText>
                                    </Checkbox>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {holidays.map((holiday, index) => (
                                    <Tag key={index} className="p-2 text-center border-none bg-darkNight50">
                                        {holiday}
                                    </Tag>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 mb-4'>
                            <BaseText bold locale>영업 시간을 알려주세요.</BaseText>
                            <div className='flex gap-4'>
                                <div
                                    onClick={() => {
                                        if (typePickTime) setTypePickTime(!typePickTime)
                                    }}
                                    className={classNames(
                                        'flex items-center justify-center flex-1 py-2 border rounded-lg',
                                        !typePickTime ? 'bg-dayBreakBlue50 border-primary' : ''
                                    )}
                                >
                                    <BaseText locale bold className={classNames(!typePickTime ? 'text-primary' : '')}>모든 영업일이 같아요</BaseText>
                                </div>
                                <div
                                    onClick={() => {
                                        if (!typePickTime) setTypePickTime(!typePickTime)
                                    }}
                                    className={classNames(
                                        'flex items-center justify-center flex-1 py-2 border rounded-lg',
                                        typePickTime ? 'bg-dayBreakBlue50 border-primary' : ''
                                    )}
                                >
                                    <BaseText locale bold className={classNames(typePickTime ? 'text-primary' : '')}>평일/주말 달라요</BaseText>
                                </div>
                            </div>
                            {!typePickTime ? (
                                <>
                                    <div>
                                        <BaseText bold locale>영업시간</BaseText>
                                        <TimePicker.RangePicker
                                            format='HH:mm'
                                        />
                                    </div>
                                </>
                            ) : (
                                <>b</>
                            )

                            }
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </BaseModal >
    )
}