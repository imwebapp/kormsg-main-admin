import { Switch } from "antd";
import { BaseText, CustomButton } from "../../../components";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import {
  BOARD_TEXT,
  SELECT_ALL,
  USER_PERMISSION,
  USER_PERMISSION_TEXT,
  VISIBLE_BOARDS,
} from "../../../utils/constants";
import { groupApi } from "../../../apis/groupApi";
import { useEffect, useState } from "react";
import { classNames } from "../../../utils/common";
import { ThemaInterface } from "../../../entities";
import { ThemaApi } from "../../../apis/themaApi";
import { showError, showSuccess } from "../../../utils/showToast";

export const ThemaDetail = ({
  lastOpen,
  themaProps,
  closeModal,
  submitModal,
}: any) => {
  const [thema, setThema] = useState<ThemaInterface>();
  const [groupUsers, setGroupUsers] = useState([]);

  const getGroupUser = async () => {
    try {
      const repon: any = await groupApi.getList();
      setGroupUsers(repon?.results?.objects?.rows || []);
    } catch (error) {}
  };

  useEffect(() => {
    const viewGroup: any = (themaProps as ThemaInterface)?.groups
      ?.filter((item) => item.group_view)
      .map((item) => item.group_view.id);

    const postGroup: any = (themaProps as ThemaInterface)?.groups
      ?.filter((item) => item.group_post)
      .map((item) => item.group_post.id);

    const commentGroup: any = (themaProps as ThemaInterface)?.groups
      ?.filter((item) => item.group_comment)
      .map((item) => item.group_comment.id);

    setThema({
      ...themaProps,
      view_group_ids: viewGroup,
      post_group_ids: postGroup,
      comment_group_ids: commentGroup,
    });
    getGroupUser();
  }, [lastOpen, themaProps]);

  const submit = async () => {
    if (!thema) return;
    try {
      console.log("thema", thema);
      if (thema.id) {
        await ThemaApi.updateThema(thema.id, thema);
      } else {
        await ThemaApi.createThema(thema);
      }
      showSuccess("Success");
      submitModal && submitModal();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <BaseInput
          onChange={(value) => {
            setThema({
              ...thema,
              description: value,
            });
          }}
          textArea
          value={thema?.description}
          defaultValue={thema?.description}
          title="Description"
          placeholder="Enter description"
        />
        <BaseInput
          styleInputContainer="h-[40px]"
          onChange={(value) => {
            setThema({
              ...thema,
              name: value,
            });
          }}
          value={thema?.name}
          defaultValue={thema?.name}
          title="Name"
          placeholder="Enter name"
        />
        <BaseInputSelect
          className="mt-4 "
          title="Visible boards"
          onChange={(value: any) => {
            setThema({
              ...thema,
              visible_boards: value,
            });
          }}
          value={thema?.visible_boards}
          defaultValue={thema?.visible_boards}
          allowClear={false}
          textInputSize={12}
          placeholder="Select"
          multiple
          options={VISIBLE_BOARDS.map((item, index) => {
            return {
              label: BOARD_TEXT[item],
              value: item,
            };
          })}
        />
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        <BaseText locale bold size={16} className="my-4">
          Adult certification
        </BaseText>
        <div className="flex flex-row justify-between">
          <BaseText locale medium>
            Adult verification status
          </BaseText>
          <Switch
            value={thema?.is_for_adults}
            onChange={(value) => {
              setThema({
                ...thema,
                is_for_adults: value,
              });
            }}
          />
        </div>
        <div className="flex flex-row justify-between mt-4">
          <BaseText locale medium>
            Whether profile features are exposed?
          </BaseText>
          <Switch
            value={thema?.mentor_status}
            onChange={(value) => {
              setThema({
                ...thema,
                mentor_status: value,
              });
            }}
          />
        </div>
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        <BaseText locale bold size={16} className="mt-8">
          Setting permissions
        </BaseText>

        <div className="flex flex-row justify-between mt-4">
          <BaseText locale bold>
            Whether to be reviewed by administrator when uploading writing
          </BaseText>
          <Switch
            value={thema?.is_post_moderation}
            onChange={(value) => {
              setThema({
                ...thema,
                is_post_moderation: value,
              });
            }}
          />
        </div>
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        {/* <div className="flex flex-col items-start mt-4">
          <BaseText locale bold>
            View
          </BaseText>
          <div className="flex flex-row w-full mt-2">
            <div className="flex-1">
              <BaseInputSelect
                multiple
                onChange={(value: any) => {
                  setThema({
                    ...thema,
                    view_user_permissions: value,
                  });
                }}
                defaultValue={thema?.view_user_permissions}
                required={true}
                allowClear={false}
                size="middle"
                textInputSize={12}
                placeholder="Select"
                options={Object.values(USER_PERMISSION).map((item, index) => {
                  return {
                    label: USER_PERMISSION_TEXT[item],
                    value: item,
                  };
                })}
              />
            </div>
            <div className="w-4"></div>
            <div className="flex-1">
              <BaseInputSelect
                multiple
                onChange={(value: any) => {
                  setThema({
                    ...thema,
                    view_group_ids: value,
                  });
                }}
                defaultValue={thema?.view_group_ids}
                required={true}
                allowClear={false}
                size="middle"
                textInputSize={12}
                placeholder="Select"
                options={[
                  { label: "All users", value: SELECT_ALL },
                  ...groupUsers.map((item: any, index) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  }),
                ]}
              />
            </div>
          </div>
        </div> */}

        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        
        {/* <div className="flex flex-col items-start mt-4">
          <BaseText locale bold>
            Writing
          </BaseText>
          <div className="flex flex-row w-full mt-2">
            <div className="flex-1">
              <BaseInputSelect
                multiple
                onChange={(value: any) => {
                  setThema({
                    ...thema,
                    post_user_permissions: value,
                  });
                }}
                defaultValue={thema?.post_user_permissions}
                required={true}
                allowClear={false}
                size="middle"
                textInputSize={12}
                placeholder="Select"
                options={Object.values(USER_PERMISSION).map((item, index) => {
                  return {
                    label: USER_PERMISSION_TEXT[item],
                    value: item,
                  };
                })}
              />
            </div>
            <div className="w-4"></div>
            <div className="flex-1">
              <BaseInputSelect
                multiple
                onChange={(value: any) => {
                  setThema({
                    ...thema,
                    post_group_ids: value,
                  });
                }}
                defaultValue={thema?.post_group_ids}
                required={true}
                allowClear={false}
                size="middle"
                textInputSize={12}
                placeholder="Select"
                options={[
                  { label: "All users", value: SELECT_ALL },
                  ...groupUsers.map((item: any, index) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  }),
                ]}
              />
            </div>
          </div>
        </div> */}

        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        {/* ////////////////////////////////////// */}
        {/* <div className="flex flex-col items-start mt-4">
          <BaseText locale bold>
            Comments
          </BaseText>
          <div className="flex flex-row w-full mt-2">
            <div className="flex-1">
              <BaseInputSelect
                multiple
                onChange={(value: any) => {
                  setThema({
                    ...thema,
                    comment_user_permissions: value,
                  });
                }}
                defaultValue={thema?.comment_user_permissions}
                required={true}
                allowClear={false}
                size="middle"
                textInputSize={12}
                placeholder="Select"
                options={Object.values(USER_PERMISSION).map((item, index) => {
                  return {
                    label: USER_PERMISSION_TEXT[item],
                    value: item,
                  };
                })}
              />
            </div>
            <div className="w-4"></div>
            <div className="flex-1">
              <BaseInputSelect
                multiple
                onChange={(value: any) => {
                  setThema({
                    ...thema,
                    comment_group_ids: value,
                  });
                }}
                defaultValue={thema?.comment_group_ids}
                required={true}
                allowClear={false}
                size="middle"
                textInputSize={12}
                placeholder="Select"
                options={[
                  { label: "All users", value: SELECT_ALL },
                  ...groupUsers.map((item: any, index) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  }),
                ]}
              />
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex gap-4  py-4 ">
        <CustomButton
          onClick={closeModal}
          locale
          bold
          className={classNames(" w-full py-6")}
        >
          {"Cancel"}
        </CustomButton>
        <CustomButton
          onClick={submit}
          primary
          locale
          bold
          className={classNames("w-full py-6")}
        >
          {"Confirm"}
        </CustomButton>
      </div>
    </>
  );
};
