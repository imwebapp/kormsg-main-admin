import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";
import CommunityPostTable from "../../../components/communityPostTable";
import PointDetailTable from "../../../components/pointDetailTable";


const dataMock = [
    {
        id: 1,
        date: "2022-09-09",
        username: 'username@gmail.com',
        contact: '0988777666',
        transactionType: "플러스",
        pointType: "앱으로 예약하기",
        acquiredPoint: 100,
        totalHoldingPort: 1000,
    },
    {
        id: 2,
        date: "2022-06-06",
        username: 'username2@gmail.com',
        contact: '0987654321',
        transactionType: "마이너스",
        pointType: "보너스",
        acquiredPoint: -100,
        totalHoldingPort: 3000,
    },
]
interface IProps {
    dataUser: User;
}

export const PointDetail = (props: IProps) => {
    const { dataUser } = props;
    const navigate = useNavigate();
    const [dataListPointDetail, setDataListPointDetail] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 10;

    const _getDataListPointDetail = async () => {
        //call API

        // userApi
        //   .getListPaymentHistory({
        //     fields: JSON.stringify([
        //       "$all",
        //     ]),
        //     filter: JSON.stringify({
        //       user_id: `${dataUser.id}`,
        //     }),
        //     page: page,
        //     limit: limit,
        //   })
        //   .then((res: any) => {
        //     setDataHistory(res.results?.objects?.rows);
        //     setTotalCount(res.results?.objects?.count);
        //   })
        //   .catch((err) => {
        //     console.log("err getList PaymentHistory API", err);
        //   });

        setDataListPointDetail(dataMock);
        setTotalCount(dataMock.length);
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
