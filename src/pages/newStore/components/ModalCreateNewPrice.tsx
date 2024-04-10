import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modal/BaseModal'
import { BaseText } from '../../../components'
import { classNames, generateRandomID } from '../../../utils/common'
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';
import { BaseInputSelect } from '../../../components/input/BaseInputSelect';
import { ChatMessageFuncPart1 } from './ChatMessageFuncPart1';
import { useTranslation } from 'react-i18next';
import CurrencyInput from 'react-currency-input-field';

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: any) => void;
    data?: {
        id: string;
        description: string;
        unit: string;
        images: [],
        thumbnails: [],
        title: string,
        running_time: string | number,
        recommended: false,
        prices: {
            id: string,
            name: string,
            price: number,
            discount: number,
        }[],
    };
}
export const ModalCreateNewPrice = (props: IProps) => {
    const { isOpen, onClose, onSubmit, data } = props
    const [t] = useTranslation();
    const [dataNewPrice, setDataNewPrice] = useState<any>({
        id: '',
        name: '',
        description: '',
        time: undefined,
        amountBeforeDiscount: undefined,
        amountAfterDiscount: undefined,
        amountBeforeNightDiscount: undefined,
        amountAfterNightDiscount: undefined,
        unit: 'KRW',
    });
    const [isShowPriceNight, setIsShowPriceNight] = useState<string>('0');
    const [isErrorTime, setIsErrorTime] = useState<string>('')

    const handleInputChangeNewPrice = (name: string, value: any) => {
        if (name === 'time' && (value < 0 || value > 240)) {
            setIsErrorTime('You can enter a minimum of 0 minutes and a maximum of 240 minutes.')
        }
        else {
            setIsErrorTime('')
            setDataNewPrice({ ...dataNewPrice, [name]: value });
        }
    };
    const handleCloseModalCreateNewPrice = () => {
        setIsShowPriceNight('0');
        setDataNewPrice(
            {
                id: '',
                name: '',
                description: '',
                time: undefined,
                amountBeforeDiscount: undefined,
                amountAfterDiscount: undefined,
                amountBeforeNightDiscount: undefined,
                amountAfterNightDiscount: undefined,
                unit: 'KRW',
            }
        )
        onClose && onClose();
    }
    const handleSubmitCreateNewPrice = () => {
        setIsShowPriceNight('0');
        setDataNewPrice(
            {
                id: '',
                name: '',
                description: '',
                time: undefined,
                amountBeforeDiscount: undefined,
                amountAfterDiscount: undefined,
                amountBeforeNightDiscount: undefined,
                amountAfterNightDiscount: undefined,
                unit: 'KRW',
            }
        )
        const dataPrices = (dataNewPrice?.amountBeforeNightDiscount && dataNewPrice?.amountAfterNightDiscount) ? [
            {
                id: generateRandomID(),
                name: "DAY",
                price: Number(dataNewPrice?.amountBeforeDiscount),
                discount: Number(dataNewPrice?.amountAfterDiscount),
            },
            {
                id: generateRandomID(),
                name: "NIGHT",
                price: Number(dataNewPrice?.amountBeforeNightDiscount),
                discount: Number(dataNewPrice?.amountAfterNightDiscount),
            }
        ] : [
            {
                id: generateRandomID(),
                name: "ALL",
                price: Number(dataNewPrice?.amountBeforeDiscount),
                discount: Number(dataNewPrice?.amountAfterDiscount),
            }
        ];
        const dataConvert = {
            id: generateRandomID(),
            images: [],
            thumbnails: [],
            title: dataNewPrice?.name,
            running_time: dataNewPrice?.time,
            description: dataNewPrice?.description,
            recommended: false,
            unit: dataNewPrice?.unit,
            prices: dataPrices,
        }
        onSubmit && onSubmit(dataConvert);
    }

    useEffect(() => {
        console.log('data EDIT', data);

        const dataEditConvert = {
            id: data?.id,
            name: data?.title,
            description: data?.description,
            time: data?.running_time,
            amountBeforeDiscount: data?.prices[0]?.price || undefined,
            amountAfterDiscount: data?.prices[0]?.discount || undefined,
            amountBeforeNightDiscount: data?.prices[1]?.price || undefined,
            amountAfterNightDiscount: data?.prices[1]?.discount || undefined,
            unit: data?.unit,
        }
        if (data?.prices?.length === 2) setIsShowPriceNight('1');
        data && setDataNewPrice(dataEditConvert);
    }, [data]);

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleCloseModalCreateNewPrice}
            onSubmit={handleSubmitCreateNewPrice}
            title="코스등록"
            disableSubmitBtn={!dataNewPrice}
        >
            <div className="flex flex-col gap-4">
                <ChatMessageFuncPart1
                    title="주간 야간별 요금을 각각 설정"
                    value={isShowPriceNight}
                    onClick={(value) => {
                        setIsShowPriceNight(value);
                        if (value === '0') {
                            setDataNewPrice({
                                ...dataNewPrice,
                                amountBeforeNightDiscount: undefined,
                                amountAfterNightDiscount: undefined
                            })
                        }
                    }}
                    options={[
                        { value: '0', label: '아니오' },
                        { value: '1', label: '예' }
                    ]}
                />
                <BaseInput
                    title="코스이름"
                    placeholder="타이마사지"
                    value={dataNewPrice.name}
                    onChange={(value) => handleInputChangeNewPrice('name', value)}
                />
                <BaseInput
                    title="코스설명"
                    placeholder="타이마사지"
                    value={dataNewPrice.description}
                    onChange={(value) => handleInputChangeNewPrice('description', value)}
                />
                <BaseInput
                    title="코스시간"
                    placeholder="시간선택"
                    type='number'
                    isError={isErrorTime}
                    value={dataNewPrice.time}
                    onChange={(value) => handleInputChangeNewPrice('time', value)}
                    iconRight={<BaseText
                        locale
                    >
                        Minutes
                    </BaseText>}
                />

                <div className='flex flex-col gap-2'>
                    <BaseText locale bold>할인된 금액</BaseText>
                    <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="0"
                        defaultValue={dataNewPrice.amountAfterDiscount}
                        decimalsLimit={2}
                        onValueChange={(value, name, values) => handleInputChangeNewPrice('amountBeforeDiscount', values?.value)}
                        className='p-3 bg-darkNight50 rounded-lg text-darkNight900 w-full focus:outline-none focus:ring-2 focus:ring-darkNight100 focus:ring-opacity-50 font-bold'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <BaseText locale bold color='text-dayBreakBlue500'>할인된 금액</BaseText>
                    <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="0"
                        defaultValue={dataNewPrice.amountAfterDiscount}
                        decimalsLimit={2}
                        onValueChange={(value, name, values) => handleInputChangeNewPrice('amountAfterDiscount', values?.value)}
                        className='p-3 bg-darkNight50 rounded-lg text-darkNight900 w-full focus:outline-none focus:ring-2 focus:ring-darkNight100 focus:ring-opacity-50 font-bold'
                    />
                </div>

                {isShowPriceNight === '1' && <>
                    <div className='flex flex-col gap-2'>
                        <BaseText locale bold>야간 할인된 금액</BaseText>
                        <CurrencyInput
                            id="input-example"
                            name="input-name"
                            placeholder="0"
                            defaultValue={dataNewPrice.amountBeforeNightDiscount}
                            decimalsLimit={2}
                            onValueChange={(value, name, values) => handleInputChangeNewPrice('amountBeforeNightDiscount', values?.value)}
                            className='p-3 bg-darkNight50 rounded-lg text-darkNight900 w-full focus:outline-none focus:ring-2 focus:ring-darkNight100 focus:ring-opacity-50 font-bold'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <BaseText locale bold color='text-dayBreakBlue500'>야간 할인된 금액</BaseText>
                        <CurrencyInput
                            id="input-example"
                            name="input-name"
                            placeholder="0"
                            defaultValue={dataNewPrice.amountAfterNightDiscount}
                            decimalsLimit={2}
                            onValueChange={(value, name, values) => handleInputChangeNewPrice('amountAfterNightDiscount', values?.value)}
                            className='p-3 bg-darkNight50 rounded-lg text-darkNight900 w-full focus:outline-none focus:ring-2 focus:ring-darkNight100 focus:ring-opacity-50 font-bold'
                        />
                    </div>
                </>}

                <BaseInputSelect
                    title="결제가능한 화폐"
                    placeholder=""
                    options={[
                        {
                            value: "KRW",
                            label: t('KRW'),
                        },
                    ]}
                    defaultValue={dataNewPrice.unit}
                    value={dataNewPrice.unit}
                    onChange={(value) => {
                        console.log('valueXX', value);
                        handleInputChangeNewPrice('unit', value)
                    }}
                />
            </div>
        </BaseModal>
    )
}