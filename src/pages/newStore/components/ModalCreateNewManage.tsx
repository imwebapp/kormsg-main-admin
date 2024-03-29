import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modal/BaseModal'
import { BaseText } from '../../../components'
import { classNames } from '../../../utils/common'
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: any) => void;
    data: {
        image: string;
        name: string;
        description: string;
    };
    onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ModalCreateNewManage = (props: IProps) => {
    const { isOpen, onClose, onSubmit, onImageChange, data } = props

    const [dataNewManage, setDataNewManage] = useState<any>(data);
    const [image, setImage] = useState<string>(data?.image || Images.avatarEmpty);

    const handleInputChangeNewManage = (name: string, value: any) => {
        setDataNewManage({ ...dataNewManage, [name]: value });
    };
    const handleCloseModalCreateNewManage = () => {
        onClose && onClose();
    }
    const handleSubmitCreateNewManage = () => {
        onSubmit && onSubmit(dataNewManage);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            onImageChange && onImageChange(e);
        }
    };

    useEffect(() => {
        data && setDataNewManage(data);
        data?.image && setImage(data.image);
    }, [data]);
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleCloseModalCreateNewManage}
            onSubmit={handleSubmitCreateNewManage}
            title="담당자 등록"
            disableSubmitBtn={!dataNewManage}
        >

            <div className="flex flex-col gap-4">
                <BaseText locale size={16} bold>
                    담당자 이미지
                </BaseText>
                <div className={classNames(" flex items-center pl-6")}>
                    <input
                        type="file"
                        accept="image/*"
                        id="avatarInput"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <label
                        htmlFor="avatarInput"
                        className={classNames("relative inline-block")}
                    >
                        <img
                            src={image}
                            className={classNames(
                                "w-20 h-20 rounded-full mx-auto mb-5 cursor-pointer"
                            )}
                            alt="Avatar"
                        />
                        <div className="absolute right-0 items-center justify-center p-1 bg-white rounded-full cursor-pointer bottom-4">
                            <img
                                src={Images.cameraBlue}
                                className={classNames("w-6 h-6 cursor-pointer")}
                                alt="Avatar"
                            />
                        </div>
                    </label>
                </div>
                <BaseInput
                    title="이름"
                    placeholder="추천 관리사"
                    value={dataNewManage.name}
                    onChange={(value) => handleInputChangeNewManage('name', value)}
                />
                <BaseInput
                    title="소개"
                    placeholder="너무 잘하고 착합니다. 당골지명 많은 분이세요"
                    value={dataNewManage.description}
                    onChange={(value) => handleInputChangeNewManage('description', value)}
                    textArea
                />
            </div>
        </BaseModal>
    )
}