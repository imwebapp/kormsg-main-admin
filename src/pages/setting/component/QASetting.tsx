import { useEffect, useState } from "react";
import { BaseTable, BaseText, CustomButton } from "../../../components";
import { useTranslation } from "react-i18next";
import { settingApi } from "../../../apis/settingApi";
import { TableColumnsType } from "antd";
import Images from "../../../assets/gen";
import dayjs from "dayjs";

export default function QASetting() {
  const { t } = useTranslation();
  const [data, setData] = useState<any>();
  const [selectedButton, setSelectedButton] = useState("");
  const [listFAQCategory, setListFAQCategory] = useState<any>([]);
  const getListFaqCategory = async () => {
    try {
      const params = {
        fields: '["$all"]',
        limit: 50,
      };
      let result: any = await settingApi.getListFaqCategory(params);
      if (result.code === 200) {
        setListFAQCategory(result.results.objects.rows);
        setSelectedButton(result.results.objects.rows[0].id);
      }
    } catch (error) {}
  };
  const getListFaq = async (id: string) => {
    try {
      const params = {
        fields: '["$all"]',
        filter: JSON.stringify({ faq_category_id: id }),
        limit: 50,
      };
      let result: any = await settingApi.getListFaq(params);
      if (result.code === 200) {
        setData(result.results.objects.rows);
      }
    } catch (error) {}
  };

  const renderEventAction = (text: string) => {
    // Loại bỏ các tag HTML từ chuỗi HTML
    const textOnly = text.replace(/<[^>]+>/g, "");

    console.log(textOnly);

    return (
      <div>
        {textOnly.length > 80
          ? textOnly.slice(0, 80) + "..."
          : textOnly.slice(0, 80)}
      </div>
    );
  };
  const getTextColor = (buttonStatus: any) => {
    return buttonStatus === selectedButton ? "white" : "black";
  };
  const getButtonStyle = (buttonKey: any) => {
    const isSelected = buttonKey === selectedButton;
    return {
      backgroundColor: isSelected ? "black" : "white",
      color: isSelected ? "white" : "black",
    };
  };

  let columns: TableColumnsType<any> = [
    {
      title: t("Date"),
      dataIndex: ["updated_at"],
      render: (text) => <div>{dayjs(text).format("YYYY-MM-DD")}</div>,
      width: "10%",
    },
    {
      title: t("Title"),
      dataIndex: ["name"],
      width: "15%",
    },
    {
      title: t("Content"),
      dataIndex: ["content"],
      width: "65%",
      render: (text) => renderEventAction(text),
    },
    {
      title: t("Management"),
      render: (text, record) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img
            src={Images.eye}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              console.log("edit store", record);
              // navigate(Url.newStore, { state: { dataEdit: record } });
            }}
          />
          <img
            src={Images.edit2}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              // cloneStore(record.id);
            }}
          />
          <img
            src={Images.trash}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              // deleteStore(record.id);
            }}
          />
        </div>
      ),
      width: "10%",
    },
  ];

  const listButton = () => {
    const handleButtonClick = (id: any) => {
      setSelectedButton(id);
    };

    return (
      <div className="flex flex-row gap-4 ">
        {listFAQCategory.map(({ id, name }: any) => (
          <CustomButton
            key={id}
            className="text-base h-11 font-medium rounded-full px-4"
            style={getButtonStyle(id)}
            onClick={() => handleButtonClick(id)}
          >
            <BaseText color={getTextColor(id)} size={16}>
              {name}
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
          onClick={() => {}}
          className="flex bg-blue-50 h-11 flex-row items-center gap-x-3 border border-blue-500 rounded-full"
        ></div>
      </div>
    );
  };
  const bodyTable = () => {
    return (
      <BaseTable
        maxContent
        sticky={{ offsetHeader: 0 }}
        pagination={{
          pageSize: 50,
        }}
        className="w-full"
        columns={columns}
        data={data}
      />
    );
  };

  useEffect(() => {
    getListFaqCategory();
    return () => {};
  }, []);
  useEffect(() => {
    if (selectedButton !== "") getListFaq(selectedButton);
  }, [selectedButton]);
  return (
    <div className="p-4 py-0">
      {headerTable()}
      {bodyTable()}
    </div>
  );
}
