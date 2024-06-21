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
import {
  BOARD,
  SELECT_ALL,
  USER_PERMISSION,
  USER_PERMISSION_TEXT,
} from "../../../utils/constants";
import {
  CategoryInterface,
  TagThemaInterface,
  ThemaInterface,
} from "../../../entities";
import { ThemaApi } from "../../../apis/themaApi";
import { showError, showSuccess } from "../../../utils/showToast";
import { CategoryApi } from "../../../apis/categoryApi";
import { TagApi } from "../../../apis/tagApi";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { groupApi } from "../../../apis/groupApi";
import { useBulletinState } from "../store";

export default function ThemaTable() {
  const { t } = useTranslation();
  const [themas, setThemas] = useState<Array<ThemaInterface>>([]);
  const [openModalCreateThema, setOpenModalCreateThema] = useState(false);
  const [openModalEditThema, setOpenModalEditThema] = useState(false);
  const [lastOpenCate, setLastOpenCate] = useState(Date.now());
  const [lastOpenTag, setLastOpenTag] = useState(Date.now());
  const [lastOpenThema, setLastOpenThema] = useState(Date.now());
  const [themaUpdating, setThemaUpdating] = useState<ThemaInterface>();
  const [groupUsers, setGroupUsers] = useState([]);

  const getGroupUser = async () => {
    try {
      const repon: any = await groupApi.getList();
      setGroupUsers(repon?.results?.objects?.rows || []);
    } catch (error) {}
  };

  useEffect(() => {
    getGroupUser();
  }, []);

  const convertThema = (thema: ThemaInterface) => {
    const viewGroup: any = thema?.groups
      ?.filter((item) => item.group_view)
      .map((item) => item.group_view.id);

    const postGroup: any = thema?.groups
      ?.filter((item) => item.group_post)
      .map((item) => item.group_post.id);

    const commentGroup: any = thema?.groups
      ?.filter((item) => item.group_comment)
      .map((item) => item.group_comment.id);

    return {
      ...thema,
      view_group_ids: viewGroup,
      post_group_ids: postGroup,
      comment_group_ids: commentGroup,
    };
  };

  const getListThema = async () => {
    try {
      setThemas([]);
      const data: Array<ThemaInterface> = await ThemaApi.getList();
      setThemas(data.map((item) => convertThema(item)));
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

  const cloneThema = async (id: string) => {
    try {
      await ThemaApi.cloneThema(id);
      getListThema();
      showSuccess("Success");
    } catch (error) {
      showError(error);
    }
  };

  const columns: TableColumnsType<ThemaInterface> = [
    {
      title: t("No"),
      width: 60,
      render: (value, record, index) => <BaseText>{index + 1}</BaseText>,
    },
    {
      title: t("Id"),
      width: 200,
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
      title: t("View permission"),
      width: 220,
      render: ({ view_group_ids, view_user_permissions, id }) => (
        <div className="flex flex-col gap-y-2">
          <BaseInputSelect
            multiple
            onChange={(value: any) => {
              updateThema({ id, view_user_permissions: value });
            }}
            defaultValue={view_user_permissions}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            placeholder="Select"
            options={Object.values(USER_PERMISSION).map((item, index) => {
              return {
                label: t(USER_PERMISSION_TEXT[item]),
                value: item,
              };
            })}
          />
          <BaseInputSelect
            multiple
            onChange={(value: any) => {
              updateThema({ id, view_group_ids: value });
            }}
            defaultValue={view_group_ids}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            placeholder="Select"
            options={[
              { label: t("All users"), value: SELECT_ALL },
              ...groupUsers.map((item: any, index) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              }),
            ]}
          />
        </div>
      ),
    },
    {
      title: t("Creation Permission"),
      width: 220,
      render: ({ post_user_permissions, post_group_ids, id }) => (
        <div className="flex flex-col gap-y-2">
          <BaseInputSelect
            multiple
            onChange={(value: any) => {
              updateThema({ id, post_user_permissions: value });
            }}
            defaultValue={post_user_permissions}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            placeholder="Select"
            options={Object.values(USER_PERMISSION).map((item, index) => {
              return {
                label: t(USER_PERMISSION_TEXT[item]),
                value: item,
              };
            })}
          />
          <BaseInputSelect
            multiple
            onChange={(value: any) => {
              updateThema({ id, post_group_ids: value });
            }}
            defaultValue={post_group_ids}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            placeholder="Select"
            options={[
              { label: t("All users"), value: SELECT_ALL },
              ...groupUsers.map((item: any, index) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              }),
            ]}
          />
        </div>
      ),
    },
    {
      title: t("Comment & review permission"),
      width: 220,
      render: ({ comment_user_permissions, comment_group_ids, id }) => (
        <div className="flex flex-col gap-y-2">
          <BaseInputSelect
            multiple
            onChange={(value: any) => {
              updateThema({ id, comment_user_permissions: value });
            }}
            defaultValue={comment_user_permissions}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            placeholder="Select"
            options={Object.values(USER_PERMISSION).map((item, index) => {
              return {
                label: t(USER_PERMISSION_TEXT[item]),
                value: item,
              };
            })}
          />
          <BaseInputSelect
            multiple
            onChange={(value: any) => {
              updateThema({ id, comment_group_ids: value });
            }}
            defaultValue={comment_group_ids}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            placeholder="Select"
            options={[
              { label: t("All users"), value: SELECT_ALL },
              ...groupUsers.map((item: any, index) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              }),
            ]}
          />
        </div>
      ),
    },
    {
      title: t("Reservation function point payment"),
      width: 160,
      render: ({ bonus_point, id }) => (
        <BaseInputSelect
          onChange={(value: any) => {
            updateThema({ id, bonus_point: value === "ON" ? true : false });
          }}
          defaultValue={bonus_point ? "ON" : "OFF"}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          placeholder="Select"
          options={["ON", "OFF"].map((item, index) => {
            return {
              label: item,
              value: item,
            };
          })}
        />
      ),
    },
    {
      title: t("Review writing type"),
      width: 160,
      render: ({ review_require, id }) => (
        <BaseInputSelect
          onChange={(value: any) => {
            updateThema({
              id,
              review_require:
                value === "Available upon reservation" ? true : false,
            });
          }}
          defaultValue={
            review_require ? "Available upon reservation" : "Anyone can do it"
          }
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          placeholder="Select"
          options={["Available upon reservation", "Anyone can do it"].map(
            (item, index) => {
              return {
                label: t(item),
                value: item,
              };
            }
          )}
        />
      ),
    },
    {
      title: t("Actions"),
      render: ({ id }, record) => (
        <div className="flex flex-row items-center">
          <img
            onClick={() => cloneThema(id)}
            src={Images.copy}
            className="w-6 h-6 cursor-pointer"
          />
          <img
            onClick={() => {
              setOpenModalEditThema(true);
              setThemaUpdating(record);
            }}
            src={Images.edit}
            className="w-6 h-6 ml-3 cursor-pointer"
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
    <div className="flex flex-col h-full">
      <BaseTable
        scroll={{ x: "max-content", y: "calc(80vh - 180px)" }}
        sticky={{ offsetHeader: -20 }}
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
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
const ListCategory = ({ lastOpen, themaId }: any) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Array<CategoryInterface>>([]);
  const { setLastRefresh } = useBulletinState((state) => state);

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
      setLastRefresh(Date.now());
    } catch (error) {
      showError(error);
    }
  };

  const deleteCategory = async (item: CategoryInterface) => {
    try {
      if (item.id) {
        await CategoryApi.deleteCategory(item.id || "");
        showSuccess("Success");
      }
      getCategory();
      setLastRefresh(Date.now());
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
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const ListTags = ({ lastOpen, themaId }: any) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<Array<TagThemaInterface>>([]);
  const { setLastRefresh } = useBulletinState((state) => state);

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
      setLastRefresh(Date.now());
    } catch (error) {
      showError(error);
    }
  };

  const deleteTag = async (item: TagThemaInterface) => {
    try {
      if (item.id) {
        await TagApi.deleteTag(item.id || "");
        showSuccess("Success");
      }
      getTags();
      setLastRefresh(Date.now());
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
