import { useEffect, useState } from "react";
import { BaseText } from "../../../components";
import { classNames } from "../../../utils/common";
import { PlusOutlined } from "@ant-design/icons";
import { BoardLinkInterface, ThemaInterface } from "../../../entities";
import { BoardLinkApi } from "../../../apis/boardLinkApi";
import { useBulletinState } from "../store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CategoryApi } from "../../../apis/categoryApi";

export const NEW_ID = "NEW_ID";
export default function BulletinLeft() {
  const { boardSelected, setBoardSelected, setLastRefresh, lastRefresh } =
    useBulletinState((state) => state);
  const [boardLinks, setBoardLinks] = useState<Array<BoardLinkInterface>>([]);
  const [cateDragging, setCateDragging] = useState(false);

  const _getBoardLinks = async () => {
    try {
      const respon = await BoardLinkApi.getList();
      setBoardLinks(respon);
    } catch (error) {}
  };

  const createBoardLink = async () => {
    try {
      const data = boardLinks.map((item) => item.id === NEW_ID);
      if (data[0]) return;
      setBoardLinks([{ id: NEW_ID, name: "New Link" }, ...boardLinks]);
      setBoardSelected({ id: NEW_ID, name: "New Link" });
    } catch (error) {}
  };

  useEffect(() => {
    _getBoardLinks();
  }, [lastRefresh]);

  const orderLink = async (
    prev_index_number: number,
    next_index_number: number
  ) => {
    console.log(prev_index_number, next_index_number);
    try {
      await BoardLinkApi.orderLink(boardLinks[prev_index_number].id, {
        prev_index_number: boardLinks[prev_index_number].index,
        next_index_number: boardLinks[next_index_number].index,
      });
      _getBoardLinks();
    } catch (error) {}
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    orderLink(result.source.index, result.destination.index);

    // const newItems = [...boardLinks];
    // const [reorderedItem] = newItems.splice(result.source.index, 1);
    // newItems.splice(result.destination.index, 0, reorderedItem);
    // setBoardLinks(newItems);
  };

  const orderLinkCategory = async (
    prev_index_number: number,
    next_index_number: number,
    linkIndex: number
  ) => {
    try {
      await CategoryApi.orderLinkCategory(
        boardLinks[linkIndex].categories?.[prev_index_number].id,
        {
          prev_index_number:
            boardLinks[linkIndex].categories?.[prev_index_number].index,
          next_index_number:
            boardLinks[linkIndex].categories?.[next_index_number].index,
        }
      );
      _getBoardLinks();
    } catch (error) {}
  };

  const onDragEndCategory = (result: any, linkIndex: number) => {
    setCateDragging(false);
    if (!result.destination) {
      return;
    }
    orderLinkCategory(result.source.index, result.destination.index, linkIndex);
    // const newItems = [...boardLinks];
    // const [reorderedItem] = newItems.splice(result.source.index, 1);
    // newItems.splice(result.destination.index, 0, reorderedItem);
    // setBoardLinks(newItems);
  };

  const onDragStartCate = () => {
    setCateDragging(true);
  };
  const boardLinkItem = (item: BoardLinkInterface, index: any) => {
    return (
      <div key={index} className={classNames("flex flex-col")}>
        <div
          className={classNames(
            "px-3 py-2 mb-1 rounded flex items-center cursor-pointer",
            boardSelected?.id === item.id ? "bg-dayBreakBlue50" : ""
          )}
          onClick={() => {
            setBoardSelected(item);
            setLastRefresh(Date.now());
          }}
        >
          <BaseText
            bold
            size={16}
            className={classNames(
              boardSelected?.id === item.id ? "text-dayBreakBlue500" : ""
            )}
          >
            {item.name}
          </BaseText>
        </div>
        <DragDropContext
          onDragStart={onDragStartCate}
          onDragEnd={(result: any) => {
            onDragEndCategory(result, index);
          }}
        >
          <Droppable droppableId={`droppableThema-${item.id}`}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {(item.categories || []).map((elem, i) => (
                  <Draggable
                    key={elem.category.id}
                    draggableId={elem.category.id}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <BaseText
                          key={`category${i}`}
                          medium
                          size={16}
                          className="text-darkNight700"
                        >
                          {elem.category.name}
                        </BaseText>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* <div className="flex flex-col pl-8">
          {(item.categories || []).map((elem, i) => {
            return (
              <BaseText
                key={`category${i}`}
                medium
                size={16}
                className="text-darkNight700"
              >
                {elem.category.name}
              </BaseText>
            );
          })}
        </div> */}
        <div className={classNames(cateDragging ? "h-[24px]" : "")}></div>
      </div>
    );
  };

  return (
    <div className="w-[300px] border-r p-6 max-h-full overflow-auto no-scrollbar">
      <div className={classNames("flex pb-4 items-center justify-between")}>
        <BaseText bold locale size={16} className="">
          Main
        </BaseText>
        <PlusOutlined
          className={classNames("text-xl cursor-pointer")}
          onClick={createBoardLink}
        />
      </div>
      {/* {boardLinkItem({ id: "HOME", name: "Home" }, "HOME")} */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableThema">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boardLinks.map((item: BoardLinkInterface, index: number) => {
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
                        {boardLinkItem(item, index)}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
