import React, { useEffect, useState } from 'react'
import { BaseInput } from '../../../components/input/BaseInput'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { userApi } from '../../../apis/userApi';
import Images from '../../../assets/gen';
import { TypeUser } from '../../../utils/constants';
import { shopApi } from '../../../apis/shopApi';
import { BaseText } from '../../../components';
interface IProps {
    value: any;
    onChange: (value: any) => void;
}

export const UserFilter = (props: IProps) => {
    const { value, onChange } = props;
    const [openListUserFilter, setOpenListUserFilter] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const [listUser, setListUser] = useState([])

    const handleSelectedUser = (user: any) => {
        if (user) {
            onChange(user)
            setOpenListUserFilter(false)
        }
    }

    useEffect(() => {
        const convertFilter: any = {
            account_type: TypeUser.BIZ_USER,
        };
        if (valueSearch !== "") {
            convertFilter['$or'] = [
                { nickname: { $like: `%${valueSearch}%` } },
                { email: { $like: `%${valueSearch}%` } },
            ];
        }
        userApi
            .getList({
                limit: 50,
                fields: '["$all"]',
                filter: JSON.stringify(convertFilter),
            })
            .then((res: any) => {
                console.log("res getList User: ", res.results.objects.rows);
                setListUser(res.results.objects.rows);
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }, [valueSearch])
    return (
        <>
            <div onClick={() => { setOpenListUserFilter(true) }}>
                <BaseInput
                    title="매장 주인 회원 설정"
                    placeholder="회원을 닉네임 혹은 아이디로 검색해주세요"
                    value={value?.nickname || value?.username}
                />
            </div>
            {openListUserFilter &&
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-end'>
                        <CloseOutlined className="text-2xl text-gray-500 cursor-pointer" onClick={() => setOpenListUserFilter(false)} />
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
                    {listUser.length > 0 ? <div className='flex flex-col gap-2 h-[200px] overflow-auto'>
                        {listUser.map((user: any) => {
                            return (
                                <div key={user.id} className='flex items-center gap-3 cursor-pointer' onClick={() => handleSelectedUser(user)}>
                                    <img src={user.avatar || Images.avatarEmpty} alt="avatar" className="w-10 h-10 rounded-full" />
                                    <div className='flex '>
                                        {user.nickname && <p>{user.nickname} | </p>}
                                        <p>{user.username}</p>
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