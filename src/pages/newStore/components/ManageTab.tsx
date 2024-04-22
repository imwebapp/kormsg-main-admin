import React, { useEffect, useState } from 'react'
import { BaseText, CustomButton } from '../../../components';
import Images from '../../../assets/gen';
import { PlusOutlined } from '@ant-design/icons';
import { generateRandomID } from '../../../utils/common';

interface IProps {
    data?: any;
    onCLickCreateNew?: () => void;
    onArchiveTick?: (index: number) => void;
    onEdit?: (item: any, index: number) => void;
    onUp?: (index: number) => void;
    onDown?: (index: number) => void;
    onCopy?: (item: any) => void;
    onDelete?: (index: number) => void;
}

export const ManageTab = (props: IProps) => {
    const { data, onCLickCreateNew, onArchiveTick, onEdit, onCopy, onDelete, onDown, onUp } = props;
    const [dataManage, setDataManage] = useState<any>(data);
    const [showOptionIndex, setShowOptionIndex] = useState<number | null>(null);
    console.log('data ManageTab', dataManage);

    const handleShowOption = (index: number) => {
        setShowOptionIndex((prevIndex) => (prevIndex === index ? null : index));
    }

    const handleArchiveTick = (index: number) => {
        onArchiveTick && onArchiveTick(index)
        setShowOptionIndex(null)
    }
    const handleEdit = (item: any, index: number) => {
        onEdit && onEdit(item, index)
        setShowOptionIndex(null)
    }
    const handleUp = (index: number) => {
        if (index > 0) {
            onUp && onUp(index)
        }
        setShowOptionIndex(null)
    }
    const handleDown = (index: number) => {
        if (index < dataManage.length - 1) {
            onDown && onDown(index)
        }
        setShowOptionIndex(null)
    }
    const handleCopy = (item: any) => {
        const newItem = { ...item, id: generateRandomID() };
        onCopy && onCopy(newItem)
        setShowOptionIndex(null)
    }
    const handleDelete = (index: number) => {
        onDelete && onDelete(index)
        setShowOptionIndex(null)
    }

    useEffect(() => {
        if (data)
            setDataManage(data);
    }, [data])

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            {
                dataManage ?
                    dataManage.map((item: any, index: number) => {
                        return (
                            <>
                                <div className='flex w-full gap-3 p-4 border rounded-lg'>
                                    <img src={item?.images[0] || Images.avatarEmpty} className='rounded-full w-[60px] h-[60px]' onClick={() => { }} />
                                    <div className='flex flex-col w-full gap-2'>
                                        <BaseText
                                            bold
                                            size={18}
                                        >
                                            {item?.name}
                                        </BaseText>
                                        <BaseText
                                            size={16}
                                            medium
                                            color='text-darkNight700'
                                        >
                                            {item?.description}
                                        </BaseText>
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
