import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";
import CommunityPostTable from "../../../components/communityPostTable";
import PointDetailTable from "../../../components/pointDetailTable";
import { pointHistoryApi } from "../../../apis/pointHistoryApi";
import { Spin } from "antd";

interface IProps {
    dataUser: User;
}

export const PointDetail = (props: IProps) => {
    const { dataUser } = props;
    const navigate = useNavigate();
    const [dataListPointDetail, setDataListPointDetail] = useState<any[]>([]);
    console.log("dataListPointDetail", dataListPointDetail);
    const [loadingScreen, setLoadingScreen] = useState(false);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 10;

    const _getDataListPointDetail = async () => {
        setLoadingScreen(true);
        pointHistoryApi.getListReceivePoint({
            fields: JSON.stringify([
                "$all",
                {
                    user: ["$all"],
                },
            ]),
            filter: JSON.stringify({
                user_id: `${dataUser?.id}`,
            }),
            page: page,
            limit: limit,
        })
            .then((res: any) => {
                setLoadingScreen(false);
                setDataListPointDetail(res.results?.objects?.rows);
                setTotalCount(res.results?.objects?.count);
            })
            .catch((err) => {
                setLoadingScreen(false);
                console.log("err listPointDetail API", err);
            });
    };

    useEffect(() => {
        _getDataListPointDetail();
    }, [page]);

    return (
        <div className="">
            <Spin spinning={loadingScreen} tip="Loading..." size="large" fullscreen />
            <PointDetailTable
                data={dataListPointDetail}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: totalCount,
                    onChange: (page: number, pageSize: number) => {
                        setPage(page);
                    },
                }}
            />
        </div>
    );
};
