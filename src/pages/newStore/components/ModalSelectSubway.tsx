import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Images from '../../../assets/gen';
import { BaseText } from '../../../components';
import { BaseInput } from '../../../components/input/BaseInput';
import { BaseModal } from '../../../components/modal/BaseModal';
import { classNames } from '../../../utils/common';
import { LIST_REGION, STATION } from '../../../utils/constants';

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: { subwaySelected: any; subwaySelectedChild: any; subwaySelectedDetails: string }) => void;
    dataSubway?: string;
    dataSubwayChild?: string;
    dataSubwayDetails?: string;
}
export const ModalSelectSubway = (props: IProps) => {
    const { isOpen, onClose, onSubmit, dataSubway, dataSubwayChild, dataSubwayDetails } = props
    const [t] = useTranslation();

    const [subwaySelected, setSubwaySelected] = useState<any>();
    const [subwaySelectedChild, setSubwaySelectedChild] = useState<any>();
    const [subwaySelectedDetails, setSubwaySelectedDetails] = useState<any>();

    const [valueSearchStation, setValueSearchStation] = useState<string>('');
    const [listDataSearch, setListDataSearch] = useState<string[]>([]);


    const handleCloseModalSubway = () => {
        setValueSearchStation('')
        onClose && onClose();
    }
    const handleSubmitModalSubway = () => {
        setValueSearchStation('')
        const dataConvert = {
            subwaySelected,
            subwaySelectedChild,
            subwaySelectedDetails
        }
        onSubmit && onSubmit(dataConvert);
    }

    useEffect(() => {
        if (dataSubway) {
            const subwayLocation = STATION.find((item) => item.name === dataSubway);
            if (subwayLocation) {
                setSubwaySelected(subwayLocation);

                const subwayChild = subwayLocation.stationLineList.find(
                    (item: any) => item.name === dataSubwayChild
                );

                if (subwayChild) {
                    setSubwaySelectedChild(subwayChild);

                    const subwayDetails = subwayChild.stationSubwayList.find(
                        (item: any) => item === dataSubwayDetails
                    );

                    if (subwayDetails) {
                        setSubwaySelectedDetails(subwayDetails);
                    }
                }
            }
        }
    }, [dataSubway, dataSubwayChild, dataSubwayDetails]);

    useEffect(() => {
        if (valueSearchStation.trim() !== '' && subwaySelectedChild) {

            const station = subwaySelectedChild?.stationSubwayList.filter((item: string) => item.includes(valueSearchStation.trim()));
            if (station) {
                setListDataSearch(station);
                setSubwaySelectedDetails(station);
            }
        }
    }, [valueSearchStation])


    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleCloseModalSubway}
            onSubmit={handleSubmitModalSubway}
            title="뒤로"
            disableSubmitBtn={!subwaySelectedDetails}
            isHideAction={!subwaySelectedChild}
        >
            <div className="flex flex-col gap-4">
                {
                    subwaySelected ? (
                        <>
                            {
                                subwaySelectedChild ? (
                                    <>
                                        <div className="flex gap-2 justify-between">
                                            <div className="flex gap-2 items-center">
                                                <img src={Images.arrowLeft} className="w-6 h-6" onClick={() => { setSubwaySelectedDetails(undefined); setSubwaySelectedChild(undefined) }} />
                                                <BaseText size={24} medium>
                                                    {subwaySelectedChild?.name}
                                                </BaseText>
                                            </div>
                                            <BaseInput
                                                placeholder="Search"
                                                className="w-2/4"
                                                value={valueSearchStation}
                                                onChange={(value) => {
                                                    setValueSearchStation(value);
                                                }}
                                                iconLeft={
                                                    <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 gap-3 grid-flow-rows h-[400px]">
                                            {
                                                valueSearchStation.trim() !== '' ? (
                                                    listDataSearch?.map((item: string, index: number) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={classNames('flex h-fit items-center justify-center px-8 py-3 rounded-lg', subwaySelectedDetails === item ? 'bg-black' : 'bg-darkNight50')}
                                                                onClick={() => { setSubwaySelectedDetails(item) }}
                                                            >
                                                                <BaseText locale size={16} bold className={classNames(subwaySelectedDetails === item ? 'text-white' : '')} >
                                                                    {item}
                                                                </BaseText>
                                                            </div>
                                                        )
                                                    })
                                                ) :
                                                    subwaySelectedChild?.stationSubwayList.map((item: string, index: number) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={classNames('flex h-fit items-center justify-center px-8 py-3 rounded-lg', subwaySelectedDetails === item ? 'bg-black' : 'bg-darkNight50')}
                                                                onClick={() => { setSubwaySelectedDetails(item) }}
                                                            >
                                                                <BaseText locale size={16} bold className={classNames(subwaySelectedDetails === item ? 'text-white' : '')} >
                                                                    {item}
                                                                </BaseText>
                                                            </div>
                                                        )
                                                    })
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <BaseText size={24} medium>
                                            지하철
                                        </BaseText>
                                        <div className="flex items-center gap-2">
                                            <img src={Images.arrowLeft} className="w-6 h-6" onClick={() => { setSubwaySelectedChild(undefined); setSubwaySelected(undefined) }} />
                                            <BaseText size={24} medium>
                                                {subwaySelected?.name}
                                            </BaseText>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 grid-flow-rows">
                                            {
                                                subwaySelected?.stationLineList.map((item: any, index: number) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{ borderLeftColor: item.color }}
                                                            onClick={() => { setSubwaySelectedChild(item) }}
                                                            className={classNames('flex px-4 py-[20px] border-l-8', subwaySelectedChild?.name === item?.name ? 'bg-black' : '')}
                                                        >
                                                            <BaseText locale size={16} bold className={classNames(subwaySelectedChild?.name === item?.name ? 'text-white' : '')}>
                                                                {item?.name}
                                                            </BaseText>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-3 gap-3 grid-flow-rows">
                                {
                                    STATION.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={classNames('flex h-fit items-center justify-center px-8 py-3 rounded-lg', setSubwaySelected.name === item.name ? 'bg-black' : 'bg-darkNight50')}
                                                onClick={() => { setSubwaySelected(item) }}
                                            >
                                                <BaseText locale size={16} bold className={classNames(setSubwaySelected.name === item.name ? 'text-white' : '')} >
                                                    {item.name}
                                                </BaseText>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </BaseModal>
    )
}