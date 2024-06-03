import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Images from '../../../assets/gen';
import { BaseText } from '../../../components';
import { BaseInput } from '../../../components/input/BaseInput';
interface IProps {
    value: {
        fullAddress: string;
        lat: number;
        lng: number;
    }
    onChange: (value: {
        fullAddress: string;
        lat: number;
        lng: number;
    }) => void;
}

export const SelectAddress = (props: IProps) => {
    const { value, onChange } = props;
    const [openListSelectAddress, setOpenListSelectAddress] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const [listAddress, setListAddress] = useState([])

    const handleSelectedUser = (address: any) => {
        if (address) {
            const dataConvert = {
                fullAddress: [
                    address.properties?.name,
                    address.properties?.locality,
                    address.properties?.street,
                    address.properties?.district,
                    address.properties?.county,
                    address.properties?.state,
                    address.properties?.city,
                    address.properties?.country
                ]
                    .filter(Boolean) // Remove undefined or empty values
                    .join(', '),
                lat: address.geometry?.coordinates[1],
                lng: address.geometry?.coordinates[0]
            }
            onChange(dataConvert)
            setOpenListSelectAddress(false)
        }
    }

    const getListAddress = async (address: string) => {
        const fullAddress = address;
        try {
            const response = await axios.get(`https://photon.komoot.io/api/?q=${fullAddress}`);
            if (response.status === 200) {
                setListAddress(response.data.features);
            } else {
                console.error('Geocoding failed:', response.data.status);
            }
        } catch (error) {
            console.error('Error occurred while fetching geocode:', error);
        }
    };

    useEffect(() => {
        getListAddress(valueSearch)
    }, [valueSearch])

    return (
        <>
            <div onClick={() => { setOpenListSelectAddress(true) }}>
                <BaseInput
                    // title="매장 주소(위치기반 적용)"
                    placeholder="주소입력"
                    value={value?.fullAddress}
                />
            </div>
            {openListSelectAddress &&
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-end'>
                        <CloseOutlined className="text-2xl text-gray-500 cursor-pointer" onClick={() => setOpenListSelectAddress(false)} />
                    </div>
                    <BaseInput
                        placeholder="Search user with ID or Nickname"
                        className="flex"
                        value={valueSearch}
                        onChange={(value) => {
                            setValueSearch(value);
                        }}
                        iconLeft={
                            <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
                        }

                    />
                    {listAddress.length > 0 ? <div className='flex flex-col gap-2 h-[200px] overflow-auto'>
                        {listAddress.map((address: any) => {
                            return (
                                <div key={address.id} className='flex items-center gap-3 cursor-pointer' onClick={() => handleSelectedUser(address)}>
                                    <div className='flex flex-wrap '>
                                        {[
                                            address.properties?.name,
                                            address.properties?.locality,
                                            address.properties?.street,
                                            address.properties?.district,
                                            address.properties?.county,
                                            address.properties?.state,
                                            address.properties?.city,
                                            address.properties?.country
                                        ]
                                            .filter(Boolean) // Remove undefined or empty values
                                            .join(', ')}
                                    </div>
                                </div>
                            )
                        })}
                    </div> : (
                        <div className='flex flex-col gap-2 h-[200px] justify-center items-center'>
                            <img src={Images.dataEmpty} alt="avatar" className="w-10 h-10 rounded-full" />
                            <BaseText locale>No data address</BaseText>
                        </div>
                    )}
                </div>
            }
        </>
    )
}