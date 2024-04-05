import { BaseText } from "../../../components";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { classNames } from "../../../utils/common";
import { useTranslation } from "react-i18next";

interface IListCategoryPart {
    title: string;
    value: string;
    placeholder?: string;
    onClick: () => void;
}

export const ListCategoryPart1 = (props: IListCategoryPart) => {
    const { title, value, placeholder, onClick } = props;
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-2">
            <BaseText locale size={16} bold>
                {title}
            </BaseText>
            <div className="flex justify-between p-3 rounded-lg bg-darkNight50" onClick={onClick}>
                <BaseText size={16} className={classNames(value ? "" : 'text-darkNight300')}>{t(value || placeholder || "")}</BaseText>
                <DownOutlined />
            </div>
        </div>
    )
};