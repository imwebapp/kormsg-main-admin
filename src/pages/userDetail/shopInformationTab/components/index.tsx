
import { useNavigate } from "react-router-dom";
import { ceilRemainingTime, classNames, mathRemainingTime } from "../../../../utils/common";
import { BaseText } from "../../../../components";
import Images from "../../../../assets/gen";
import { Url } from "../../../../routers/paths";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface IItemShop {
  id: string;
  avatar: string;
  name: string;
  timeOpening: string;
  hashtag: string[];
  item?: any;
  className?: string;
  onClick: (id: number | string) => void;
  onShopSelected?: ({ id, checked }: { id: string; checked: boolean }) => void;
  isUnCheck?: boolean;
}

export const ItemShop = (props: IItemShop) => {
  const { id, avatar, name, timeOpening, hashtag, item, className, onClick, onShopSelected, isUnCheck } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const onChange = (e: CheckboxChangeEvent, id: string) => {
    const isChecked = e.target.checked;
    setChecked(isChecked); // Update the state of checkbox
    onShopSelected && onShopSelected({ id, checked: isChecked });
  };
  const handleItemClick = () => {
    setChecked(!checked);
    onShopSelected && onShopSelected({ id, checked: !checked });
  };
  useEffect(() => {
    if (isUnCheck) setChecked(false);
  }, [isUnCheck]);

  return (
    <div className={classNames(className || 'flex flex-col cursor-pointer gap-2')}>
      <div className="relative" onClick={handleItemClick}>
        <img src={avatar ? avatar : "https://via.placeholder.com/300"} alt="avatar" className="w-full mb-1 rounded-xl h-72" />
        {checked && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <div className="flex flex-col items-center px-4 py-3 rounded-lg backdrop-blur-md">
              <BaseText size={16} medium color='text-white'>
                {`${moment(parseInt(item.start_date)).format(
                  "YYYY-MM-DD"
                )} ~ ${moment(parseInt(item.expired_date)).format("YYYY-MM-DD")}`}
              </BaseText>
              <BaseText size={16} medium color='text-white'>
                {mathRemainingTime(item.expired_date) >= 0
                  ? ceilRemainingTime(item.expired_date) + t('days left')
                  : "Expired"}
              </BaseText>
            </div>
          </div>
        )}
        <img src={Images.edit2} alt="avatar" className="absolute p-2 bg-white rounded-full shadow-lg w-9 h-9 top-2 right-2"
          onClick={(event) => {
            event.stopPropagation(); // Stop event propagation
            navigate(Url.newStore, { state: { dataEdit: item } });
          }} />
        <Checkbox
          className="absolute p-2 top-2 left-2"
          onChange={(e: CheckboxChangeEvent) => onChange(e, id)}
          checked={checked} // Set the checked state of the checkbox
          onClick={(event) => {
            event.stopPropagation(); // Stop event propagation
          }}
        />
      </div>
      <BaseText bold size={20} className="truncate">{name}</BaseText>
      <div className="flex gap-2 py-1 pl-1 pr-3 bg-neutral9 rounded-[32px] items-center">
        <BaseText locale size={16} bold className="py-1 px-2 bg-white rounded-[32px]">Open</BaseText>
        <BaseText size={16} medium>{timeOpening}</BaseText>
      </div>
      <div className="flex gap-2 truncate">
        {hashtag.map((item, index) => (
          <BaseText key={index} className="flex pt-1 px-[6px] pb-[6px] bg-neutral9 rounded-[4px] items-center">{item}</BaseText>
        ))}
      </div>
    </div>
  )
};