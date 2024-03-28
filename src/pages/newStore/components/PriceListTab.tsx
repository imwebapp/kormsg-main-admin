import React, { useEffect } from 'react'
import Images from '../../../assets/gen';
import { BaseText, CustomButton } from '../../../components';
import { PlusOutlined } from '@ant-design/icons';
interface IProps {
    data?: {
        id: string,
        name: string,
        description: string,
        time: string,
        amountBeforeDiscount: number,
        amountAfterDiscount: number,
        unit: 'USD' | 'VND' | 'Won',
    }[];
    onCLickCreateNew?: () => void;
}

export const PriceListTab = (props: IProps) => {
    const { data, onCLickCreateNew } = props;
    const [dataPrice, setDataPrice] = React.useState<any>(data);
    console.log('data PriceListTab', dataPrice);

    useEffect(() => {
        if (data)
            setDataPrice(data);
    }, [data])

    const handlePercentageDecrease = (amountBeforeDiscount: number, amountAfterDiscount: number) => {
        return ((amountBeforeDiscount - amountAfterDiscount) / amountBeforeDiscount * 100).toFixed(0) + '%';
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            {
                dataPrice ?
                    dataPrice.map((item: any, index: number) => {
                        return (
                            <div className='flex justify-between w-full p-4 border rounded-lg'>
                                <div className='flex flex-col gap-2'>
                                    <BaseText
                                        bold
                                        size={18}
                                    >
                                        {item?.name} ({item?.time})
                                    </BaseText>
                                    <BaseText
                                        size={16}
                                        medium
                                        color='text-darkNight700'
                                    >
                                        {item?.description}
                                    </BaseText>
                                    <div className='flex gap-1'>
                                        <BaseText size={16} locale color='text-primary' bold>요금</BaseText>
                                        <BaseText size={16} bold>{item?.amountBeforeDiscount} {item?.unit}</BaseText>
                                        <BaseText size={16} className='line-through'>{item?.amountAfterDiscount} {item?.unit}</BaseText>
                                        <BaseText size={16} bold color='text-cyan600'>{handlePercentageDecrease(item?.amountBeforeDiscount, item?.amountAfterDiscount)}</BaseText>
                                    </div>
                                </div>
                                <img src={Images.twoDot} className='w-6 h-6' onClick={() => { }} />
                            </div>
                        )
                    })
                    :
                    <div className='flex flex-col items-center justify-between gap-3 pt-10'>
                        <img src={Images.dataEmpty} className='h-[120px] w-[120px]' />
                        <BaseText locale>No data</BaseText>
                    </div>
            }
            <CustomButton
                onClick={onCLickCreateNew}
                type='primary'
                icon={<PlusOutlined />}
                locale
            >
                Create New
            </CustomButton>
        </div>
    )
}
