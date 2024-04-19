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

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: { province: string; district: string }) => void;
    dataProvince?: string;
    dataDistrict?: string;
}
export const ModalSelectRegion = (props: IProps) => {
    const { isOpen, onClose, onSubmit, dataProvince, dataDistrict } = props
    const [t] = useTranslation();

    const [regionSelected, setRegionSelected] = useState<any>(LIST_REGION[0]);
    const [regionSelectedChild, setRegionSelectedChild] = useState<any>({
        title: '',
        value: ''
    });
    const handleCloseModalRegion = () => {
        onClose && onClose();
    }
    const handleSubmitModalRegion = () => {
        const dataConvert = {
            province: regionSelected?.id,
            district: regionSelectedChild?.value
        }
        onSubmit && onSubmit(dataConvert);
    }

    useEffect(() => {
        if (dataProvince) {
            const province = LIST_REGION.find((item) => item.id === dataProvince);
            if (province) {
                setRegionSelected(province);
                province.children.find((item: any) => {
                    if (item.value === dataDistrict) {
                        setRegionSelectedChild(item);
                    }
                })
            }
        }

    }, [dataProvince, dataDistrict]);

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleCloseModalRegion}
            onSubmit={handleSubmitModalRegion}
            title="지역"
            disableSubmitBtn={!regionSelectedChild.value}
        >
            <div className="flex h-[400px]">
                <div className="w-1/4 border-r">
                    {
                        LIST_REGION.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={classNames('flex px-4 py-[10px]', regionSelected.id === item.id ? 'bg-darkNight900' : '')}
                                    onClick={() => { setRegionSelected(item) }}
                                >
                                    <BaseText locale size={16} bold className={classNames(regionSelected.id === item.id ? 'text-white' : '')}>
                                        {item.name}
                                    </BaseText>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-3/4 px-3 overflow-auto">{
                    (regionSelected.children || []).map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className='flex justify-between py-3'
                                onClick={() => { setRegionSelectedChild(item) }}
                            >
                                <BaseText locale size={16} bold className={classNames(regionSelectedChild.value === item.value ? 'text-primary' : '')}>
                                    {item.title}
                                </BaseText>
                                {regionSelectedChild.value === item.value && <CheckOutlined style={{ marginLeft: '8px', color: '#0866FF' }} />}
                            </div>
                        )
                    })
                }</div>
            </div>
        </BaseModal>
    )
}