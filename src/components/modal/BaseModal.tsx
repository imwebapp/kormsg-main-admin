import { CloseOutlined } from '@ant-design/icons';
import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { classNames } from '../../utils/common';
import CustomButton from '../button';
import BaseText from '../text';

interface BaseModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit: () => void;
    title?: string;
    children: ReactNode;
    styleTitle?: string;
    disableSubmitBtn?: boolean;
    nameCancel?: string;
    nameConfirm?: string;
}

export const BaseModal = (props: BaseModalProps) => {
    const { isOpen, onSubmit, onClose, title, children, disableSubmitBtn, nameCancel, nameConfirm, styleTitle } = props;
    const [isShown, setIsShown] = useState<boolean>(isOpen);

    const closeModal = () => {
        setIsShown(false);
        onClose && onClose();
    };

    const submitModal = () => {
        onSubmit();
        setIsShown(false);
    };
    const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {
        setIsShown(isOpen);
    }, [isOpen]);

    return (
        <>
            {isShown && (
                <div className="fixed inset-0 z-10">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-black opacity-50" onClick={handleOutsideClick}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="flex items-center justify-between px-6 py-4 bg-white rounded-lg">
                                <BaseText bold locale size={20} className={classNames("font-bold text-left text-darkNight900", styleTitle)}>{title}</BaseText>
                                <CloseOutlined onClick={closeModal} className="text-2xl text-gray-500 cursor-pointer" />
                            </div>
                            <div className="max-h-[72vh] px-6 py-4 overflow-auto">
                                {children}
                            </div>
                            <div className="flex gap-4 px-6 py-4 border-t border-darkNight100 sm:px-6">
                                <CustomButton
                                    onClick={closeModal}
                                    locale
                                    className="w-full"
                                >
                                    {nameCancel || 'Cancel'}
                                </CustomButton>
                                <CustomButton
                                    onClick={submitModal}
                                    type='primary'
                                    locale
                                    className="w-full"
                                    disabled={disableSubmitBtn}
                                >
                                    {nameConfirm || 'Confirm'}
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
