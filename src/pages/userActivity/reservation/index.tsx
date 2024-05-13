import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard, CustomButton } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";
import CommunityPostTable from "../../../components/communityPostTable";
import PointDetailTable from "../../../components/pointDetailTable";
import { reservationApi } from "../../../apis/reservationApi";
import { ReservationItem } from "./reservationItem";
import { Spin } from "antd";
import { ListTypeUserActivity, ListTypeUserActivityReservation, TypeUserActivity } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

interface IProps {
    dataUser: User;
}

export const Reservation = (props: IProps) => {
    const { dataUser } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [dataReservation, setDataReservation] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    console.log("dataReservation", dataReservation);
    const [loadingScreen, setLoadingScreen] = useState(false);

    const [typeUserSelected, setTypeUserSelected] = useState<any>(
        ListTypeUserActivityReservation[0]
    );
    // const limit = 10;

    const handleClickTypeUser = (item: any) => {
        setTypeUserSelected(item);
    };

    const _getDataListPointDetail = async () => {
        setLoadingScreen(true)
        reservationApi.getList({
            fields: JSON.stringify([
                "$all",
                {
                    user: ["$all"],
                },
            ]),
            filter: JSON.stringify({
                user_id: `${dataUser.id}`,
            }),
            // page: page,
            // limit: limit,
        })
            .then((res: any) => {
                setLoadingScreen(false)
                setDataReservation(res.results?.objects?.rows);
                setTotalCount(res.results?.objects?.count);
            })
            .catch((err) => {
                setLoadingScreen(false)
                console.log("err getList dataReservation API", err);
            });
    };

    useEffect(() => {
        _getDataListPointDetail();
    }, []);

    return (
        <>
            <div className={classNames("flex flex-row gap-3 items-center")}>
                {ListTypeUserActivityReservation.map((item, index) => {
                    let count = 0;
                    // switch (item.id) {
                    //     case TypeUserActivity.COMMUNITY_POST:
                    //         count = countUserActivity.countPost;
                    //         break;
                    //     case TypeUserActivity.COMMENT:
                    //         count = countUserActivity.countReview;
                    //         break;
                    //     case TypeUserActivity.RESERVATION:
                    //         count = countUserActivity.countReservation;
                    //         break;
                    //     case TypeUserActivity.POINT_DETAIL:
                    //         count = countUserActivity.countPointHistory;
                    //         break;
                    //     case TypeUserActivity.CHAT:
                    //         count = countUserActivity.countChat;
                    //         break;
                    //     default:
                    //         break;
                    // }

                    return (
                        <CustomButton
                            className="text-base font-medium"
                            style={{
                                backgroundColor:
                                    typeUserSelected.id === item.id ? "blue" : "white",
                                color: typeUserSelected.id === item.id ? "white" : "gray",
                            }}
                            onClick={() => handleClickTypeUser(item)}
                        >
                            {t(item.name)}
                            {" (" + count + ")"}
                        </CustomButton>
                    );
                })}
            </div>
            <div className="grid grid-cols-3 gap-6 ">
                <Spin spinning={loadingScreen} tip="Loading..." size="large" fullscreen />
                {
                    dataReservation.map((item, index) => (
                        <ReservationItem key={index} dataItem={item} />
                    ))
                }
            </div>
        </>
    );
};
