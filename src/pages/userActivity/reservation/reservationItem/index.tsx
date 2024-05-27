import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseText } from "../../../../components";
import Images from "../../../../assets/gen";
import moment from 'moment';
import { PAYMENT_METHODS, RESERVATION_STATUS } from "../../../../utils/constants";
import { convertDateTime } from "../../../../utils/common";
interface IProps {
    dataItem?: any;
}

const convertDate = (date: number) => {
    const dateCheck = new Date(date);
    return moment(dateCheck.toISOString()).format('YYYY-MM-DD');
};
const convertTime = (time: number) => {
    const dateCheck = new Date(time);
    return moment(dateCheck.toISOString()).format('HH:mm');
}

export const ReservationItem = (props: IProps) => {
    const { dataItem } = props;
    const navigate = useNavigate();
    const [dataReservation, setDataReservation] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    // const limit = 10;

    const checkPaymentMethod = (method?: string) => {
        switch (method) {
            case PAYMENT_METHODS.MEET_AND_TRANSFER:
                return "만남과 이동";
            case PAYMENT_METHODS.MEET_AND_CASH:
                return "만나서 결제";
            case PAYMENT_METHODS.MEET_AND_CARD:
                return "만나서 카드";
            case PAYMENT_METHODS.IN_APP_PAYMENT:
                return "앱 결제";
            default:
                return '';
        }
    }

    const checkStatus = (status: string) => {
        console.log("statusWW", status);
        switch (status) {
            case RESERVATION_STATUS.PENDING:
                return (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="relative pr-10">
                                <img src={Images.hourglassIcon} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">확인</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <img src={Images.reservationConfirmedInactive} alt="img" className="w-8 h-8" />
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <img src={Images.checkedCircleInactive} alt="img" className="w-8 h-8" />
                        </div>
                        <BaseText locale bold size={16} className="mb-1" color="text-primary">예약가능 여부 확인중</BaseText>
                    </>
                );
            case RESERVATION_STATUS.APPROVED:
                return (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="relative pr-10">
                                <img src={Images.hourglassIcon} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">확인</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <div className="relative pr-10">
                                <img src={Images.reservationConfirmedActive} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">예약확정</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <img src={Images.checkedCircleInactive} alt="img" className="w-8 h-8" />
                        </div>
                        <BaseText locale bold size={16} className="mb-1" color="text-primary">예약확정</BaseText>
                    </>
                );
            case RESERVATION_STATUS.REJECTED:
                return (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="relative pr-10">
                                <img src={Images.hourglassIcon} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">확인</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <div className="relative pr-6">
                                <img src={Images.cancelCircleActive} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">Cancel</BaseText>
                                </div>
                            </div>
                        </div>
                        <BaseText locale bold size={16} className="mb-1" color="text-red-500">예약취소 완료</BaseText>
                    </>
                );
            case RESERVATION_STATUS.COMPLETED:
                return (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="relative pr-10">
                                <img src={Images.hourglassIcon} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">확인</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <div className="relative pr-10">
                                <img src={Images.reservationConfirmedActive} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">예약확정</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <img src={Images.checkedCircleActive} alt="img" className="w-8 h-8" />
                        </div>
                        <BaseText locale bold size={16} className="mb-1" color="text-primary">이용완료</BaseText>
                    </>
                );

            case RESERVATION_STATUS.CANCELLED:
                return (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="relative pr-10">
                                <img src={Images.hourglassIcon} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">확인</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <div className="relative pr-10">
                                <img src={Images.reservationConfirmedActive} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">확인</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <div className="relative pr-6">
                                <img src={Images.cancelCircleActive} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={12} color="text-white">Cancel</BaseText>
                                </div>
                            </div>
                        </div>
                        <BaseText locale bold size={16} className="mb-1" color="text-red-500">예약불가</BaseText>
                    </>
                );
            default:
                return (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="relative pr-10">
                                <img src={Images.hourglassIcon} alt="img" className="w-8 h-8" />
                                <div className="absolute bottom-0 flex items-center justify-center px-2 left-4 rounded-2xl bg-primary">
                                    <BaseText locale bold size={10} color="text-white">확인</BaseText>
                                </div>
                            </div>
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <img src={Images.reservationConfirmedInactive} alt="img" className="w-8 h-8" />
                            <img src={Images.ellipsis} alt="img" className="w-8 h-8" />
                            <img src={Images.checkedCircleInactive} alt="img" className="w-8 h-8" />
                        </div>
                        <BaseText locale bold size={16} className="mb-1" color="text-primary">예약가능 여부 확인중</BaseText>
                    </>
                );
        }
    }

    return (
        <div className="flex flex-col p-6 border rounded-lg border-darkNight300 bg-darkNight50">
            {checkStatus(dataItem?.state)}
            <BaseText className="mb-3">{convertDateTime(dataItem?.created_at)}</BaseText>
            <div className="flex justify-between p-4 rounded-lg bg-darkNight100">
                <div className="flex items-center gap-2">
                    <img src={dataItem?.user?.avatar || Images.avatarEmpty} alt="img" className="rounded-lg w-11 h-11" />
                    <BaseText bold>{dataItem?.user?.nickname}</BaseText>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center gap-2 px-3 py-2 bg-white border cursor-pointer rounded-xl border-primary">
                        <img src={Images.phoneIconBlue} alt="img" className="w-4 h-4 rounded-lg" />
                        <BaseText bold locale color="text-primary">통화하기</BaseText>
                        {/* <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" /> */}
                    </div>
                    <div className="relative flex items-center gap-2 px-3 py-2 bg-white border cursor-pointer rounded-xl border-primary">
                        <img src={Images.messageIconBlue} alt="img" className="w-4 h-4 rounded-lg" />
                        <BaseText bold locale color="text-primary">채팅</BaseText>
                        {/* <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" /> */}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>예약 날짜</BaseText>
                <BaseText bold>{convertDate(Number(dataItem?.date))}</BaseText>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>예약 시간</BaseText>
                <BaseText bold>{convertTime(Number(dataItem?.date))}</BaseText>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>예약 메뉴</BaseText>
                <div className="flex flex-col">
                    {
                        (dataItem?.prices || []).map((item: any, index: number) => {
                            return (
                                <BaseText key={index} bold>{item?.course?.title} {item?.price}원</BaseText>
                            );
                        })
                    }
                </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>결제방식</BaseText>
                <BaseText locale bold color="text-primary">{checkPaymentMethod(dataItem?.paymentMethod)}</BaseText>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-dashed">
                <BaseText locale medium>메모</BaseText>
                <BaseText bold>{dataItem?.memo}</BaseText>
            </div>
        </div>
    );
};
