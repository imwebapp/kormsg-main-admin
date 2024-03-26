import { CloseOutlined } from "@ant-design/icons";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { classNames } from "../../utils/common";
import CustomButton from "../button";
import BaseText from "../text";
import { Modal } from "antd";

interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  width?: any,
  children: ReactNode;
  bodyStyle?: any;
  styleTitle?: string;
  disableSubmitBtn?: boolean;
  nameCancel?: string;
  nameConfirm?: string;
  styleButtonCancel?: string;
  styleButtonConfirm?: string;
  isHideAction?: boolean;
}

export const BaseModal2 = (props: BaseModalProps) => {
  const {
    isOpen,
    onSubmit,
    onClose,
    width,
    isHideAction,
    title,
    children,
    disableSubmitBtn,
    nameCancel,
    nameConfirm,
    styleTitle,
    styleButtonCancel,
    styleButtonConfirm,
  } = props;
  const [isShown, setIsShown] = useState<boolean>(isOpen);

  const closeModal = () => {
    setIsShown(false);
    onClose && onClose();
  };

  const submitModal = () => {
    onSubmit && onSubmit();
    setIsShown(false);
  };

  useEffect(() => {
    setIsShown(isOpen);
  }, [isOpen]);

  return (
    <Modal
      centered
      width={width}
      open={isShown}
      onCancel={() => {
        closeModal();
      }}
      closable={false}
      footer={null}
    >
      <div className="flex items-center justify-between px-6 py-4 bg-white rounded-lg">
        <BaseText
          bold
          locale
          size={20}
          className={classNames(
            "font-bold text-left text-darkNight900",
            styleTitle
          )}
        >
          {title}
        </BaseText>
        <CloseOutlined
          onClick={closeModal}
          className="text-2xl text-gray-500 cursor-pointer"
        />
      </div>
      <div className="max-h-[70vh] px-6 py-4 overflow-auto">{children}</div>
      {!isHideAction && (
        <div className="flex gap-4 px-6 py-4 border-t border-darkNight100 sm:px-6">
          <CustomButton
            onClick={closeModal}
            locale
            bold
            className={classNames(" w-full py-6", styleButtonCancel)}
          >
            {nameCancel || "Cancel"}
          </CustomButton>
          <CustomButton
            onClick={submitModal}
            primary
            locale
            bold
            className={classNames("w-full py-6", styleButtonConfirm)}
            disabled={disableSubmitBtn}
          >
            {nameConfirm || "Confirm"}
          </CustomButton>
        </div>
      )}
    </Modal>
  );
};
