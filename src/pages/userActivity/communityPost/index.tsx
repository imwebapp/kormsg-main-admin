import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";
import CommunityPostTable from "../../../components/communityPostTable";
import { postApi } from "../../../apis/postApi";
import { Spin } from "antd";

interface IProps {
  dataUser: User;
  count?: number;
}

export const CommunityPost = (props: IProps) => {
  const { dataUser } = props;
  const navigate = useNavigate();
  const [dataListCommunityPost, setDataListCommunityPost] = useState<any[]>([]);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const _getDataListCommunityPost = async () => {
    setLoadingScreen(true);
    postApi
      .getList({
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
        setDataListCommunityPost(res?.results?.objects?.rows);
        setTotalCount(res?.results?.objects?.count);
      })
      .catch((err: any) => {
        setLoadingScreen(false);

        console.log("err _getDataListCommunityPost API", err);
      });
  };

  useEffect(() => {
    _getDataListCommunityPost();
  }, [page]);

  return (
    <div className="">
      <Spin spinning={loadingScreen} tip="Loading..." size="large" fullscreen />
      <CommunityPostTable
        onRefresh={(value) => {
          if (value === true) {
            _getDataListCommunityPost();
          }
        }}
        data={dataListCommunityPost}
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
