import {
  Checkbox,
  ColorPicker,
  Modal,
  Popconfirm,
  Popover,
  Switch,
  TableColumnsType,
} from "antd";
import { useTranslation } from "react-i18next";
import { BaseTable, BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { useState } from "react";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { BaseModal2 } from "../../../components/modal/BaseModal2";

export default function ThemaTable() {
  const { t } = useTranslation();
  const data = [];
  const [openModalCreateThema, setOpenModalCreateThema] = useState(false);
  const [openModalEditThema, setOpenModalEditThema] = useState(false);

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
    {
      title: t("Actions"),
      render: ({}) => (
        <img
          onClick={() => {
            setOpenModalEditThema(true);
          }}
          src={Images.edit}
          className="w-6 h-6 cursor-pointer"
        />
      ),
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
            <div key={index} className="flex flex-row mx-4 mt-4 items-center">
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
            <div key={index} className="flex flex-row mx-4 mt-4 items-center">
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

  const contentThema = () => {
    return (
      <div className="flex flex-col">
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
        <div className="h-[1px] bg-darkNight100 my-4"></div>
        <BaseText locale bold size={16} className="mb-4">
          Things
        </BaseText>
        <BaseText locale medium className="mb-4">
          Adult certification
        </BaseText>
        <div className="flex flex-row justify-between">
          <BaseText locale medium className="mb-4">
            Adult verification status
          </BaseText>
          <Switch defaultChecked />
        </div>
        <div className="h-[1px] bg-darkNight100"></div>
        <div className="flex flex-row justify-between mt-4">
          <BaseText locale medium className="mb-4">
            Whether profile features are exposed?
          </BaseText>
          <Switch defaultChecked />
        </div>
        <div className="h-[1px] bg-darkNight100 my-4"></div>
        <BaseText locale medium>
          Setting permissions
        </BaseText>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium>
            View
          </BaseText>
          <BaseInputSelect
            onChange={() => {}}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            value="Naver Map"
            options={[
              {
                value: "Naver Map",
                label: "Naver Map",
              },
              {
                value: "Google Map",
                label: "Google Map",
              },
            ]}
          />
        </div>
        <div className="h-[1px] bg-darkNight100 my-4"></div>
        <BaseText locale medium>
          Setting permissions
        </BaseText>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium className="flex-1">
            Writing
          </BaseText>
          <BaseInputSelect
            onChange={() => {}}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            value="모든 사용자"
            options={[
              {
                value: "모든 사용자",
                label: "모든 사용자",
              },
              {
                value: "로그인 사용자",
                label: "로그인 사용자",
              },
              {
                value: "회원그룹 선택",
                label: "회원그룹 선택",
              },
            ]}
          />
          <BaseInputSelect
            className="ml-3"
            onChange={() => {}}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            value="1"
            options={[
              {
                value: "1",
                label: <img src={Images.android} className="w-5" />,
              },
              {
                value: "2",
                label: <img src={Images.iphone} className="w-5" />,
              },
            ]}
          />
        </div>
        <div className="flex flex-row justify-between mt-4">
          <BaseText locale medium className="">
            Whether to be reviewed by administrator when uploading writing
          </BaseText>
          <Switch defaultChecked />
        </div>
        <div className="h-[1px] bg-darkNight100 my-4"></div>
        <div className="flex flex-row justify-between items-center">
          <BaseText locale medium>
            Comments
          </BaseText>
          <BaseInputSelect
            onChange={() => {}}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            value="모든 사용자"
            options={[
              {
                value: "모든 사용자",
                label: "모든 사용자",
              },
              {
                value: "로그인 사용자",
                label: "로그인 사용자",
              },
              {
                value: "회원그룹 선택",
                label: "회원그룹 선택",
              },
            ]}
          />
        </div>
        <div className="h-[1px] bg-darkNight100 my-4"></div>
        <div className="flex flex-row justify-between items-center">
          <BaseText locale medium>
            Member ID exposure method
          </BaseText>
          <BaseInputSelect
            onChange={() => {}}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            value="닉네임"
            options={[
              {
                value: "닉네임",
                label: "닉네임",
              },
              {
                value: "닉네임(일부*로 표시)",
                label: "닉네임(일부*로 표시)",
              },
              {
                value: "ID",
                label: "ID",
              },
              {
                value: "ID(일부*로 표시)",
                label: "ID(일부*로 표시)",
              },
            ]}
          />
        </div>
        <div className="h-[1px] bg-darkNight100 my-4"></div>
        <div className="flex flex-row justify-between">
          <BaseText locale medium className="">
            Product reviews
          </BaseText>
          <Switch defaultChecked />
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium>
            Who can?
          </BaseText>
          <BaseInputSelect
            onChange={() => {}}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            value="모든 사용자"
            options={[
              {
                value: "모든 사용자",
                label: "모든 사용자",
              },
              {
                value: "로그인 사용자",
                label: "로그인 사용자",
              },
              {
                value: "회원그룹 선택",
                label: "회원그룹 선택",
              },
            ]}
          />
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
      <BaseModal2
        title="New Thema"
        isOpen={openModalCreateThema}
        onClose={() => {
          setOpenModalCreateThema(false);
        }}
        onSubmit={() => {
          setOpenModalCreateThema(false);
        }}
      >
        {contentThema()}
      </BaseModal2>
      <BaseModal2
        title="Edit Thema"
        isOpen={openModalEditThema}
        onClose={() => {
          setOpenModalEditThema(false);
        }}
        onSubmit={() => {
          setOpenModalEditThema(false);
        }}
      >
        {contentThema()}
      </BaseModal2>
    </div>
  );
}
