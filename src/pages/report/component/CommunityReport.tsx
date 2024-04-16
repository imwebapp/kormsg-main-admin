import { useTranslation } from "react-i18next";
import { BaseTable, BaseText, CustomButton } from "../../../components";
import { classNames, formatTimeDiff } from "../../../utils/common";
import { useEffect, useRef, useState } from "react";
import { REPORT } from "../../../utils/constants";
import { Carousel, TableColumnsType } from "antd";
import { ReportApi } from "../../../apis/reportApi";
import { ReportInterface } from "../../../entities/report.entity";
import Images from "../../../assets/gen";
import { useLocalStorage } from "../../../stores/localStorage";
import { showError, showSuccess } from "../../../utils/showToast";
import { BaseModal2 } from "../../../components/modal/BaseModal2";
import { PostInterface } from "../../../entities/post.entity";
import { UserInterface } from "../../../entities";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { BaseInput } from "../../../components/input/BaseInput";
import { userApi } from "../../../apis/userApi";
import { HomeSettingApi } from "../../../apis/homeSettingApi";

export default function CommunityReport() {
  const { t } = useTranslation();
  const { locale } = useLocalStorage((state) => state);
  const [selectedButton, setSelectedButton] = useState(REPORT.REPORT_LIST);
  const [reports, setReports] = useState<ReportInterface[]>([]);
  const [openModalPostDetail, setOpenModalPostDetail] = useState();
  const [userDetail, setUserDetail] = useState();
  const [isTabDeleted, setTabDeleted] = useState(false);
  const [countReport, setCountReport] = useState(0);
  const [countDeleted, setCountDeleted] = useState(0);
  const [isPendingSetLimit, setPendingSetLimit] = useState(false);
  const [limitReport, setLimitReport] = useState();
  const limitReportRef = useRef<any>(null);
  const [page, setPage] = useState(1);
  const limit = 50;

  useEffect(() => {
    limitReportRef?.current?.focus();
  }, [isPendingSetLimit]);

  const getCountLimitReport = async () => {
    try {
      const respon = await HomeSettingApi.settingAdmin();
      setLimitReport(respon.report_limit);
    } catch (error) {}
  };

  useEffect(() => {
    getCountLimitReport();
  }, []);

  const _setLimitReport = async (value: number) => {
    try {
      await HomeSettingApi.updateReportLimit({ report_limit: value });
    } catch (error) {}
  };

  const getCount = async () => {
    try {
      const countReport = await ReportApi.getCountPost({
        filter: JSON.stringify({
          post_id: { $ne: null },
          is_solved: false,
        }),
      });
      setCountReport(countReport);
      const countDeleted = await ReportApi.getCountPost({
        filter: JSON.stringify({
          post_id: { $ne: null },
          is_solved: true,
        }),
      });
      setCountDeleted(countDeleted);
    } catch (error) {
      showError(error);
      console.log("errrrr", error);
    }
  };

  const getReport = async () => {
    try {
      const reports = await ReportApi.getListPost({
        filter: JSON.stringify({
          post_id: { $ne: null },
          is_solved: isTabDeleted,
        }),
        limit: limit,
        page,
      });
      setReports(reports);
    } catch (error) {}
  };

  useEffect(() => {
    getReport();
  }, [page]);

  useEffect(() => {
    setPage(0);
    setTimeout(() => {
      setPage(1);
    }, 50);
    getCount();
  }, [isTabDeleted]);

  const deleteReport = async (post_id: string) => {
    try {
      await ReportApi.delete({
        items: JSON.stringify([post_id]),
      });
      getReport();
      getCount();
      showSuccess("success");
    } catch (error) {
      showError(error);
    }
  };

  const restoreReport = async (post_id: string) => {
    try {
      await ReportApi.restore({
        items: JSON.stringify([post_id]),
      });
      getReport();
      getCount();
      showSuccess("success");
    } catch (error) {
      showError(error);
    }
  };
  const columns: TableColumnsType = [
    {
      title: t("No"),
      width: 60,
      render: (value, record, index) => <BaseText>{index + 1 + (page - 1) * limit}</BaseText>,
    },
    {
      title: t("Image"),
      render: ({ post }, record, index) => (
        <img
          onClick={() => setOpenModalPostDetail(post)}
          className="w-[136px] object-contain cursor-pointer"
          src={post?.images && post?.images[0] ? post.images[0] : ""}
        />
      ),
    },
    {
      title: t("Title"),
      width: 300,
      render: ({ post }, record, index) => (
        <div
          className="cursor-pointer"
          onClick={() => setOpenModalPostDetail(post)}
        >
          <BaseText size={16} medium className="line-clamp-2">
            {post?.content}
          </BaseText>
        </div>
      ),
    },
    {
      title: t("Writer"),
      render: ({ post }, record, index) => (
        <div
          onClick={() => {
            if (post?.user) {
              setUserDetail(post?.user);
            }
          }}
          className="flex flex-row items-center cursor-pointer gap-x-1"
        >
          <img
            src={
              post?.user
                ? post?.user?.avatar || Images.userDefault
                : Images.logo
            }
            className="object-cover w-8 h-8 rounded-full"
          />
          <BaseText size={16} medium>
            Badger
          </BaseText>
          <img src={Images.infoCircle} className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: t("Creation time"),
      render: ({ created_at }, record, index) => (
        <BaseText size={16} medium>
          {formatTimeDiff(new Date(created_at), locale)}
        </BaseText>
      ),
    },
    {
      title: t("Declaration"),
      width: 120,
      render: ({ total_report }, record, index) => (
        <BaseText size={16} medium className="text-volcano500">
          {total_report}
        </BaseText>
      ),
    },
    {
      title: t("Action"),
      render: ({ id, post_id }, record, index) => (
        <>
          {isTabDeleted ? (
            <div
              onClick={() => restoreReport(post_id)}
              className="py-2 px-3 bg-greenNuggets rounded flex justify-center items-center cursor-pointer gap-x-1 w-[100px]"
            >
              <img src={Images.undo} className="w-6 h-6" />
              <BaseText locale size={16} medium>
                Restore
              </BaseText>
            </div>
          ) : (
            <div
              onClick={() => deleteReport(post_id)}
              className="py-2 px-3 bg-dustRed500 rounded flex justify-center items-center cursor-pointer gap-x-1 w-[100px]"
            >
              <img src={Images.trash3} className="w-6 h-6" />
              <BaseText locale size={16} medium className="text-white">
                Delete
              </BaseText>
            </div>
          )}
        </>
      ),
    },
  ];
  const getButtonStyle = (buttonKey: any) => {
    const isSelected = buttonKey === selectedButton;
    return {
      backgroundColor: isSelected ? "black" : "white",
      color: isSelected ? "white" : "black",
    };
  };
  const getTextColor = (buttonStatus: any) => {
    return buttonStatus === selectedButton ? "white" : "black";
  };
  const listButton = () => {
    const buttonData = [
      {
        status: REPORT.REPORT_LIST,
        label: t("Report list"),
        count: countReport,
      },
      {
        status: REPORT.AUTO_DELETED_LIST,
        label: t("Auto-deleted list"),
        count: countDeleted,
      },
    ];

    const handleButtonClick = (buttonName: REPORT) => {
      if (buttonName === REPORT.AUTO_DELETED_LIST) {
        setTabDeleted(true);
      } else {
        setTabDeleted(false);
      }
      setSelectedButton(buttonName);
    };

    return (
      <div className="flex flex-row gap-4 ">
        {buttonData.map(({ status, label, count }) => (
          <CustomButton
            key={status}
            className="px-4 text-base font-medium rounded-full h-11"
            style={getButtonStyle(status)}
            onClick={() => handleButtonClick(status)}
          >
            <BaseText color={getTextColor(status)} size={16}>
              {label} ({count})
            </BaseText>
          </CustomButton>
        ))}
      </div>
    );
  };

  const headerTable = () => {
    return (
      <div className="flex flex-row justify-between">
        {listButton()}
        <div
          onClick={() => {
            setPendingSetLimit(true);
          }}
          className="flex flex-row items-center border border-blue-500 rounded-full bg-blue-50 h-11 gap-x-3"
        >
          <BaseText locale medium size={16} className="ml-3 text-blue-500">
            Set automatic deletion count
          </BaseText>
          <div className="flex items-center justify-center bg-blue-500 rounded-full w-11 h-11 ">
            {!isPendingSetLimit ? (
              <BaseText bold className="text-white" size={18}>
                {limitReport}
              </BaseText>
            ) : (
              <input
                type="number"
                onKeyDown={(event: any) => {
                  if (event.key === "Enter") {
                    setPendingSetLimit(false);
                    setLimitReport(event.target.value);
                    _setLimitReport(event.target.value);
                  }
                }}
                onBlur={(event: any) => {
                  setPendingSetLimit(false);
                  setLimitReport(event.target.value);
                  _setLimitReport(event.target.value);
                }}
                ref={limitReportRef}
                className="w-[20px] bg-white text-[18px] font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const bodyTable = () => {
    return (
      <BaseTable
        maxContent
        sticky={{ offsetHeader: 0 }}
        pagination={{
          current: page,
          pageSize: limit,
          total: isTabDeleted ? countDeleted : countReport,
          onChange: (page: number, pageSize: number) => {
            setPage(page);
          },
        }}
        columns={columns}
        data={reports}
      />
    );
  };

  const deleteUser = async (user?: UserInterface) => {
    try {
      await userApi.delete(user?.id);
      getReport();
      getCount();
      showSuccess("success");
    } catch (error) {}
  };

  return (
    <div className="p-4 py-0">
      {headerTable()}
      {bodyTable()}
      <BaseModal2
        isOpen={!!openModalPostDetail}
        onClose={() => {
          setOpenModalPostDetail(undefined);
        }}
        onSubmit={() => {
          setOpenModalPostDetail(undefined);
        }}
        title="Detail"
        isHideAction
        children={<PostDetail post={openModalPostDetail} />}
      ></BaseModal2>

      <BaseModal2
        isOpen={!!userDetail}
        onClose={() => {
          setUserDetail(undefined);
        }}
        onSubmit={() => {
          deleteUser(userDetail);
          setUserDetail(undefined);
        }}
        title="Detail"
        nameConfirm="Delete user"
        typeButtonConfirm="danger"
        children={<UserDetail user={userDetail} />}
      ></BaseModal2>
    </div>
  );
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
type PostDetailType = {
  post?: PostInterface;
};
const PostDetail = ({ post }: PostDetailType) => {
  return (
    <div>
      <Carousel draggable autoplay>
        {(post?.images || []).map((item) => (
          <img src={item} className="mb-6 rounded-lg" />
        ))}
      </Carousel>
      <BaseText medium size={16}>
        {post?.content}
      </BaseText>
    </div>
  );
};
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
type UserDetailType = {
  user?: UserInterface;
};
const UserDetail = ({ user }: UserDetailType) => {
  return (
    <div>
      <div className={classNames("flex flex-col gap-5")}>
        <div className="flex justify-center">
          <img
            src={user?.avatar || Images.userDefault}
            className="w-[85px] h-[85px] rounded-full object-cover"
          />
        </div>
        <BaseInputSelect
          disabled
          title="User Type"
          defaultValue={user?.account_type}
          value={user?.account_type}
          onChange={() => {}}
          placeholder="Select"
          options={[]}
        />
        <BaseInputSelect
          multiple
          title="Group"
          disabled
          defaultValue={user?.groups}
          value={user?.groups}
          onChange={(value) => {}}
          placeholder="Select a group"
          options={[]}
        />
        <BaseInput
          disabled
          title="User name"
          value={user?.nickname}
          // onChange={(value) => handleInputChange("nickname", value)}
          placeholder="Nickname"
        />
        <BaseInput
          title="ID account"
          disabled
          value={user?.username}
          onChange={(value) => {}}
          placeholder="Id account"
        />
      </div>
    </div>
  );
};
