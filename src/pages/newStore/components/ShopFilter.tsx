import React, { useEffect, useState } from 'react'
import { BaseInput } from '../../../components/input/BaseInput'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import Images from '../../../assets/gen';
import { TypeUser } from '../../../utils/constants';
import { shopApi } from '../../../apis/shopApi';
import { BaseText } from '../../../components';
import { BaseInputSelect } from '../../../components/input/BaseInputSelect';
import { App } from 'antd';
interface IProps {
    value: any;
    onChange: (value: any) => void;
}
const listTypeFilter = [
    {
        value: 'title',
        label: 'Title',
    },
    {
        value: 'nickname',
        label: 'Nickname',
    },
    {
        value: 'username',
        label: 'ID',
    },
];

export const ShopFilter = (props: IProps) => {
    const { value, onChange } = props;
    const { message } = App.useApp();
    const [openListShopFilter, setOpenListShopFilter] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const [listShop, setListShop] = useState([])
    const [typeFilter, setTypeFilter] = useState(listTypeFilter[0].value)

    const handleSelectedShop = async (shop: any) => {
        if (shop) {
            const res: any = await shopApi.viewShop(shop.id, { fields: '["$all",{"category":["$all"]},{"user":["nickname"]},{"courses":["$all",{"prices":["$all"]}]},{"mentors":["$all"]}]' })
            if (res?.code === 200 && res.results) {
                onChange(res.results.object)
            }
            else {
                message.error('Failed to get shop information')
            }
            setOpenListShopFilter(false)
        }
    }



    useEffect(() => {
        const convertParam: any = {
            limit: 10,
            fields: ["$all"],
            filter: {},
            order: [["created_at_unix_timestamp", "desc"]]
        };
        if (typeFilter === 'title') {
            if (valueSearch !== "") {
                convertParam.filter = { "title": { "$iLike": `%${valueSearch}%` } }
            }
        }
        if (typeFilter === 'nickname') {
            if (valueSearch !== "") {
                convertParam.fields = ["$all", { "user": ["$all", { "$filter": { "nickname": { "$iLike": `%${valueSearch}%` } } }] }, { "category": ["$all", { "thema": ["$all"] }] }, { "events": ["$all"] }]
                convertParam.filter = {}
            }
        }
        if (typeFilter === 'username') {
            if (valueSearch !== "") {
                convertParam.fields = ["$all", { "user": ["$all", { "$filter": { "username": { "$iLike": `%${valueSearch}%` } } }] }, { "category": ["$all", { "thema": ["$all"] }] }, { "events": ["$all"] }]
                convertParam.filter = {}
            }
        }
        shopApi
            .getList({
                limit: convertParam.limit,
                fields: JSON.stringify(convertParam.fields),
                filter: JSON.stringify(convertParam.filter),
            })
            .then((res: any) => {
                setListShop(res.results.objects.rows);
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }, [typeFilter, valueSearch])
    return (
        <>
            <div onClick={() => { setOpenListShopFilter(true) }}>
                <BaseInput
                    title="매장 복사 기능"
                    placeholder="복사할 매장을 검색해주세요"
                    value={value?.title}
                />
            </div>
            {openListShopFilter &&
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-end'>
                        <CloseOutlined className="text-2xl text-gray-500 cursor-pointer" onClick={() => setOpenListShopFilter(false)} />
                    </div>
                    <div className='flex gap-2'>
                        <BaseInputSelect
                            className="flex w-1/4"
                            options={listTypeFilter}
                            defaultValue={listTypeFilter[0]}
                            value={typeFilter}
                            allowClear={false}
                            onChange={(value) => setTypeFilter(value)}
                        />
                        <BaseInput
                            placeholder="Search user with ID or Nickname"
                            className="flex-1"
                            styleInputContainer='h-[40px]'
                            value={valueSearch}
                            onChange={(value) => {
                                setValueSearch(value);
                            }}
                            iconLeft={
                                <SearchOutlined className="mr-3 text-lg text-darkNight500" />
                            }
                        />
                    </div>

                    {listShop.length > 0 ? <div className='flex flex-col gap-2 h-[200px] overflow-auto'>
                        {listShop.map((shop: any) => {
                            return (
                                <div key={shop.id} className='flex items-center gap-3 cursor-pointer' onClick={() => handleSelectedShop(shop)}>
                                    <img src={shop.images[0] || Images.avatarEmpty} alt="avatar" className="w-10 h-10 rounded-full" />
                                    <div className='flex '>
                                        {shop.title && <p>{shop.title}</p>}
                                        <p>{shop.username}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div> : (
                        <div className='flex flex-col gap-2 h-[200px] justify-center items-center'>
                            <img src={Images.dataEmpty} alt="avatar" className="w-10 h-10 rounded-full" />
                            <BaseText locale>No data</BaseText>
                        </div>
                    )}
                </div>
            }
        </>
    )
}