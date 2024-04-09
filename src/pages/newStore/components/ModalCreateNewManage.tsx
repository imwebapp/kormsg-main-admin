import React, { useEffect, useState } from 'react'
import { BaseModal } from '../../../components/modal/BaseModal'
import { BaseText } from '../../../components'
import { classNames, generateRandomID } from '../../../utils/common'
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';
import { UploadApi } from '../../../apis/uploadApi';
interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: (data: any) => void;
    data?: {
        image: string;
        name: string;
        description: string;
    };
    onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ModalCreateNewManage = (props: IProps) => {
    const { isOpen, onClose, onSubmit, onImageChange, data } = props

    const [dataNewManage, setDataNewManage] = useState<any>({
        image: '',
        name: '',
        description: '',
    });
    const [image, setImage] = useState<string>(data?.image || Images.avatarEmpty);
    const [imageFile, setImageFile] = useState<any>(null);

    const handleInputChangeNewManage = (name: string, value: any) => {
        setDataNewManage({ ...dataNewManage, [name]: value });
    };
    const handleCloseModalCreateNewManage = () => {
        setDataNewManage(
            {
                image: '',
                name: '',
                description: '',
            }
        )
        setImage(Images.avatarEmpty);
        onClose && onClose();
    }
    const handleSubmitCreateNewManage = async () => {
        try {
            let imageUploaded = '';
            if (imageFile !== null) {
                const ResUploadImg = await UploadApi.uploadImage(imageFile);
                console.log('ResUploadImg1111', ResUploadImg);
                imageUploaded = ResUploadImg.url;
            }
            setDataNewManage(
                {
                    image: '',
                    name: '',
                    description: '',
                }
            )
            setImage(Images.avatarEmpty);
            setImageFile(null);
            const dataConvert = {
                id: generateRandomID(),
                images: [imageUploaded],
                thumbnails: [imageUploaded],
                name: dataNewManage?.name,
                description: dataNewManage?.description,
            };
            onSubmit && onSubmit(dataConvert);
        }
        catch (error: any) {
            console.log('error', error);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
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
                    placeholder="예시)홍길동"
                    value={dataNewManage.name}
                    onChange={(value) => handleInputChangeNewManage('name', value)}
                />
                <BaseInput
                    title="소개"
                    placeholder="예시) 안녕하세요  홍길동입니다 회원님들께 인사드립니다 제 주된 코스는 두피케어 피부관리 그리고 추가되어 전문적인 건식통증테라피(경혈지압과 체형교정) 아로마테라피 (다이어트 림프순환관리) 정성으로 회원님들께 보답하겠습니다"
                    value={dataNewManage.description}
                    onChange={(value) => handleInputChangeNewManage('description', value)}
                    textArea
                />
            </div>
        </BaseModal>
    )
}