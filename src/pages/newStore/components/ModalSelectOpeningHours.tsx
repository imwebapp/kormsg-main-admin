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

const dataHour: any = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const dataMinutes: any = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59'];
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

    const handleCloseModalOpeningHours = () => {
        setIsSelected(false)
        onClose && onClose();
    }
    const handleSubmitModalOpeningHours = () => {
        setIsSelected(false)
        const dataConvert = dataOpening + '~' + dataClosing;
        onSubmit && onSubmit(dataConvert);
    }
    const [valueHours, setValueHours] = React.useState(0);
    const [valueMinutes, setValueMinutes] = React.useState(0);

    const handleChangeHours = (event: React.SyntheticEvent, newValue: number) => {
        setValueHours(newValue);
        if (isSelected) {
            newValue < 10 ?
                setDataClosing('0' + newValue + ':' + dataClosing.split(':')[1])
                :
                setDataClosing(newValue + ':' + dataClosing.split(':')[1])
        }
        else {
            newValue < 10 ?
                setDataOpening('0' + newValue + ':' + dataOpening.split(':')[1])
                :
                setDataOpening(newValue + ':' + dataOpening.split(':')[1])
        }
    };

    const handleChangeMinutes = (event: React.SyntheticEvent, newValue: number) => {
        setValueMinutes(newValue);
        if (isSelected) {
            newValue < 10 ?
                setDataClosing(dataClosing.split(':')[0] + ':' + '0' + newValue)
                :
                setDataClosing(dataClosing.split(':')[0] + ':' + newValue)
        }
        else {
            newValue < 10 ?
                setDataOpening(dataOpening.split(':')[0] + ':' + '0' + newValue)
                :
                setDataOpening(dataOpening.split(':')[0] + ':' + newValue)
        }
    };

    useEffect(() => {
        if (data) {
            const dataEditConvert = data && data.split('~');
            dataEditConvert && setDataOpening(dataEditConvert[0]);
            dataEditConvert && setDataClosing(dataEditConvert[1]);
            setValueHours(dataHour.indexOf(dataEditConvert[0].split(':')[0]));
            setValueMinutes(dataMinutes.indexOf(dataEditConvert[0].split(':')[1]));
        }
    }, [data]);

    useEffect(() => {
        if (isSelected) {
            const dataClosingConvert = dataClosing.split(':');
            const dataClosingHoursIndex = dataHour.indexOf(dataClosingConvert[0]);
            const dataClosingMinutesIndex = dataMinutes.indexOf(dataClosingConvert[1]);
            setValueHours(dataClosingHoursIndex);
            setValueMinutes(dataClosingMinutesIndex);
        }
        else {
            const dataOpeningConvert = dataOpening.split(':');
            const dataOpeningHoursIndex = dataHour.indexOf(dataOpeningConvert[0]);
            const dataOpeningMinutesIndex = dataMinutes.indexOf(dataOpeningConvert[1]);
            setValueHours(dataOpeningHoursIndex);
            setValueMinutes(dataOpeningMinutesIndex);
        }
    }, [isSelected]);

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleCloseModalOpeningHours}
            onSubmit={handleSubmitModalOpeningHours}
            title="영업시간"
            disableSubmitBtn={!dataOpening && !dataClosing}
        >
            <div className='flex items-center gap-6 mb-4'>
                <div
                    className={classNames('flex flex-col flex-1 px-4 py-2 rounded-lg bg-gray8 border-2', !isSelected ? 'border-primary ' : 'border-gray5')}
                    onClick={() => {
                        console.log('click Opening Hours')
                        setIsSelected(false)
                    }}
                >
                    <BaseText locale>
                        오픈시간
                    </BaseText>
                    <BaseText bold>
                        {dataOpening}
                    </BaseText>
                </div>
                <BaseText>
                    ~
                </BaseText>
                <div
                    className={classNames('flex flex-col flex-1 px-4 py-2 rounded-lg  bg-gray8 border-2', isSelected ? 'border-primary ' : 'border-gray5')}

                    onClick={() => {
                        console.log('click Closing Hours')
                        setIsSelected(true)
                    }}
                >
                    <BaseText locale>
                        마감시간
                    </BaseText>
                    <BaseText bold>
                        {dataClosing}
                    </BaseText>
                </div>
            </div>
            <div
                className='flex gap-6 mb-4 border-[1.5px] h-[200px] rounded-lg border-gray5 '
            >
                <div className='flex justify-center flex-grow'>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={valueHours}
                        onChange={handleChangeHours}
                        aria-label="Vertical tabs example"
                        classes={{ indicator: 'bg-primary' }}
                    >
                        {dataHour.map((item: any, index: any) => {
                            return (
                                <Tab
                                    key={generateRandomID()}
                                    label={item}

                                />
                            )
                        })}
                    </Tabs>
                </div>

                <BaseText className='my-auto'>
                    ~
                </BaseText>

                <div className='flex justify-center flex-grow '>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={valueMinutes}
                        onChange={handleChangeMinutes}
                        sx={{}}
                    >
                        {dataMinutes.map((item: any, index: any) => {
                            return (
                                <Tab
                                    key={generateRandomID()}
                                    label={item}
                                />
                            )
                        })}
                    </Tabs>
                </div>
            </div>
        </BaseModal >
    )
}