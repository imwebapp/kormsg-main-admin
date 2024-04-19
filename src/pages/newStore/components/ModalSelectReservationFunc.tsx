import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modal/BaseModal'
import { BaseText } from '../../../components'
import { classNames, generateRandomID } from '../../../utils/common'
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';
import { BaseInputSelect } from '../../../components/input/BaseInputSelect';
import { ChatMessageFuncPart1 } from './ChatMessageFuncPart1';
import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { LIST_REGION } from '../../../utils/constants';
import { CheckOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

const ListHours = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
]

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: any) => void;
    data?: any[];
}
export const ModalSelectReservationFunc = (props: IProps) => {
    const { isOpen, onClose, onSubmit, data = [] } = props
    const [t] = useTranslation();

    const [reservationSelectedList, setReservationSelectedList] = useState<string[]>([]);

    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [deselectAll, setDeselectAll] = useState<boolean>(false);

    const handleCloseModalReservationFunc = () => {
        onClose && onClose();
    }
    const handleSubmitModalReservationFunc = () => {
        const dataConvert = [
            {
                date: 'default',
                time: reservationSelectedList
            }
        ]
        onSubmit && onSubmit(dataConvert);
    }

    const handleSelectTime = (item: string) => () => {
        const isSelected = reservationSelectedList.includes(item);

        if (isSelected) {
            setReservationSelectedList(prevSelected => prevSelected.filter(selectedItem => selectedItem !== item));
        } else {
            setReservationSelectedList(prevSelected => [...prevSelected, item]);
        }
    }

    const handleSelectAll = () => {
        setReservationSelectedList(ListHours);
        setSelectAll(true);
        setDeselectAll(false);
    }

    const handleDeselectAll = () => {
        setReservationSelectedList([]);
        setDeselectAll(true);
        setSelectAll(false);
    }

    useEffect(() => {
        if (selectAll) {
            setSelectAll(false);
        }
        if (deselectAll) {
            setDeselectAll(false);
        }
    }, [reservationSelectedList]);

    useEffect(() => {
        if (data && data?.length > 0)
        setReservationSelectedList(data[0]?.time || []);
    }, [data]);

    return (
        <>
            <BaseModal
                isOpen={isOpen}
                onClose={handleCloseModalReservationFunc}
                onSubmit={handleSubmitModalReservationFunc}
                title="Reservation time"
                disableSubmitBtn={!(reservationSelectedList.length > 0)}
            >
                <div className='flex gap-3 mb-5'>
                    <Checkbox onChange={handleSelectAll} checked={selectAll}>{t('Select all')}</Checkbox>
                    <Checkbox onChange={handleDeselectAll} checked={deselectAll}>{t('Delete all')}</Checkbox>
                </div>
                <div className="grid grid-cols-4 gap-3 grid-flow-rows">
                    {
                        ListHours.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={classNames('flex h-fit items-center justify-center px-8 py-3 rounded-lg cursor-pointer', reservationSelectedList.includes(item) ? 'bg-black' : 'bg-darkNight50')}
                                    onClick={handleSelectTime(item)}
                                >
                                    <BaseText size={16} bold className={classNames(reservationSelectedList.includes(item) ? 'text-white' : '')} >
                                        {item}
                                    </BaseText>
                                </div>
                            )
                        })
                    }
                </div>
            </BaseModal>
        </>
    )
}