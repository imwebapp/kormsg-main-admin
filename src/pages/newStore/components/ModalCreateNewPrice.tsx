import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modal/BaseModal'
import { BaseText } from '../../../components'
import { classNames, generateRandomID } from '../../../utils/common'
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';
import { BaseInputSelect } from '../../../components/input/BaseInputSelect';
import { ChatMessageFuncPart1 } from './ChatMessageFuncPart1';
import { useTranslation } from 'react-i18next';

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: any) => void;
    data?: {
        id: string;
        name: string;
        description: string;
        time?: number | string;
        amountBeforeDiscount?: number;
        amountAfterDiscount?: number;
        amountBeforeNightDiscount?: number;
        amountAfterNightDiscount?: number;
        unit: string;
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
                price: dataNewPrice?.amountBeforeDiscount,
                discount: dataNewPrice?.amountAfterDiscount,
            },
            {
                id: generateRandomID(),
                name: "NIGHT",
                price: dataNewPrice?.amountBeforeNightDiscount,
                discount: dataNewPrice?.amountAfterNightDiscount,
            }
        ] : [
            {
                id: generateRandomID(),
                name: "ALL",
                price: dataNewPrice?.amountBeforeDiscount,
                discount: dataNewPrice?.amountAfterDiscount,
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
        data && setDataNewPrice(data);
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
                <BaseInput
                    title="할인된 금액"
                    placeholder="0"
                    type="number"
                    value={dataNewPrice.amountBeforeDiscount}
                    onChange={(value) => handleInputChangeNewPrice('amountBeforeDiscount', value)}
                />
                <BaseInput
                    title="할인된 금액"
                    placeholder="0"
                    type="number"
                    value={dataNewPrice.amountAfterDiscount}
                    onChange={(value) => handleInputChangeNewPrice('amountAfterDiscount', value)}
                />

                {isShowPriceNight === '1' && <>
                    <BaseInput
                        title="야간 할인된 금액"
                        placeholder="0"
                        type="number"
                        value={dataNewPrice.amountBeforeNightDiscount}
                        onChange={(value) => handleInputChangeNewPrice('amountBeforeNightDiscount', value)}
                    />
                    <BaseInput
                        title="야간 할인된 금액"
                        placeholder="0"
                        type="number"
                        value={dataNewPrice.amountAfterNightDiscount}
                        onChange={(value) => handleInputChangeNewPrice('amountAfterNightDiscount', value)}
                    />
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