
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../../utils/common";
import { BaseText } from "../../../../components";
import Images from "../../../../assets/gen";
import { Url } from "../../../../routers/paths";

interface IItemShop {
  id: string;
  avatar: string;
  name: string;
  timeOpening: string;
  hashtag: string[];
  item?: any;
  className?: string;
  onClick: (id: number | string) => void;
}

export const ItemShop = (props: IItemShop) => {
  const { id, avatar, name, timeOpening, hashtag, item, className, onClick } = props;
  const navigate = useNavigate();

  return (
    <div className={classNames(className || 'flex flex-col cursor-pointer gap-2')} onClick={() => onClick(id)}>
      <div className="relative">
        <img src={avatar ? avatar : "https://via.placeholder.com/300"} alt="avatar" className="w-full mb-1 rounded-xl h-72" />
        <img src={Images.edit2} alt="avatar" className="absolute p-2 bg-white rounded-full shadow-lg w-9 h-9 top-2 right-2"
          onClick={(event) => {
            event.stopPropagation(); // Stop event propagation
            navigate(Url.newStore, { state: { dataEdit: item } });
          }} />
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