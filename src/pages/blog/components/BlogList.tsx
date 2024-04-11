import { useEffect, useState } from "react";
import { BaseTable, BaseText } from "../../../components";
import { useBlogState } from "../store";
import { BlogApi } from "../../../apis/blogApi";
import { BlogInterface } from "../../../entities/blog.entity";
import { Popconfirm, TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import Images from "../../../assets/gen";
import { formatDate, formatTime } from "../../../utils/common";

export default function BlogList() {
  return (
    <div className="w-full h-full flex flex-row">
      <BuildBlogList />
      <Preview />
    </div>
  );
}

const BuildBlogList = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [page, setPage] = useState(1);
  const limit = 50;
  const { setBlog, tab, setTab } = useBlogState((state) => state);

  const columns: TableColumnsType = [
    {
      title: t("No"),
      width: 60,
      render: (value, record, index) => (
        <BaseText>{index + 1 + (page - 1) * limit}</BaseText>
      ),
    },
    {
      title: `${t("Post title")}(${count})`,
      render: ({ title }, record, index) => (
        <BaseText medium className="line-clamp-2">
          {title}
        </BaseText>
      ),
    },
    {
      title: t("Views"),
      width: 90,
      render: ({ view }, record, index) => (
        <BaseText medium className="text-primary">
          {view}
        </BaseText>
      ),
    },
    {
      title: t("Date Created"),
      render: ({ created_at }, record, index) => (
        <BaseText medium>{formatTime(created_at)}</BaseText>
      ),
    },
    {
      title: t("Actions"),
      width: 100,
      render: ({ id }, record: any) => (
        <div className="flex flex-row items-center">
          <img
            onClick={() => {
              setTab(1);
              setBlog(record);
            }}
            src={Images.edit}
            className="w-6 h-6 ml-3 cursor-pointer"
          />
          <Popconfirm
            onConfirm={() => {}}
            title={t("Delete")}
            description={t("Are you sure to delete")}
          >
            <img src={Images.trash} className="w-5 h-5 ml-3 cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const _getList = async () => {
    try {
      const { rows, count } = await BlogApi.getList({
        limit: limit,
        page,
      });
      setBlogs(rows);
      setCount(count);
    } catch (error) {}
  };

  useEffect(() => {
    _getList();
  }, [page]);

  return (
    <div className="flex-1 border-r p-6 overflow-auto no-scrollbar">
      <BaseText bold size={24} locale>
        Article list
      </BaseText>
      <BaseTable
        sticky={{ offsetHeader: -25 }}
        onRowClick={(record, index) => {
          setBlog(record);
        }}
        pagination={{
          current: page,
          pageSize: limit,
          total: count,
          onChange: (page: number, pageSize: number) => {
            setPage(page);
          },
        }}
        columns={columns}
        data={blogs}
      />
    </div>
  );
};

const Preview = () => {
  const { blog } = useBlogState((state) => state);
  return (
    <div className="max-w-[468px] min-w-[468px] p-6 overflow-auto overflow-x-hidden flex flex-col">
      <BaseText locale bold size={24}>
        Review
      </BaseText>
      <BaseText locale bold size={24} className="mt-4">
        {blog?.title}
      </BaseText>
      <div
        className="mt-4 "
        dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
      ></div>
      <div className="flex flex-wrap flex-row gap-x-3">
        {[
          (blog?.tags || []).map((item, index) => (
            <div
              key={index}
              className="relative  mt-3 px-4 py-1 bg-darkNight50 rounded-full flex justify-center items-center"
            >
              <BaseText className="text-darkNight700" medium>
                #{item}
              </BaseText>
            </div>
          )),
        ]}
      </div>
    </div>
  );
};
