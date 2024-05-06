import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseInput } from "../../../components/input/BaseInput";
import { useEffect, useRef, useState } from "react";
import {
  BOARD,
  BOARD_TEXT,
  MAP_TYPE,
  VISIBLE_BOARDS,
} from "../../../utils/constants";
import { classNames } from "../../../utils/common";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import ThemaTable from "../thema/thema_table";
import { BaseModal2 } from "../../../components/modal/BaseModal2";
import { ThemaApi } from "../../../apis/themaApi";
import {
  BoardLinkInterface,
  CategoryInterface,
  TagThemaInterface,
  ThemaInterface,
} from "../../../entities";
import { useBulletinState } from "../store";
import { UploadApi } from "../../../apis/uploadApi";
import { showError } from "../../../utils/showToast";
import { BoardLinkApi } from "../../../apis/boardLinkApi";
import { useTranslation } from "react-i18next";
import { CategoryApi } from "../../../apis/categoryApi";
import { TagApi } from "../../../apis/tagApi";
import { NEW_ID } from "../viewleft";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Popconfirm } from "antd";

export default function BulletinSetting() {
  const [isShowBoardType, setShowBoardType] = useState(true);
  const [openModalThema, setOpenModalThema] = useState(false);
  const [themas, setThemas] = useState<Array<ThemaInterface>>([]);
  const [tags, setTags] = useState<Array<TagThemaInterface>>([]);
  const { boardSelected, setBoardSelected, setLastRefresh } = useBulletinState(
    (state) => state
  );
  const [boardTypeSelected, setBoardTypeSelected] = useState<string>(
    boardSelected.route || ""
  );

  const { t } = useTranslation();

  const getListThema = async (boardTypeSelected: string) => {
    if (boardTypeSelected === "") return [];
    // const filter = VISIBLE_BOARDS.includes(boardTypeSelected)
    //   ? `{"visible_boards": {"$contains": ["${boardTypeSelected}"]}}`
    //   : "";
    try {
      const data: Array<ThemaInterface> = await ThemaApi.getList({
        // filter,
      });
      setThemas(data);
      return data;
    } catch (error) {
      return [];
    }
  };

  const getListThemaAndUpdateBoard = async (boardTypeSelected: string) => {
    try {
      const data: Array<ThemaInterface> = await getListThema(boardTypeSelected);
      if (data[0]) {
        const dataCategories = await CategoryApi.getList({
          filter: `{"thema_id":"${data[0].id}"}`,
        });
        const category_ids = dataCategories.map(
          (item: CategoryInterface) => item.id
        );

        updateOrCreateBoardLink({
          ...boardSelected,
          route: boardTypeSelected,
          thema_id: data[0].id,
          category_ids: category_ids,
        });
      } else {
        showError(t("There are no thema containing this board type"));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListThema(boardTypeSelected);
  }, []);

  const updateOrCreateBoardLink = async (boardLink: BoardLinkInterface) => {
    setBoardSelected(boardLink);
    try {
      if (boardLink.id && boardLink.id !== NEW_ID) {
        const data = await BoardLinkApi.update(boardLink.id, boardLink);
        setBoardSelected(data);
      } else {
        const { id, ...linkData } = boardLink;
        const data = await BoardLinkApi.create(linkData);
        setBoardSelected(data);
      }
      setLastRefresh(Date.now());
    } catch (error) {
      showError(error);
    }
  };

  const getTagsWithThema = async () => {
    try {
      const data = await TagApi.getList({
        filter: `{"thema_id":"${boardSelected.thema_id}"}`,
      });
      setTags(data);
    } catch (error) {}
  };

  useEffect(() => {
    getTagsWithThema();
    setBoardTypeSelected(boardSelected.route || "");
  }, [boardSelected]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const respon = await UploadApi.uploadImage(file);
        updateOrCreateBoardLink({
          ...boardSelected,
          image: respon.url,
        });
      }
    } catch (error) {
      showError(error);
    }
  };

  const getCategories = async (thema_id: string) => {
    try {
      const data = await CategoryApi.getList({
        filter: `{"thema_id":"${thema_id}"}`,
      });
      const category_ids = data.map((item: CategoryInterface) => item.id);
      updateOrCreateBoardLink({
        ...boardSelected,
        thema_id,
        category_ids: category_ids,
      });
    } catch (error) {}
  };

  const deleteBoardLink = async () => {
    try {
      if (boardSelected.id && boardSelected.id !== NEW_ID) {
        await BoardLinkApi.delete(boardSelected.id);
      }
      setBoardSelected({
        id: "HOME",
        name: "Home",
      });
      setLastRefresh(Date.now());
    } catch (error) {
      showError(error);
    }
  };

  const _buildImageAndName = () => {
    return (
      <>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium>
            Image
          </BaseText>
          <input
            type="file"
            accept="image/*"
            id="image-link"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-link"
            className="flex flex-row bg-dayBreakBlue50 justify-between items-center rounded-md p-2 cursor-pointer"
          >
            <img src={Images.upload} className="w-5 h-5 mr-2" />
            <BaseText locale bold className="text-dayBreakBlue500">
              Upload
            </BaseText>
          </label>
        </div>
        <div className="flex flex-row justify-center items-center mt-[10px]">
          {boardSelected.image && (
            <img
              src={boardSelected.image}
              alt=""
              className="w-[100px] h-[100px] object-cover rounded-xl"
            />
          )}
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium>
            Board Name
          </BaseText>
          <BaseInput
            key={Date.now()}
            styleInputContainer="h-9"
            onSave={(value) => {
              updateOrCreateBoardLink({
                ...boardSelected,
                name: value,
              });
            }}
            onBlur={(value) => {
              updateOrCreateBoardLink({
                ...boardSelected,
                name: value,
              });
            }}
            defaultValue={boardSelected.name}
            placeholder="Typing...."
            className="w-[170px]"
          />
        </div>
      </>
    );
  };

  const _buildBoardType = () => {
    return (
      <>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium>
            Board Type
          </BaseText>
          <img
            onClick={() => setShowBoardType(!isShowBoardType)}
            src={
              isShowBoardType ? Images.chevronUpTiny : Images.chevronDownTiny
            }
            width={24}
            className="cursor-pointer"
          />
        </div>
        {isShowBoardType && (
          <div className="flex flex-wrap gap-[10px] mt-4">
            {Object.keys(BOARD).map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setBoardTypeSelected(item);
                    getListThemaAndUpdateBoard(item);
                  }}
                  key={index}
                  className={classNames(
                    "w-20 h-20  rounded-xl flex justify-center items-center flex-col cursor-pointer",
                    boardTypeSelected === item
                      ? "bg-dayBreakBlue50"
                      : "bg-darkNight50"
                  )}
                >
                  <img
                    src={
                      boardTypeSelected === item ? Images.board2 : Images.board
                    }
                    className="w-6 h-6 mb-1"
                  />
                  <BaseText
                    locale
                    medium
                    size={10}
                    className={classNames(
                      boardTypeSelected === item
                        ? "text-dayBreakBlue500"
                        : "text-darkNight500",
                      "text-center"
                    )}
                  >
                    {BOARD_TEXT[item]}
                  </BaseText>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  };

  const _buildThema = () => {
    return (
      <>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium className="flex-1 mr-3">
            Thema
          </BaseText>
          <BaseInputSelect
            key={Date.now()}
            className="!min-w-[100px]"
            onChange={(value: any) => {
              getCategories(value);
            }}
            defaultValue={boardSelected.thema_id}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            placeholder="Select"
            options={themas.map((item, index) => {
              return {
                label: t(item.name || ""),
                value: item.id || "",
              };
            })}
          />
          <img
            onClick={() => setOpenModalThema(true)}
            src={Images.setting3}
            className="w-[36px] ml-3 cursor-pointer"
          />
        </div>
      </>
    );
  };

  const _buildMapBrand = () => {
    return (
      <>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium>
            Map Brand
          </BaseText>
          <BaseInputSelect
            key={Date.now()}
            className="!min-w-[100px]"
            placeholder="Select"
            onChange={(value) => {
              updateOrCreateBoardLink({
                ...boardSelected,
                geolocation_api_type: value,
              });
            }}
            required={true}
            allowClear={false}
            size="middle"
            textInputSize={12}
            defaultValue={boardSelected.geolocation_api_type}
            options={Object.values(MAP_TYPE).map((item) => {
              return {
                label: t(item),
                value: item,
              };
            })}
          />
        </div>
      </>
    );
  };

  const orderTag = async (
    prev_index_number: number | undefined,
    next_index_number: number | undefined,
    tagIndex: number
  ) => {
    console.log(prev_index_number, next_index_number);
    try {
      await TagApi.orderTag(tags[tagIndex].id, {
        prev_index_number,
        next_index_number,
      });
      getTagsWithThema();
      setLastRefresh(Date.now());
    } catch (error) {
      showError(error);
      getTagsWithThema();
      setLastRefresh(Date.now());
    }
  };

  const onDragEndTag = (result: any) => {
    if (!result.destination) {
      return;
    }
    if (result.source.index < result.destination.index) {
      orderTag(
        tags[result.destination.index]?.index,
        tags[result.destination.index + 1]?.index,
        result.source.index
      );
    } else {
      orderTag(
        tags[result.destination.index - 1]?.index,
        tags[result.destination.index]?.index,
        result.source.index
      );
    }

    const newItems = [...tags];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setTags(newItems);
    // orderTag(result.source.index, result.destination.index);
  };

  const _buildTags = () => {
    return (
      <>
        <div className="flex flex-row justify-between items-center mt-4">
          <BaseText locale medium>
            Tags
          </BaseText>
        </div>

        {/* {tags.map((item, index) => {
            return (
              <div
                key={index}
                className="px-3 py-2 bg-darkNight50 rounded-full"
              >
                <BaseText size={12} medium>
                  {item.name}
                </BaseText>
              </div>
            );
          })} */}

        <DragDropContext onDragEnd={onDragEndTag}>
          <Droppable droppableId="droppableTags">
            {(provided) => (
              <div
                className="flex flex-wrap gap-3 mt-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tags.map((item, index: number) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id || NEW_ID}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="px-3 py-2 bg-darkNight50 rounded-full">
                            <BaseText size={12} medium>
                              {item.name}
                            </BaseText>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  };

  return (
    <div className="flex flex-col">
      <BaseText locale medium className="mt-4">
        SREEN
      </BaseText>
      {_buildImageAndName()}
      {_buildBoardType()}
      {_buildThema()}
      {_buildMapBrand()}
      {_buildTags()}

      {boardSelected.id && boardSelected.id !== NEW_ID && (
        <Popconfirm
          onConfirm={deleteBoardLink}
          title={t("Delete")}
          description={t("Are you sure to delete")}
        >
          <CustomButton
            className="mt-5 bg-dustRed50 border-none"
            classNameTitle="text-dustRed500"
            medium
            locale
          >
            Delete Main
          </CustomButton>
        </Popconfirm>
      )}

      <BaseModal2
        width="80vw"
        bodyStyle='h-[80vh]'
        noScroll
        isOpen={openModalThema}
        onClose={() => {
          setOpenModalThema(false);
        }}
        onSubmit={() => {
          setOpenModalThema(false);
        }}
        title="Thema Management"
        isHideAction
        children={<ThemaTable key={Date.now()} />}
      ></BaseModal2>
    </div>
  );
}
