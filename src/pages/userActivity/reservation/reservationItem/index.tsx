import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseText } from "../../../../components";
import Images from "../../../../assets/gen";

interface IProps {
    dataItem?: any;
}

export const ReservationItem = (props: IProps) => {
    const { dataItem } = props;
    console.log("dataItem", dataItem);
    const navigate = useNavigate();
    const [dataReservation, setDataReservation] = useState<any[]>([]);
    console.log("dataReservation", dataReservation);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    // const limit = 10;

    return (
        <div className="flex flex-col p-6 border rounded-lg border-darkNight300 bg-darkNight50">
            <div className="flex items-center justify-between mb-2">
                <div className="relative pr-6">
                    <img src={Images.hourglassIcon} alt="img" className="w-8 h-8" />
                    <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                        <BaseText locale bold size={12} color="text-white">확인</BaseText>
                    </div>
                </div>
                <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                <div className="relative pr-6">
                    <img src={Images.reservationConfirmedInactive} alt="img" className="w-8 h-8" />
                    {/* <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                        <BaseText locale bold size={12} color="text-white">확인</BaseText>
                    </div> */}
                </div>
                <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                <div className="relative">
                    <img src={Images.checkedCircleInactive} alt="img" className="w-8 h-8" />
                    {/* <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                        <BaseText locale bold size={12} color="text-white">확인</BaseText>
                    </div> */}
                </div>
            </div>
            <BaseText bold size={16} className="mb-1" color="text-primary">예약가능 여부 확인중</BaseText>
            <BaseText className="mb-3">(6월17일 21:00 접수)</BaseText>
            <div className="flex justify-between p-4 rounded-lg bg-darkNight100">
                <div className="flex items-center gap-2">
                    <img src={Images.avatarEmpty} alt="img" className="rounded-lg w-11 h-11" />
                    <BaseText bold>0000님</BaseText>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center gap-2 px-3 py-2 bg-white border rounded-xl border-primary">
                        <img src={Images.phoneIconBlue} alt="img" className="w-4 h-4 rounded-lg" />
                        <BaseText bold locale color="text-primary">통화하기</BaseText>
                        <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
                    </div>
                    <div className="relative flex items-center gap-2 px-3 py-2 bg-white border rounded-xl border-primary">
                        <img src={Images.messageIconBlue} alt="img" className="w-4 h-4 rounded-lg" />
                        <BaseText bold locale color="text-primary">채팅</BaseText>
                        <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>예약 날짜</BaseText>
                <BaseText bold>7월18일(월)</BaseText>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>예약 시간</BaseText>
                <BaseText bold>17:30</BaseText>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>예약 메뉴</BaseText>
                <div className="flex flex-col">
                    <BaseText bold>마사지 2인 + 샴푸 1인</BaseText>
                    <BaseText bold color="text-">총 3개  100,000 원</BaseText>
                </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>결제방식</BaseText>
                <BaseText bold color="text-primary">{dataItem?.paymentMethod}</BaseText>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>메모</BaseText>
                <BaseText bold>{dataItem?.memo}</BaseText>
            </div>
        </div>
    );
};
