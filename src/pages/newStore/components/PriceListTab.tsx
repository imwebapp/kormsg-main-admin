import React, { useEffect, useState } from 'react'
import Images from '../../../assets/gen';
import { BaseText, CustomButton } from '../../../components';
import { PlusOutlined } from '@ant-design/icons';
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
    onArchiveTick?: () => void;
    onEdit?: () => void;
    onUp?: () => void;
    onDown?: () => void;
    onCopy?: () => void;
    onDelete?: () => void;
}

export const PriceListTab = (props: IProps) => {
    const { data, onCLickCreateNew, onArchiveTick, onCopy, onDelete, onDown, onEdit, onUp } = props;
    const [dataPrice, setDataPrice] = useState<any>(data);
    const [showOptionIndex, setShowOptionIndex] = useState<number | null>(null);

    console.log('data PriceListTab', dataPrice);

    useEffect(() => {
        if (data)
            setDataPrice(data);
    }, [data])

    const handlePercentageDecrease = (amountBeforeDiscount: number, amountAfterDiscount: number) => {
        return ((amountBeforeDiscount - amountAfterDiscount) / amountBeforeDiscount * 100).toFixed(0) + '%';
    }

    const handleShowOption = (index: number) => {
        setShowOptionIndex((prevIndex) => (prevIndex === index ? null : index));
    }

    const handleArchiveTick = () => {
        console.log('Click Archive Tick')
        onArchiveTick && onArchiveTick()
    }
    const handleEdit = () => {
        console.log('Click Edit')
        onEdit && onEdit()
    }
    const handleUp = () => {
        console.log('Click Up')
        onUp && onUp()
    }
    const handleDown = () => {
        console.log('Click Down')
        onDown && onDown()
    }
    const handleCopy = () => {
        console.log('Click Copy')
        onCopy && onCopy()
    }
    const handleDelete = () => {
        console.log('Click Delete')
        onDelete && onDelete()
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            {
                dataPrice ?
                    dataPrice.map((item: any, index: number) => {
                        return (
                            <>
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
                                    <img src={Images.twoDot} className='w-6 h-6' onClick={() => handleShowOption(index)}/>
                                </div>
                                {
                                    showOptionIndex === index && (
                                        <div className='flex justify-between w-full px-3'>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg'
                                                onClick={handleArchiveTick}
                                            >
                                                <img src={Images.archiveTick} className='w-5 h-5' />
                                                <BaseText locale size={10} >추천</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg'
                                                onClick={handleEdit}
                                            >
                                                <img src={Images.editIcon2} className='w-5 h-5' />
                                                <BaseText locale size={10} >수정</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg'
                                                onClick={handleUp}
                                            >
                                                <img src={Images.arrowUp} className='w-5 h-5' />
                                                <BaseText locale size={10} >위로</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg'
                                                onClick={handleDown}
                                            >
                                                <img src={Images.arrowDown} className='w-5 h-5' />
                                                <BaseText locale size={10} >아래로</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg'
                                                onClick={handleCopy}
                                            >
                                                <img src={Images.documentCopy} className='w-5 h-5' />
                                                <BaseText locale size={10} >복제</BaseText>
                                            </div>
                                            <div
                                                className='flex flex-col items-center justify-center w-[50px] h-[50px] gap-[2px] rounded-full border drop-shadow-lg'
                                                onClick={handleDelete}
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
