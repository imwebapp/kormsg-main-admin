import { useState } from "react";
import Images from "../../assets/gen";
import { BaseText } from "../../components";
import { classNames } from "../../utils/common";
import BlogDetail from "./components/BlogDetail";
import BlogList from "./components/BlogList";
import { useBlogState } from "./store";

export default function BlogPage() {
  const { tab, setTab, setBlog } = useBlogState((state) => state);

  const buildTab = () => {
    return (
      <div className="max-w-[86px] min-w-[86px] h-full border-r">
        <div
          onClick={() => {
            if (tab !== 1) setBlog(undefined);
            setTab(1);
          }}
          className="cursor-pointer h-[90px] border-b flex flex-col justify-center items-center relative"
        >
          <img
            src={tab === 1 ? Images.pen : Images.penInactive}
            className="w-11 h-11"
          />
          <BaseText
            locale
            size={14}
            className={classNames(tab === 1 ? "!text-primary" : "text-gray5")}
          >
            Writing
          </BaseText>
          <div
            className={classNames(
              "absolute left-0 h-[66px] w-1 rounded-r-full",
              tab === 1 ? "bg-primary" : "bg-transparent"
            )}
          ></div>
        </div>
        <div
          onClick={() => {
            setTab(2);
            if (tab !== 2) setBlog(undefined);
          }}
          className="cursor-pointer h-[90px] border-b flex flex-col justify-center items-center relative"
        >
          <img
            src={tab === 2 ? Images.gridActive : Images.gridInactive}
            className="w-11 h-11"
          />
          <BaseText
            locale
            size={14}
            className={classNames(tab === 2 ? "!text-primary" : "text-gray5")}
          >
            Open list
          </BaseText>
          <div
            className={classNames(
              "absolute left-0 h-[66px] w-1 rounded-r-full",
              tab === 2 ? "bg-primary" : "bg-transparent"
            )}
          ></div>
        </div>
      </div>
    );
  };
  const buildContent = () => {
    if (tab === 1) return <BlogDetail />;
    return <BlogList />;
  };

  return (
    <div className="flex flex-row h-[calc(100vh-72px)]">
      {buildTab()}
      {buildContent()}
    </div>
  );
}
