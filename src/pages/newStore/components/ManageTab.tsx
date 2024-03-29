import React, { useEffect } from 'react'
import { BaseText, CustomButton } from '../../../components';
import Images from '../../../assets/gen';
import { PlusOutlined } from '@ant-design/icons';

interface IProps {
    data?: any;
    onCLickCreateNew?: () => void;
}

export const ManageTab = (props: IProps) => {
    const { data, onCLickCreateNew } = props;
    const [dataManage, setDataManage] = React.useState<any>(data);
    console.log('data ManageTab', dataManage);

    useEffect(() => {
        if (data)
            setDataManage(data);
    }, [data])

    const handlePercentageDecrease = (amountBeforeDiscount: number, amountAfterDiscount: number) => {
        return ((amountBeforeDiscount - amountAfterDiscount) / amountBeforeDiscount * 100).toFixed(0) + '%';
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            {
                dataManage ?
                    dataManage.map((item: any, index: number) => {
                        return (
                            <div className='flex w-full gap-3 p-4 border rounded-lg'>
                                <img src={item?.image || Images.avatarEmpty} className='rounded-full w-[60px] h-[60px]' onClick={() => { }} />
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
