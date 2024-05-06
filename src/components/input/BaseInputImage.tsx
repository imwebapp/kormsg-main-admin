import { CheckOutlined } from '@ant-design/icons';
import { ConfigProvider, Select, SelectProps } from 'antd';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/common';
import BaseText from '../text';
import { useTranslation } from 'react-i18next';
import Images from '../../assets/gen';

interface IProps {
    type?: string;
    onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    src?: string;
    onDelImage?: () => void
    className?: string; // for tailwindcss
    description?: boolean;
}

export const BaseInputImage = (props: IProps) => {
    const { src, onImageChange, onDelImage, className, description, ...restProps } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string>('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event?.target?.files) {
            setImage(URL.createObjectURL(event?.target?.files[0]));
            onImageChange && onImageChange(event);
        }
    };

    const handleImageDelete = () => {
        setImage('');
        onDelImage && onDelImage();
    };

    const handleAddImageClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        if (src) {
            setImage(src)
        }
    }, [src])

    return (
        <div className={classNames('flex', className)}>
            <input
                ref={fileInputRef}
                type='file'
                accept="image/*"
                hidden
                onChange={(e) => {
                    handleImageChange(e)
                }}
            />
            {image ? (
                <div
                    className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50"
                    onClick={handleImageDelete}
                >
                    <img
                        src={Images.closeCircle}
                        className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2"
                        alt="closeCircle"
                    />
                    <img
                        src={image}
                        className="w-full h-full rounded-lg"
                        alt="Image"
                        onClick={handleAddImageClick}
                    />

                </div>
            ) : (
                <div
                    className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50"
                    onClick={handleAddImageClick}
                >
                    <img
                        src={Images.exportIcon}
                        className="w-8 h-8"
                        alt="Image"
                    />
                    {description && (<BaseText locale size={16} bold>대표</BaseText>)}
                </div>
            )}
        </div>
    );
}


