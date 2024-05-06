import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";

interface IProps {
  dataUser: User;
}

export const HistoryPaymentTab = (props: IProps) => {
  const { dataUser } = props;
  const navigate = useNavigate();
  const [dataHistory, setDataHistory] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const _getHistory = async () => {
    userApi
      .getListPaymentHistory({
        fields: JSON.stringify([
          "$all",
        ]),
        filter: JSON.stringify({
          user_id: `${dataUser.id}`,
        }),
        page: page,
        limit: limit,
      })
      .then((res: any) => {
        setDataHistory(res.results?.objects?.rows);
        setTotalCount(res.results?.objects?.count);
      })
      .catch((err) => {
        console.log("err getList PaymentHistory API", err);
      });
  };

  useEffect(() => {
    _getHistory();
  }, [page]);

  return (
    <div className="p-6">
      <HistoryPaymentTable
        data={dataHistory}
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
