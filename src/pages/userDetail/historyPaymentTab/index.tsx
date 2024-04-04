import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";

interface Iprops {
  dataUser: User;
}

export const HistoryPaymentTab = (props: Iprops) => {
  const { dataUser } = props;
  const navigate = useNavigate();
  const [dataHistory, setDataHistory] = useState<any[]>([]);

  useEffect(() => {
    userApi
      .getListPaymentHistory({
        fields: JSON.stringify([
          "$all",
        ]),
        filter: JSON.stringify({
          user_id: `${dataUser.id}`,
        }),
        limit: 50,
        page: 1,
      })
      .then((res: any) => {
        console.log("res getList PaymentHistory API", res.results?.objects?.rows);
        setDataHistory(res.results?.objects?.rows);
      })
      .catch((err) => {
        console.log("err getList PaymentHistory API", err);
      });
  }, []);

  return (
    <div className="p-6">
      <HistoryPaymentTable data={dataHistory} />
    </div>
  );
};
