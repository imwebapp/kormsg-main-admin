import React, { useEffect, useState } from 'react'
import Images from '../../../assets/gen';
import { BaseText, CustomButton } from '../../../components';
import { PlusOutlined } from '@ant-design/icons';
import { generateRandomID, handleConvertCurrency } from '../../../utils/common';
interface IProps {
    data?: {
        id: string,
        name: string,
        description: string,
        time: string,
        amountBeforeDiscount?: number,
        amountAfterDiscount?: number,
        amountBeforeNightDiscount?: number,
        amountAfterNightDiscount?: number,
        unit: string,
    }[];
    onCLickCreateNew?: () => void;
    onArchiveTick?: (index: number) => void;
    onEdit?: (item: any, index: number) => void;
    onUp?: (index: number) => void;
    onDown?: (index: number) => void;
    onCopy?: (item: any) => void;
    onDelete?: (index: number) => void;
}

export const PriceListTab = (props: IProps) => {
    const { data, onCLickCreateNew, onArchiveTick, onCopy, onDelete, onDown, onEdit, onUp } = props;
    const [dataPrice, setDataPrice] = useState<any>(data);
    const [showOptionIndex, setShowOptionIndex] = useState<number | null>(null);

    console.log('data PriceListTab', dataPrice);

    const handlePercentageDecrease = (amountBeforeDiscount: number, amountAfterDiscount: number) => {
        return ((amountBeforeDiscount - amountAfterDiscount) / amountBeforeDiscount * 100).toFixed(0) + '%';
    }
    

    const handleShowOption = (index: number) => {
        setShowOptionIndex((prevIndex) => (prevIndex === index ? null : index));
    }

    const handleArchiveTick = (index: number) => {
        console.log('Click Archive Tick')
        onArchiveTick && onArchiveTick(index)
        setShowOptionIndex(null)
    }
    const handleEdit = (item: any, index: number) => {
        console.log('Click Edit')
        onEdit && onEdit(item, index)
        setShowOptionIndex(null)
    }
    const handleUp = (index: number) => {
        if (index > 0) {
            console.log('Click Up')
            onUp && onUp(index)
        }
        setShowOptionIndex(null)
    }
    const handleDown = (index: number) => {
        if (index < dataPrice.length - 1) {
            console.log('Click Down')
            onDown && onDown(index)
        }
        setShowOptionIndex(null)
    }
    const handleCopy = (item: any) => {
        console.log('Click Copy')
        const newItem = { ...item, id: generateRandomID() };
        onCopy && onCopy(newItem)
        setShowOptionIndex(null)
    }
    const handleDelete = (index: number) => {
        console.log('Click Delete')
        onDelete && onDelete(index)
        setShowOptionIndex(null)
    }

    useEffect(() => {
        if (data)
            setDataPrice(data);
    }, [data])

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            {
                dataPrice ?
                    dataPrice.map((item: any, index: number) => {
                        return (
                            <>
                                <div className='flex justify-between w-full p-4 border rounded-lg'>
                                    <div className='flex flex-col gap-2'>
                                        {(item?.title && item?.running_time) && <BaseText
                                            bold
                                            size={18}
                                        >
                                            {item?.title} ({item?.running_time})
                                        </BaseText>}
                                        <BaseText
                                            size={16}
                                            medium
                                            color='text-darkNight700'
                                        >
                                            {item?.description}
                                        </BaseText>
                                        {
                                            (item?.prices || []).map((price: any, index: number) => {
                                                return (
                                                    <div className='flex gap-1'>
                                                        <BaseText size={16} locale color='text-primary' bold>{price?.name === 'ALL' ? 'Charge' : price?.name}</BaseText>
                                                        <BaseText size={16} bold>{handleConvertCurrency(price?.discount)} {item?.unit}</BaseText>
                                                        <BaseText size={16} className='line-through'>{handleConvertCurrency(price?.price)} {item?.unit}</BaseText>
                                                        <BaseText size={16} bold color='text-cyan600'>{handlePercentageDecrease(price?.price, price?.discount)}</BaseText>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <img src={Images.twoDot} className='w-6 h-6' onClick={() => handleShowOption(index)} />
                                </div>
                                {
                                    showOptionIndex === index && (
                                        <div className='flex justify-between w-full px-3'>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg cursor-pointer'
                                                onClick={() => handleArchiveTick(index)}
                                            >
                                                <img src={Images.archiveTick} className='w-5 h-5' />
                                                <BaseText locale size={10} >추천</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg cursor-pointer'
                                                onClick={() => handleEdit(item, index)}
                                            >
                                                <img src={Images.editIcon2} className='w-5 h-5' />
                                                <BaseText locale size={10} >수정</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg cursor-pointer'
                                                onClick={() => handleUp(index)}
                                            >
                                                <img src={Images.arrowUp} className='w-5 h-5' />
                                                <BaseText locale size={10} >위로</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg cursor-pointer'
                                                onClick={() => handleDown(index)}
                                            >
                                                <img src={Images.arrowDown} className='w-5 h-5' />
                                                <BaseText locale size={10} >아래로</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg cursor-pointer'
                                                onClick={() => handleCopy(item)}
                                            >
                                                <img src={Images.documentCopy} className='w-5 h-5' />
                                                <BaseText locale size={10} >복제</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg cursor-pointer'
                                                onClick={() => handleDelete(index)}
                                            >
                                                <img src={Images.trash2} className='w-5 h-5' />
                                                <BaseText locale size={10} >삭제</BaseText>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
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
