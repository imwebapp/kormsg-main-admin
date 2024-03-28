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
import { useEffect, useState } from "react";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseModal2 } from "../../../components/modal/BaseModal2";
import { ThemaDetail } from "./thema_detail";
import { BOARD } from "../../../utils/constants";
import {
  CategoryInterface,
  TagThemaInterface,
  ThemaInterface,
} from "../../../entities";
import { ThemaApi } from "../../../apis/themaApi";
import { showError, showSuccess } from "../../../utils/showToast";
import { CategoryApi } from "../../../apis/categoryApi";
import { TagApi } from "../../../apis/tagApi";

export default function ThemaTable() {
  const { t } = useTranslation();
  const [themas, setThemas] = useState<Array<ThemaInterface>>([]);
  const [openModalCreateThema, setOpenModalCreateThema] = useState(false);
  const [openModalEditThema, setOpenModalEditThema] = useState(false);
  const [lastOpenCate, setLastOpenCate] = useState(Date.now());
  const [lastOpenTag, setLastOpenTag] = useState(Date.now());
  const [lastOpenThema, setLastOpenThema] = useState(Date.now());
  const [themaUpdating, setThemaUpdating] = useState<ThemaInterface>();

  const getListThema = async () => {
    try {
      setThemas([]);
      const data: Array<ThemaInterface> = await ThemaApi.getList();
      setThemas(data);
    } catch (error) {
      return [];
    }
  };

  const updateThema = async (data: ThemaInterface) => {
    try {
      await ThemaApi.updateThema(data.id || "", data);
      showSuccess("Success");
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    getListThema();
  }, []);

  const deleteThema = async (id: string) => {
    try {
      await ThemaApi.deleteThema(id);
      getListThema();
      showSuccess("Success");
    } catch (error) {
      showError(error);
    }
  };

  const columns: TableColumnsType<ThemaInterface> = [
    {
      title: t("No"),
      render: (value, record, index) => <BaseText>{index + 1}</BaseText>,
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
      render: ({ id }) => (
        <Popover
          onOpenChange={() => {
            setLastOpenTag(Date.now());
          }}
          content={<ListTags lastOpen={lastOpenTag} themaId={id} />}
          placement="bottomLeft"
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
      render: ({ id }) => (
        <Popover
          onOpenChange={() => {
            setLastOpenCate(Date.now());
          }}
          content={<ListCategory lastOpen={lastOpenCate} themaId={id} />}
          placement="bottomLeft"
          trigger="click"
          forceRender={true}
        >
          <CustomButton locale primary>
            List Category
          </CustomButton>
        </Popover>
      ),
    },
    {
      title: t("Reservation function point payment"),
      render: ({ bonus_point, id }) => (
        <Checkbox
          defaultChecked={bonus_point}
          onChange={(e: any) =>
            updateThema({ id, bonus_point: e.target.checked })
          }
        ></Checkbox>
      ),
    },
    {
      title: t("Community"),
      render: ({ review_require, id }) => (
        <Checkbox
          defaultChecked={review_require}
          onChange={(e: any) =>
            updateThema({ id, review_require: e.target.checked })
          }
        ></Checkbox>
      ),
    },
    {
      title: t("Actions"),
      render: ({ id }, record) => (
        <div className="flex flex-row items-center">
          <img
            onClick={() => {
              setOpenModalEditThema(true);
              setThemaUpdating(record);
            }}
            src={Images.edit}
            className="w-6 h-6 cursor-pointer"
          />
          <Popconfirm
            onConfirm={() => deleteThema(id)}
            title={t("Delete the thema")}
            description={t("Are you sure to delete this thema?")}
          >
            <img src={Images.trash} className="w-5 h-5 ml-3 cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <BaseTable
        className=""
        pagination={!{ pageSize: 100 }}
        columns={columns}
        data={themas}
      />
      <div
        onClick={() => setOpenModalCreateThema(true)}
        className="flex flex-row gap-1 cursor-pointer mt-4"
      >
        <img src={Images.plus2} className="w-6 h-6" />
        <BaseText locale medium size={16} className="text-primary">
          Create a thema
        </BaseText>
      </div>

      {/* Create thema */}
      <BaseModal2
        title="New Thema"
        isOpen={openModalCreateThema}
        isHideAction
        afterOpenChange={(value: any) => {
          setOpenModalCreateThema(value);
          setLastOpenThema(Date.now());
        }}
      >
        <ThemaDetail
          lastOpen={lastOpenThema}
          submitModal={() => {
            getListThema();
            setOpenModalCreateThema(false);
          }}
          closeModal={() => setOpenModalCreateThema(false)}
        />
      </BaseModal2>

      {/* Edit thema */}
      <BaseModal2
        title="Edit Thema"
        isOpen={openModalEditThema}
        isHideAction
        afterOpenChange={(value: any) => {
          setOpenModalEditThema(value);
          setLastOpenThema(Date.now());
        }}
      >
        <ThemaDetail
          lastOpen={lastOpenThema}
          themaProps={themaUpdating}
          submitModal={() => {
            getListThema();
            setOpenModalEditThema(false);
          }}
          closeModal={() => setOpenModalEditThema(false)}
        />
      </BaseModal2>
    </div>
  );
}

const ListCategory = ({ lastOpen, themaId }: any) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Array<CategoryInterface>>([]);

  const getCategory = async () => {
    setCategories([]);
    try {
      const data = await CategoryApi.getList({
        filter: `{"thema_id":"${themaId}"}`,
      });
      setCategories(data);
    } catch (error) {}
  };

  useEffect(() => {
    getCategory();
  }, [lastOpen]);

  const submit = async () => {
    try {
      await Promise.all(
        categories.map(async (item: CategoryInterface) => {
          if (item.id) {
            await CategoryApi.updateCategory(item.id || "", item);
          } else {
            await CategoryApi.createCategory(item);
          }
        })
      );
      getCategory();
      showSuccess("Success");
    } catch (error) {
      showError(error);
    }
  };

  const deleteCategory = async (item: CategoryInterface) => {
    try {
      await CategoryApi.deleteCategory(item.id || "");
      showSuccess("Success");
      getCategory();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="flex flex-col w-[400px] max-h-[400px]">
      <div className="flex flex-row p-4 border-b">
        <BaseText locale bold size={18}>
          List Category
        </BaseText>
      </div>
      <div className="overflow-auto">
        {categories.map((item, index) => {
          return (
            <div key={index} className="flex flex-row mx-4 mt-4 items-center">
              <BaseInput
                className="flex-1"
                styleInputContainer="h-[40px]"
                onChange={(value) => {
                  const data = [...categories];
                  data[index].name = value;
                  setCategories(data);
                }}
                defaultValue={item.name}
                widgetRight={
                  <ColorPicker
                    onChange={(value, color) => {
                      const data = [...categories];
                      data[index].theme_color = color;
                      setCategories(data);
                    }}
                    defaultValue={item.theme_color}
                    size="small"
                  />
                }
                placeholder="Enter Category"
              />
              <Popconfirm
                onConfirm={() => deleteCategory(item)}
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
          onClick={() => {
            const data = [
              ...categories,
              {
                name: "",
                thema_id: themaId,
                theme_color: "#1677ff",
              },
            ];
            setCategories(data);
          }}
          className="flex flex-row gap-1 cursor-pointer m-4"
        >
          <img src={Images.plus2} className="w-6 h-6" />
          <BaseText locale medium size={16} className="text-primary">
            Create a category
          </BaseText>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-4">
        <CustomButton onClick={submit} className="w-[100px]" primary locale>
          Save
        </CustomButton>
      </div>
    </div>
  );
};

const ListTags = ({ lastOpen, themaId }: any) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<Array<TagThemaInterface>>([]);

  const getTags = async () => {
    setTags([]);
    try {
      const data = await TagApi.getList({
        filter: `{"thema_id":"${themaId}"}`,
      });
      setTags(data);
    } catch (error) {}
  };

  useEffect(() => {
    getTags();
  }, [lastOpen]);

  const submit = async () => {
    try {
      await Promise.all(
        tags.map(async (item: TagThemaInterface) => {
          if (item.id) {
            await TagApi.updateTag(item.id || "", item);
          } else {
            await TagApi.createTag(item);
          }
        })
      );
      getTags();
      showSuccess("Success");
    } catch (error) {
      showError(error);
    }
  };

  const deleteTag = async (item: TagThemaInterface) => {
    try {
      await TagApi.deleteTag(item.id || "");
      showSuccess("Success");
      getTags();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="flex flex-col w-[400px] max-h-[400px]">
      <div className="flex flex-row p-4 border-b">
        <BaseText locale bold size={18}>
          List Tags
        </BaseText>
      </div>
      <div className="overflow-auto">
        {tags.map((item, index) => {
          return (
            <div key={index} className="flex flex-row mx-4 mt-4 items-center">
              <BaseInput
                className="flex-1"
                styleInputContainer="h-[40px]"
                onChange={(value) => {
                  const data = [...tags];
                  data[index].name = value;
                  setTags(data);
                }}
                defaultValue={item.name}
                placeholder="Enter Tag"
              />
              <Popconfirm
                onConfirm={() => deleteTag(item)}
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
          onClick={() => {
            const data = [
              ...tags,
              {
                name: "",
                thema_id: themaId,
              },
            ];
            setTags(data);
          }}
          className="flex flex-row gap-1 cursor-pointer m-4"
        >
          <img src={Images.plus2} className="w-6 h-6" />
          <BaseText locale medium size={16} className="text-primary">
            Create a tag
          </BaseText>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-4">
        <CustomButton onClick={submit} className="w-[100px]" primary locale>
          Save
        </CustomButton>
      </div>
    </div>
  );
};
