import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import HistoryPaymentTable from "../../../components/historyPaymentTable";
import { BaseCard } from "../../../components";
import { useEffect, useState } from "react";
import { historyApi } from "../../../apis/historyApi";
import { userApi } from "../../../apis/userApi";
import CommunityPostTable from "../../../components/communityPostTable";
import CommentTable from "../../../components/commentTable";


const dataMock = [
    {
        id: 1,
        type: "reply",
        replyUser:{
            avatar: "",
            name: "Nguyen Van A",
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, purus nec scelerisque.",
        creationTime: "2021-09-09",
        suggestion: 2345,
        theOpposite: 12,
    },
    {
        id: 2,
        type: "Post comments",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, purus nec scelerisque.",
        creationTime: "2022-09-09",
        suggestion: 1123,
        theOpposite: 80,
    },
]
interface IProps {
    dataUser: User;
}

export const Comment = (props: IProps) => {
    const { dataUser } = props;
    const navigate = useNavigate();
    const [dataListComment, setDataListComment] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 10;

    const _getDataListComment = async () => {
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

        setDataListComment(dataMock);
        setTotalCount(dataMock.length);
    };

    useEffect(() => {
        _getDataListComment();
    }, [page]);

    return (
        <div className="">
            <CommentTable
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
