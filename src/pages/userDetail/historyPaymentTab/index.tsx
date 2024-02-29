import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";

export const HistoryPaymentTab = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <HistoryPaymentTable />
    </div>
  );
};
