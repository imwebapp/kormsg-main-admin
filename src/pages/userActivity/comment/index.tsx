import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";
import CommunityPostTable from "../../../components/communityPostTable";
import CommentTable from "../../../components/commentTable";
import { reviewApi } from "../../../apis/reviewApi";
import { Spin } from "antd";
interface IProps {
  dataUser: User;
}

export const Comment = (props: IProps) => {
  const { dataUser } = props;
  const navigate = useNavigate();
  const [dataListComment, setDataListComment] = useState<any[]>([]);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const _getDataListComment = async () => {
    setLoadingScreen(true);
    reviewApi
      .getList({
        fields: JSON.stringify([
          "$all",
          {
            user: ["$all"],
            parent: [
              "$all",
              {
                user: ["$all"],
              },
            ],
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
        setDataListComment(res.results?.objects?.rows);
        setTotalCount(res.results?.objects?.count);
      })
      .catch((err: any) => {
        setLoadingScreen(false);
        console.log("err _getDataListComment", err);
      });
  };

  useEffect(() => {
    _getDataListComment();
  }, [page]);

  return (
    <div className="">
      <Spin spinning={loadingScreen} tip="Loading..." size="large" fullscreen />
      <CommentTable
        onRefresh={(value) => {
          if (value === true) {
            _getDataListComment();
          }
        }}
        data={dataListComment}
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
