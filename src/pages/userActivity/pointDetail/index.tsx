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

interface IProps {
    dataUser: User;
}

export const PointDetail = (props: IProps) => {
    const { dataUser } = props;
    const navigate = useNavigate();
    const [dataListPointDetail, setDataListPointDetail] = useState<any[]>([]);
    console.log("dataListPointDetail", dataListPointDetail);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 10;

    const _getDataListPointDetail = async () => {
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
                setDataListPointDetail(res.results?.objects?.rows);
                setTotalCount(res.results?.objects?.count);
            })
            .catch((err) => {
                console.log("err getList PaymentHistory API", err);
            });
    };

    useEffect(() => {
        _getDataListPointDetail();
    }, [page]);

    return (
        <div className="">
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
