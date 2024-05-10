import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";
import CommunityPostTable from "../../../components/communityPostTable";

const dataMock = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, purus nec scelerisque.",
    nameWriter: "Nguyen Van A",
    creationTime: "2021-09-09",
    view: 100,
    suggestion: 2345,
    theOpposite: 12,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, purus nec scelerisque.",
    nameWriter: "Nguyen Van B",
    creationTime: "2022-09-09",
    view: 1000,
    suggestion: 1123,
    theOpposite: 80,
  },
];
interface IProps {
  dataUser: User;
  count?: number;
}

export const CommunityPost = (props: IProps) => {
  const { dataUser, count } = props;
  const navigate = useNavigate();
  const [dataListCommunityPost, setDataListCommunityPost] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const _getDataListCommunityPost = async () => {
    //call API

    setDataListCommunityPost(dataMock);
    setTotalCount(dataMock.length);
  };

  useEffect(() => {
    _getDataListCommunityPost();
  }, [page]);

  return (
    <div className="">
      <CommunityPostTable
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
