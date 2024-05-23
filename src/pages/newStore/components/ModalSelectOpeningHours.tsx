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
import { Checkbox, Tag, TimePicker, TimePickerProps, TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import BaseButton from '../../../components/baseButton';
import { CheckOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Weekdays } from '../../../utils/constants';

const holidays: {
    name: string | null
    id: number
    child?: { name: string | null; id: number }[]
}[] = [
        { name: '새해 첫날', id: 1 },
        {
            name: null,
            id: 2,
            child: [
                { name: '연휴', id: 21 },
                { name: '설날', id: 22 },
                { name: '연휴', id: 23 },
            ],
        },
        { name: '삼일절', id: 3 },
        { name: '어린이날', id: 4 },
        { name: '부처님 오신', id: 5 },
        { name: '현충일', id: 6 },
        { name: '광복절', id: 7 },
        {
            name: null,
            id: 8,
            child: [
                { name: '연휴', id: 81 },
                { name: '추석', id: 82 },
                { name: '연휴', id: 83 },
            ],
        },
        { name: '개천절', id: 9 },
        { name: '한글날', id: 10 },
        { name: '성탄절', id: 11 },
    ]
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
    const [isAlwaysOpen, setIsAlwaysOpen] = useState(false)

    const [listDaySelected, setListDaySelected] = useState<any[]>([])
    console.log('listDaySelected', listDaySelected);
    const [listHolidaySelected, setListHolidaySelected] = useState<number[]>([])
    console.log('listHolidaySelected', listHolidaySelected);


    const handleSelectedDay = (id: string) => {
        if (listDaySelected.includes(id)) {
            setListDaySelected(listDaySelected.filter((day) => day !== id))
        } else {
            setListDaySelected([...listDaySelected, id])
        }
    }

    const handleSelectedHoliday = (id: number) => {
        if (listHolidaySelected.includes(id)) {
            setListHolidaySelected(listHolidaySelected.filter((day) => day !== id))
        } else {
            setListHolidaySelected([...listHolidaySelected, id])
        }
    }

    const [optionChecked, setOptionChecked] = useState<number | null>(null);

    const handleOptionChange = (option: number) => {
        if (option === optionChecked) {
            setOptionChecked(null); // Uncheck the option if it's already checked
            setListHolidaySelected([]);
        } else {
            setOptionChecked(option);
        }
    };

    const [listBreakTime, setListBreakTime] = useState<{}[]>([]);
    const [listBreakTimeWeekend, setListBreakTimeWeekend] = useState<{}[]>([]);

    const handleAddTime = () => {
        setListBreakTime([...listBreakTime, {}]);
    };

    const handleAddTimeWeekend = () => {
        setListBreakTimeWeekend([...listBreakTimeWeekend, {}]);
    };


    const handleRemoveTime = (indexToRemove: number) => {
        setListBreakTime(listBreakTime.filter((item, index) => index !== indexToRemove));
    };

    const handleRemoveTimeWeekend = (indexToRemove: number) => {
        setListBreakTimeWeekend(listBreakTimeWeekend.filter((item, index) => index !== indexToRemove));
    };

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

    const handleChangeOpeningHours: TimeRangePickerProps['onChange'] = (time, timeString) => {
        console.log('hihi', timeString);
    };

    useEffect(() => {
        if (data) {
            const dataEditConvert = data && data.split('~');
            dataEditConvert && setDataOpening(dataEditConvert[0]);
            dataEditConvert && setDataClosing(dataEditConvert[1]);
        }
    }, [data]);

    useEffect(() => {
        console.log('typePickTime', typePickTime);
        setListBreakTime([]);
        setListBreakTimeWeekend([]);

    }, [typePickTime]);

    useEffect(() => {
        if (optionChecked === 1) {
            setListHolidaySelected([22, 82])
        } else if (optionChecked === 2) {
            let ids: number[] = [];
            holidays.forEach(holiday => {
                ids.push(holiday.id);
                if (holiday.child) {
                    holiday.child.forEach(child => {
                        ids.push(child.id);
                    });
                }
            });
            setListHolidaySelected(ids);
        } else {
            setListHolidaySelected([])
        }
    }, [optionChecked])

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
                        if (isSelected) {
                            setIsSelected(!isSelected)
                            setListDaySelected([])
                        }
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
                        if (!isSelected) {
                            setIsSelected(!isSelected)
                            const allDay = Weekdays.map((item) => item.id)
                            setListDaySelected(allDay)
                        }
                    }}
                    className={classNames(
                        'flex items-center justify-center flex-1 py-2 border rounded-lg',
                        isSelected ? 'bg-dayBreakBlue50 border-primary' : ''
                    )}
                >
                    <BaseText locale bold className={classNames(isSelected ? 'text-primary' : '')}>휴무일이 없어요</BaseText>
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
                                <div className='flex flex-wrap gap-2'>
                                    {Weekdays.map((item, index) => {
                                        return (
                                            <div
                                                key={item?.id}
                                                onClick={() => handleSelectedDay(item.id)}
                                                className={classNames(
                                                    'px-4 py-2 rounded-full cursor-pointer bg-darkNight50 border',
                                                    listDaySelected.includes(item.id) ? 'border-primary bg-dayBreakBlue50' : '')}
                                            >
                                                <BaseText medium locale color={listDaySelected.includes(item.id) ? "text-primary" : ''}>{item.name}</BaseText>
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
                                    <Checkbox checked={optionChecked === 1} onChange={() => handleOptionChange(1)}>
                                        <BaseText medium locale>설,추석 당일만 휴무</BaseText>
                                    </Checkbox>
                                    <Checkbox checked={optionChecked === 2} onChange={() => handleOptionChange(2)}>
                                        <BaseText medium locale>전체 휴무</BaseText>
                                    </Checkbox>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {holidays.map((holiday, index) => {
                                    if (holiday.child) {
                                        return (
                                            <div key={index} className='flex border rounded-md cursor-pointer bg-darkNight50'>
                                                {holiday.child.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            if (optionChecked === null) {
                                                                handleSelectedHoliday(item.id)
                                                            }
                                                        }}
                                                        className={
                                                            classNames(
                                                                "p-2 text-center ", index == 1 ? "border-x" : '',
                                                                listHolidaySelected.includes(item.id) ? 'bg-dayBreakBlue50' : ''
                                                            )
                                                        }
                                                    >
                                                        <BaseText locale color={listHolidaySelected.includes(item.id) ? "text-primary" : ''}>{item.name}</BaseText>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <Tag
                                                key={index}
                                                onClick={() => {
                                                    if (optionChecked === null) {
                                                        handleSelectedHoliday(holiday.id)
                                                    }
                                                }}
                                                className={
                                                    classNames(
                                                        "p-2 text-center cursor-pointer bg-darkNight50",
                                                        listHolidaySelected.includes(holiday.id) ? 'bg-dayBreakBlue50' : ''
                                                    )
                                                }>
                                                <BaseText locale color={listHolidaySelected.includes(holiday.id) ? "text-primary" : ''}>{holiday.name}</BaseText>
                                            </Tag>
                                        )
                                    }
                                })}
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 mb-4'>
                            <BaseText bold locale>영업 시간을 알려주세요.</BaseText>
                            <div className='flex gap-4 mb-4'>
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
                                    <div className='flex gap-2 mb-2'>
                                        <div className='flex items-center flex-1 gap-2'>
                                            <BaseText bold locale>영업시간</BaseText>
                                            <TimePicker.RangePicker
                                                format='HH:mm'
                                                className='flex-1'
                                                onChange={handleChangeOpeningHours}
                                            />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setIsAlwaysOpen(!isAlwaysOpen)
                                            }}
                                            className={classNames(
                                                'flex items-center justify-center p-2 flex-1 border rounded-lg cursor-pointer',
                                                !isAlwaysOpen ? 'bg-dayBreakBlue50 border-primary' : ''
                                            )}
                                        >
                                            <BaseText locale bold className={classNames(!isAlwaysOpen ? 'text-primary' : '')}>
                                                24시간 운영해요.
                                            </BaseText>
                                            <CheckOutlined
                                                className={classNames(
                                                    'w-6 h-6',
                                                    !isAlwaysOpen ? 'text-primary' : ''
                                                )}
                                            />
                                        </div>

                                    </div>

                                    <div className='flex items-end gap-3'>
                                        {listBreakTime.length > 0 ? (
                                            <>
                                                <div className='flex flex-col items-center gap-4'>
                                                    {listBreakTime.map((item, index) => (
                                                        <div key={index} className='relative flex flex-1 gap-2'>
                                                            <div className='flex items-center flex-1 gap-2'>
                                                                {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                                                                <BaseText bold locale>휴게시간</BaseText>
                                                                <TimePicker.RangePicker
                                                                    format='HH:mm'
                                                                    className='flex-1'
                                                                />
                                                                <div
                                                                    onClick={() => handleRemoveTime(index)}
                                                                    className='absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer'
                                                                    style={{
                                                                        top: '-10px',
                                                                        right: '-10px'
                                                                    }}
                                                                >
                                                                    <img src={Images.trashred} alt='close' className='w-4 h-4' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div
                                                    onClick={handleAddTime}
                                                    className='flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary'
                                                >
                                                    <PlusOutlined className='w-6 h-6 text-primary' />
                                                    <BaseText locale bold className='text-primary'>
                                                        시간 추가
                                                    </BaseText>
                                                </div>
                                            </>
                                        ) : (
                                            <div className='flex items-center gap-2'>
                                                <BaseText bold locale>공휴일 중 휴무일이 있나요?</BaseText>
                                                <div
                                                    onClick={handleAddTime}
                                                    className='flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary'
                                                >
                                                    <BaseText locale bold className='text-primary'>
                                                        설정하기
                                                    </BaseText>
                                                    <CheckOutlined
                                                        className='w-6 h-6 text-primary'
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='pb-4 border-b'>
                                        <div className='flex gap-2 mb-4'>
                                            <div className='flex items-center gap-2'>
                                                <BaseText bold locale>평일(월~금)</BaseText>
                                                <TimePicker.RangePicker
                                                    format='HH:mm'
                                                    className='flex-1'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-end gap-3'>
                                            {listBreakTime.length > 0 ? (
                                                <>
                                                    <div className='flex flex-col items-center gap-4'>
                                                        {listBreakTime.map((item, index) => (
                                                            <div key={index} className='relative flex flex-1 gap-2'>
                                                                <div className='flex items-center flex-1 gap-2'>
                                                                    {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                                                                    <BaseText bold locale>휴게시간</BaseText>
                                                                    <TimePicker.RangePicker
                                                                        format='HH:mm'
                                                                        className='flex-1'
                                                                    />
                                                                    <div
                                                                        onClick={() => handleRemoveTime(index)}
                                                                        className='absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer'
                                                                        style={{
                                                                            top: '-10px',
                                                                            right: '-10px'
                                                                        }}
                                                                    >
                                                                        <img src={Images.trashred} alt='close' className='w-4 h-4' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div
                                                        onClick={handleAddTime}
                                                        className='flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <PlusOutlined className='w-6 h-6 text-primary' />
                                                        <BaseText locale bold className='text-primary'>
                                                            시간 추가
                                                        </BaseText>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='flex items-center gap-2'>
                                                    <BaseText bold locale>공휴일 중 휴무일이 있나요?</BaseText>
                                                    <div
                                                        onClick={handleAddTime}
                                                        className='flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <BaseText locale bold className='text-primary'>
                                                            설정하기
                                                        </BaseText>
                                                        <CheckOutlined
                                                            className='w-6 h-6 text-primary'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='pt-4'>
                                        <div className='flex gap-2 mb-2'>
                                            <div className='flex items-center gap-2'>
                                                <BaseText bold locale>주말</BaseText>
                                                <TimePicker.RangePicker
                                                    format='HH:mm'
                                                    className='flex-1'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-end gap-3'>
                                            {listBreakTimeWeekend.length > 0 ? (
                                                <>
                                                    <div className='flex flex-col items-center gap-4'>
                                                        {listBreakTimeWeekend.map((item, index) => (
                                                            <div key={index} className='relative flex flex-1 gap-2'>
                                                                <div className='flex items-center flex-1 gap-2'>
                                                                    {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                                                                    <BaseText bold locale>휴게시간</BaseText>
                                                                    <TimePicker.RangePicker
                                                                        format='HH:mm'
                                                                        className='flex-1'
                                                                    />
                                                                    <div
                                                                        onClick={() => handleRemoveTimeWeekend(index)}
                                                                        className='absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer'
                                                                        style={{
                                                                            top: '-10px',
                                                                            right: '-10px'
                                                                        }}
                                                                    >
                                                                        <img src={Images.trashred} alt='close' className='w-4 h-4' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div
                                                        onClick={handleAddTimeWeekend}
                                                        className='flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <PlusOutlined className='w-6 h-6 text-primary' />
                                                        <BaseText locale bold className='text-primary'>
                                                            시간 추가
                                                        </BaseText>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='flex items-center gap-2'>
                                                    <BaseText bold locale>공휴일 중 휴무일이 있나요?</BaseText>
                                                    <div
                                                        onClick={handleAddTimeWeekend}
                                                        className='flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <BaseText locale bold className='text-primary'>
                                                            설정하기
                                                        </BaseText>
                                                        <CheckOutlined
                                                            className='w-6 h-6 text-primary'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col gap-1 mb-4'>
                            <BaseText bold locale>영업 시간을 알려주세요.</BaseText>
                            <div className='flex gap-4 mb-4'>
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
                                    <div className='flex gap-2 mb-2'>
                                        <div className='flex items-center flex-1 gap-2'>
                                            <BaseText bold locale>영업시간</BaseText>
                                            <TimePicker.RangePicker
                                                format='HH:mm'
                                                className='flex-1'
                                            />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setIsAlwaysOpen(!isAlwaysOpen)
                                            }}
                                            className={classNames(
                                                'flex items-center justify-center p-2 flex-1 border rounded-lg cursor-pointer',
                                                !isAlwaysOpen ? 'bg-dayBreakBlue50 border-primary' : ''
                                            )}
                                        >
                                            <BaseText locale bold className={classNames(!isAlwaysOpen ? 'text-primary' : '')}>
                                                24시간 운영해요.
                                            </BaseText>
                                            <CheckOutlined
                                                className={classNames(
                                                    'w-6 h-6',
                                                    !isAlwaysOpen ? 'text-primary' : ''
                                                )}
                                            />
                                        </div>

                                    </div>

                                    <div className='flex items-end gap-3'>
                                        {listBreakTime.length > 0 ? (
                                            <>
                                                <div className='flex flex-col items-center gap-4'>
                                                    {listBreakTime.map((item, index) => (
                                                        <div key={index} className='relative flex flex-1 gap-2'>
                                                            <div className='flex items-center flex-1 gap-2'>
                                                                {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                                                                <BaseText bold locale>휴게시간</BaseText>
                                                                <TimePicker.RangePicker
                                                                    format='HH:mm'
                                                                    className='flex-1'
                                                                />
                                                                <div
                                                                    onClick={() => handleRemoveTime(index)}
                                                                    className='absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer'
                                                                    style={{
                                                                        top: '-10px',
                                                                        right: '-10px'
                                                                    }}
                                                                >
                                                                    <img src={Images.trashred} alt='close' className='w-4 h-4' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div
                                                    onClick={handleAddTime}
                                                    className='flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary'
                                                >
                                                    <PlusOutlined className='w-6 h-6 text-primary' />
                                                    <BaseText locale bold className='text-primary'>
                                                        시간 추가
                                                    </BaseText>
                                                </div>
                                            </>
                                        ) : (
                                            <div className='flex items-center gap-2'>
                                                <BaseText bold locale>공휴일 중 휴무일이 있나요?</BaseText>
                                                <div
                                                    onClick={handleAddTime}
                                                    className='flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary'
                                                >
                                                    <BaseText locale bold className='text-primary'>
                                                        설정하기
                                                    </BaseText>
                                                    <CheckOutlined
                                                        className='w-6 h-6 text-primary'
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='pb-4 border-b'>
                                        <div className='flex gap-2 mb-4'>
                                            <div className='flex items-center gap-2'>
                                                <BaseText bold locale>평일(월~금)</BaseText>
                                                <TimePicker.RangePicker
                                                    format='HH:mm'
                                                    className='flex-1'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-end gap-3'>
                                            {listBreakTime.length > 0 ? (
                                                <>
                                                    <div className='flex flex-col items-center gap-4'>
                                                        {listBreakTime.map((item, index) => (
                                                            <div key={index} className='relative flex flex-1 gap-2'>
                                                                <div className='flex items-center flex-1 gap-2'>
                                                                    {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                                                                    <BaseText bold locale>휴게시간</BaseText>
                                                                    <TimePicker.RangePicker
                                                                        format='HH:mm'
                                                                        className='flex-1'
                                                                    />
                                                                    <div
                                                                        onClick={() => handleRemoveTime(index)}
                                                                        className='absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer'
                                                                        style={{
                                                                            top: '-10px',
                                                                            right: '-10px'
                                                                        }}
                                                                    >
                                                                        <img src={Images.trashred} alt='close' className='w-4 h-4' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div
                                                        onClick={handleAddTime}
                                                        className='flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <PlusOutlined className='w-6 h-6 text-primary' />
                                                        <BaseText locale bold className='text-primary'>
                                                            시간 추가
                                                        </BaseText>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='flex items-center gap-2'>
                                                    <BaseText bold locale>공휴일 중 휴무일이 있나요?</BaseText>
                                                    <div
                                                        onClick={handleAddTime}
                                                        className='flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <BaseText locale bold className='text-primary'>
                                                            설정하기
                                                        </BaseText>
                                                        <CheckOutlined
                                                            className='w-6 h-6 text-primary'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='pt-4'>
                                        <div className='flex gap-2 mb-2'>
                                            <div className='flex items-center gap-2'>
                                                <BaseText bold locale>주말</BaseText>
                                                <TimePicker.RangePicker
                                                    format='HH:mm'
                                                    className='flex-1'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-end gap-3'>
                                            {listBreakTimeWeekend.length > 0 ? (
                                                <>
                                                    <div className='flex flex-col items-center gap-4'>
                                                        {listBreakTimeWeekend.map((item, index) => (
                                                            <div key={index} className='relative flex flex-1 gap-2'>
                                                                <div className='flex items-center flex-1 gap-2'>
                                                                    {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                                                                    <BaseText bold locale>휴게시간</BaseText>
                                                                    <TimePicker.RangePicker
                                                                        format='HH:mm'
                                                                        className='flex-1'
                                                                    />
                                                                    <div
                                                                        onClick={() => handleRemoveTimeWeekend(index)}
                                                                        className='absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer'
                                                                        style={{
                                                                            top: '-10px',
                                                                            right: '-10px'
                                                                        }}
                                                                    >
                                                                        <img src={Images.trashred} alt='close' className='w-4 h-4' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div
                                                        onClick={handleAddTimeWeekend}
                                                        className='flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <PlusOutlined className='w-6 h-6 text-primary' />
                                                        <BaseText locale bold className='text-primary'>
                                                            시간 추가
                                                        </BaseText>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='flex items-center gap-2'>
                                                    <BaseText bold locale>공휴일 중 휴무일이 있나요?</BaseText>
                                                    <div
                                                        onClick={handleAddTimeWeekend}
                                                        className='flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary'
                                                    >
                                                        <BaseText locale bold className='text-primary'>
                                                            설정하기
                                                        </BaseText>
                                                        <CheckOutlined
                                                            className='w-6 h-6 text-primary'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        </div>
                    </>
                )
            }
        </BaseModal >
    )
}