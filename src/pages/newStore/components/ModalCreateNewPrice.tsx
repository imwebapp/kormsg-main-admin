import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modal/BaseModal'
import { BaseText } from '../../../components'
import { classNames } from '../../../utils/common'
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';
import { BaseInputSelect } from '../../../components/input/BaseInputSelect';
import { ChatMessageFuncPart1 } from './ChatMessageFuncPart1';

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: any) => void;
    data: {
        id: string;
        name: string;
        description: string;
        time: string;
        amountBeforeDiscount?: number;
        amountAfterDiscount?: number;
        amountBeforeNightDiscount?: number;
        amountAfterNightDiscount?: number;
        unit: string;
    };
}
export const ModalCreateNewPrice = (props: IProps) => {
    const { isOpen, onClose, onSubmit, data } = props

    const [dataNewPrice, setDataNewPrice] = useState<any>(data);
    const [isShowPriceNight, setIsShowPriceNight] = useState<string>('0');

    const handleInputChangeNewPrice = (name: string, value: any) => {
        setDataNewPrice({ ...dataNewPrice, [name]: value });
    };
    const handleCloseModalCreateNewPrice = () => {
        setIsShowPriceNight('0');
        setDataNewPrice(
            {
                id: '',
                name: '',
                description: '',
                time: '',
                amountBeforeDiscount: undefined,
                amountAfterDiscount: undefined,
                unit: '',
            }
        )
        onClose && onClose();
    }
    const handleSubmitCreateNewPrice = () => {
        onSubmit && onSubmit(dataNewPrice);
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
                    onClick={(value) => { setIsShowPriceNight(value) }}
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
                <BaseInputSelect
                    title="코스시간"
                    options={[
                        {
                            value: "1",
                            label: "1",
                        },
                        {
                            value: "2",
                            label: "2",
                        },
                        {
                            value: "3",
                            label: "3",
                        },
                    ]}
                    value={dataNewPrice.time}
                    onChange={(value) => handleInputChangeNewPrice('time', value)}
                    placeholder="시간선택"
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
                            value: "1",
                            label: "USD",
                        },
                        {
                            value: "2",
                            label: "VND",
                        },
                        {
                            value: "3",
                            label: "Won",
                        },
                    ]}
                    value={dataNewPrice.unit}
                    onChange={(value) => handleInputChangeNewPrice('unit', value)}
                />
            </div>
        </BaseModal>
    )
}