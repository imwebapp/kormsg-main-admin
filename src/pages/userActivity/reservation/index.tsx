import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { reservationApi } from "../../../apis/reservationApi";
import { CustomButton } from "../../../components";
import { User, classNames } from "../../../utils/common";
import { ListTypeUserActivityReservation, RESERVATION_STATUS } from "../../../utils/constants";
import { ReservationItem } from "./reservationItem";

interface IProps {
    dataUser: User;
}

export const Reservation = (props: IProps) => {
    const { dataUser } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loadingScreen, setLoadingScreen] = useState(false);

    // const limit = 10;
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [dataReservation, setDataReservation] = useState<any[]>([]);

    const [typeUserReservationSelected, setTypeUserReservationSelected] = useState<any>(
        ListTypeUserActivityReservation[0]
    );
    const [countUserActivityReservation, setCountUserActivityReservation] = useState<any>({
        total: 0,
        pending: 0,
        approve: 0,
        unsuccess: 0,
        complete: 0,
        reject: 0,
        cancel: 0,
    });

    const handleClickTypeUserReservation = (item: any) => {
        setTypeUserReservationSelected(item);
    };

    const _getDataListPointDetail = () => {
        setLoadingScreen(true)
        const convertFilter: any = {
            user_id: `${dataUser.id}`,
        };
        if (typeUserReservationSelected.id === RESERVATION_STATUS.CANCELLED) {
            convertFilter["state"] = { "$in": ["CANCELLED", "REJECTED"] };
        }
        else if (typeUserReservationSelected.id === RESERVATION_STATUS.ALL) {
        }
        else {
            convertFilter["state"] = typeUserReservationSelected.id;
        }

        reservationApi.getList({
            fields: JSON.stringify([
                "$all",
                {
                    user: ["$all"],
                },
            ]),
            filter: JSON.stringify(convertFilter),
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

    const _getCountReservation = () => {
        const convertFilter: any = {
            user_id: `${dataUser.id}`,
        };

        reservationApi.getCountReservation({
            filter: JSON.stringify(convertFilter),
        })
            .then((res: any) => {
                setCountUserActivityReservation(res?.results?.object)
            })
            .catch((err) => {
                console.log("err getCount dataReservation API", err);
            });
    };

    useEffect(() => {
        _getDataListPointDetail();
    }, [typeUserReservationSelected]);

    useEffect(() => {
        _getCountReservation();
    }, []);

    return (
        <>
            <div className={classNames("flex flex-row gap-3 items-center")}>
                {ListTypeUserActivityReservation.map((item, index) => {
                    let count = 0;
                    switch (item.id) {
                        case RESERVATION_STATUS.ALL:
                            count = countUserActivityReservation.total;
                            break;
                        case RESERVATION_STATUS.PENDING:
                            count = countUserActivityReservation.pending;
                            break;
                        case RESERVATION_STATUS.APPROVED:
                            count = countUserActivityReservation.approve;
                            break;
                        case RESERVATION_STATUS.COMPLETED:
                            count = countUserActivityReservation.complete;
                            break;
                        case RESERVATION_STATUS.CANCELLED:
                            count = countUserActivityReservation.reject + countUserActivityReservation.cancel;
                            break;
                        default:
                            break;
                    }

                    return (
                        <CustomButton
                            className="text-base font-medium"
                            style={{
                                backgroundColor:
                                    typeUserReservationSelected.id === item.id ? "blue" : "white",
                                color: typeUserReservationSelected.id === item.id ? "white" : "gray",
                            }}
                            onClick={() => handleClickTypeUserReservation(item)}
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
