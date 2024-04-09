import { CloseOutlined } from "@ant-design/icons";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { classNames } from "../../utils/common";
import CustomButton from "../button";
import BaseText from "../text";
import { Modal } from "antd";
import BaseButton from "../baseButton";

interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  width?: any;
  children: ReactNode;
  bodyStyle?: any;
  styleTitle?: string;
  disableSubmitBtn?: boolean;
  nameCancel?: string;
  nameConfirm?: string;
  styleButtonCancel?: string;
  styleButtonConfirm?: string;
  typeButtonConfirm?: "primary" | "default" | "danger";
  isHideAction?: boolean;
  afterOpenChange?: any;
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
    typeButtonConfirm,
    afterOpenChange,
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
      afterOpenChange={afterOpenChange}
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
      <div className="max-h-[80vh] px-6 py-4 overflow-auto">{children}</div>
      {!isHideAction && (
        <div className="flex gap-4 px-6 py-4 border-t border-darkNight100 sm:px-6">
          <BaseButton
            onClick={closeModal}
            type="default"
            className={styleButtonCancel}
          >
            {nameCancel || "Cancel"}
          </BaseButton>
          <BaseButton
            onClick={submitModal}
            className={styleButtonConfirm}
            type={typeButtonConfirm}
            disabled={disableSubmitBtn}
          >
            {nameConfirm || "Confirm"}
          </BaseButton>
        </div>
      )}
    </Modal>
  );
};
