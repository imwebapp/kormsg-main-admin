import {
  Checkbox,
  ColorPicker,
  Popconfirm,
  Popover,
  TableColumnsType,
} from "antd";
import { useTranslation } from "react-i18next";
import { BaseTable, BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseModal } from "../../../components/modal/BaseModal";
import { useState } from "react";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { CloseOutlined } from "@ant-design/icons";

export default function ThemaTable() {
  const { t } = useTranslation();
  const data = [];
  const [openModalCreateThema, setOpenModalCreateThema] = useState(false);

  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      no: i + 1,
      id: "eaf91690-9463- 111ee-ad8f-b94564f0-9463",
      name: "cccc",
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("No"),
      dataIndex: "no",
    },
    {
      title: t("Id"),
      dataIndex: "id",
    },
    {
      title: t("Name"),
      dataIndex: "name",
    },
    {
      title: t("Tags"),
      render: ({}) => (
        <Popover
          content={<div>{viewListTags()}</div>}
          placement="bottomLeft"
          arrow={false}
          trigger="click"
        >
          <CustomButton locale primary>
            Select tags
          </CustomButton>
        </Popover>
      ),
    },
    {
      title: t("List Category"),
      render: ({}) => (
        <Popover
          content={<div>{viewListCategory()}</div>}
          placement="bottomLeft"
          arrow={false}
          trigger="click"
        >
          <CustomButton locale primary>
            List Category
          </CustomButton>
        </Popover>
      ),
    },
    {
      title: t("Reservation function point payment"),
      render: ({}) => <Checkbox onChange={(e: any) => {}}></Checkbox>,
    },
    {
      title: t("Community"),
      render: ({}) => <Checkbox onChange={(e: any) => {}}></Checkbox>,
    },
  ];

  const viewListCategory = () => {
    return (
      <div className="flex flex-col w-[400px]">
        <div className="flex flex-row p-4 border-b">
          <BaseText locale bold size={18}>
            List Category
          </BaseText>
        </div>
        {[1, 2, 3].map((item, index) => {
          return (
            <div className="flex flex-row mx-4 mt-4 items-center">
              <BaseInput
                className="flex-1"
                styleInputContainer="h-[40px]"
                onChange={() => {}}
                value=""
                widgetRight={
                  <ColorPicker defaultValue="#1677ff" size="small" />
                }
                placeholder="Enter Category"
              />
              <Popconfirm
                onConfirm={() => {}}
                title={t("Delete the category")}
                description={t("Are you sure to delete this category?")}
              >
                <img
                  src={Images.trash}
                  className="w-6 h-6 ml-3 cursor-pointer"
                />
              </Popconfirm>
            </div>
          );
        })}
        <div
          onClick={() => {}}
          className="flex flex-row gap-1 cursor-pointer m-4"
        >
          <img src={Images.plus2} className="w-6 h-6" />
          <BaseText locale medium size={16} className="text-primary">
            Create a category
          </BaseText>
        </div>
        <div className="flex flex-row justify-center">
          <CustomButton className="w-[100px]" primary locale>
            Save
          </CustomButton>
        </div>
      </div>
    );
  };
  const viewListTags = () => {
    return (
      <div className="flex flex-col w-[400px]">
        <div className="flex flex-row p-4 border-b">
          <BaseText locale bold size={18}>
            List Tags
          </BaseText>
        </div>
        {[1, 2, 3].map((item, index) => {
          return (
            <div className="flex flex-row mx-4 mt-4 items-center">
              <BaseInput
                className="flex-1"
                styleInputContainer="h-[40px]"
                onChange={() => {}}
                value=""
                placeholder="Enter Category"
              />
              <Popconfirm
                onConfirm={() => {}}
                title={t("Delete the tag")}
                description={t("Are you sure to delete this tag?")}
              >
                <img
                  src={Images.trash}
                  className="w-6 h-6 ml-3 cursor-pointer"
                />
              </Popconfirm>
            </div>
          );
        })}
        <div
          onClick={() => {}}
          className="flex flex-row gap-1 cursor-pointer m-4"
        >
          <img src={Images.plus2} className="w-6 h-6" />
          <BaseText locale medium size={16} className="text-primary">
            Create a tag
          </BaseText>
        </div>
        <div className="flex flex-row justify-center">
          <CustomButton className="w-[100px]" primary locale>
            Save
          </CustomButton>
        </div>
      </div>
    );
  };

  return (
    <div>
      <BaseTable
        className=""
        //   pagination={!{ pageSize: 100 }}
        columns={columns}
        data={data}
      />
      <div
        onClick={() => setOpenModalCreateThema(true)}
        className="flex flex-row gap-1 cursor-pointer"
      >
        <img src={Images.plus2} className="w-6 h-6" />
        <BaseText locale medium size={16} className="text-primary">
          Create a thema
        </BaseText>
      </div>
      <BaseModal
        isOpen={openModalCreateThema}
        onClose={() => {
          setOpenModalCreateThema(false);
        }}
        title="Visible boards"
        children={
          <div>
            <BaseInput
              styleInputContainer="h-[40px]"
              onChange={() => {}}
              value=""
              title="Name"
              placeholder="Enter name"
            />
            <BaseInputSelect
              className="mt-4 "
              title="Visible boards"
              onChange={() => {}}
              allowClear={false}
              textInputSize={12}
              value="Home"
              options={[
                {
                  value: "Home",
                  label: "Home",
                },
                {
                  value: "Shop",
                  label: "Shop",
                },
                {
                  value: "Common",
                  label: "Common",
                },
                {
                  value: "Profile",
                  label: "Profile",
                },
              ]}
            />
          </div>
        }
      ></BaseModal>
    </div>
  );
}
