import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";

interface Iprops {
  dataUser: User;
}

export const HistoryPaymentTab = (props: Iprops) => {
  const { dataUser } = props;
  const navigate = useNavigate();
  const [dataHistory, setDataHistory] = useState<any[]>([]);

  useEffect(() => {
    historyApi.getList(
      {
        fields: JSON.stringify(["$all", { "user": ["$all"] }, { "shop": ["$all"] }]),
        filter: JSON.stringify({ "user_id": `${dataUser.id}`, "type_1": "JUMP_UP" }),
        limit: 50,
        page: 1
      }
    ).then((res) => {
      console.log('res getList HISTORY API', res.results.objects.rows);
      setDataHistory((res.results.objects.rows))
    })
      .catch((err) => {
        console.log('err getList SHOP API', err);
      });
  }, [])

  return (
    <div className="p-6">
      <HistoryPaymentTable data={dataHistory} />
    </div>
  );
};
