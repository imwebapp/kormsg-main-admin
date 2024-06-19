import { notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { stationLineApi } from "../../../apis/stationLineApi";
import { storeApi } from "../../../apis/storeApi";
import Images from "../../../assets/gen";
import { BaseText } from "../../../components";
import { BaseInput } from "../../../components/input/BaseInput";
import { classNames, convertParams } from "../../../utils/common";
import { showError } from "../../../utils/showToast";
import { REGION_TYPE } from "../../../utils/constants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { subwayApi } from "../../../apis/stationSubwayApi";
import { stationApi } from "../../../apis/stationApi";

export const SubwaySetting = () => {
  const fileExcelRef = useRef<any>(null);
  const [valueRegion, setValueRegion] = useState(REGION_TYPE.KOREA);
  const [listStation, setListStation] = useState<any>([]);
  const [listStationLine, setListStationLine] = useState<any>([]);
  const [listSubway, setListSubway] = useState<any>([]);
  const [stationSelected, setStationSelected] = useState<any>();
  const [stationLineSelected, setStationLineSelected] = useState<any>();
  const [subwaySelected, setSubwaySelected] = useState<any>();

  const [isCreatingStationLineName, setIsCreatingStationLineName] =
    useState(false);
  const [isEditingStationLineName, setIsEditingStationLineName] =
    useState(false);
  const [newStationLineName, setNewStationLineName] = useState("");
  const [valueInputCreateStationLine, setValueInputCreateStationLine] =
    useState("");

  const [isCreatingSubwayName, setIsCreatingSubwayName] = useState(false);
  const [isEditingSubwayName, setIsEditingSubwayName] = useState(false);
  const [newSubwayName, setNewSubwayName] = useState("");
  const [valueInputCreateSubway, setValueInputCreateSubway] = useState("");
  const [regionDragging, setStationLineDragging] = useState(false);
  const [subwayDragging, setSubwayDragging] = useState(false);

  const getListStation = async () => {
    try {
      const resListStation: any = await stationApi.getList(
        convertParams({
          limit: 50,
          fields: ["$all"],
          filter: {
            region: valueRegion,
          },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListStation?.code === 200) {
        setListStation(resListStation?.results?.objects?.rows || []);
        resListStation?.results?.objects?.rows.length > 0 &&
          setStationSelected(resListStation?.results?.objects?.rows[0]);
      }
    } catch (error: any) {
      console.log("err getList Group: ", error);
    }
  };
  const getListStationLine = async () => {
    try {
      const resListStationLine: any = await stationLineApi.getList(
        convertParams({
          limit: 50,
          fields: ["$all"],
          filter: { setting_station_id: stationSelected.id },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListStationLine?.code === 200) {
        console.log("resListStationLine: ", resListStationLine);
        setListStationLine(resListStationLine?.results?.objects?.rows || []);
        resListStationLine?.results?.objects?.rows.length > 0 &&
          setStationLineSelected(resListStationLine?.results?.objects?.rows[0]);
      }
    } catch (error: any) {
      console.log("err getList Group: ", error);
    }
  };
  const getListSubway = async () => {
    try {
      const resListSubway: any = await subwayApi.getList(
        convertParams({
          limit: 50,
          fields: ["$all"],
          filter: { setting_station_line_id: stationLineSelected.id },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListSubway?.code === 200) {
        console.log("resListSubway: ", resListSubway);
        setListSubway(resListSubway?.results?.objects?.rows || []);
      }
    } catch (error: any) {
      console.log("err getList Group: ", error);
    }
  };

  //upload excel
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const response: any = await storeApi.uploadExcel(file);
        if (response.code === 200) {
          notification.success({
            message: "Upload Excell Success",
          });
        }
      }
    } catch (error) {
      showError(error);
    }
  };

  const handleCreateStationLine = async () => {
    if (valueInputCreateStationLine.trim() === "") {
      setIsCreatingStationLineName(false);
      return;
    }
    const res: any = await stationLineApi.create({
      name: valueInputCreateStationLine,
      setting_station_id: stationSelected.id,
    });
    if (res.code === 200) {
      getListStationLine();
      setValueInputCreateStationLine("");
      setIsCreatingStationLineName(false);
    } else {
      console.log("err: ", res);
      setIsCreatingStationLineName(false);
    }
  };

  const handleEditStationLineName = () => {
    setIsEditingStationLineName(true);
    setNewStationLineName(stationLineSelected.name);
  };

  const handleSaveStationLineName = async () => {
    if (
      newStationLineName === "" ||
      newStationLineName === stationLineSelected.name
    ) {
      setNewStationLineName(stationLineSelected.name);
      setIsEditingStationLineName(false);
      return;
    }
    const resEditStationLine: any = await stationLineApi.update(
      stationLineSelected.id.toString(),
      { name: newStationLineName.trim() }
    );
    if (resEditStationLine?.code === 200) {
      const updatedStationLines = listStationLine.map((region: any) => {
        if (region.id === stationLineSelected.id) {
          setStationLineSelected({
            ...region,
            name: newStationLineName.trim(),
          });
          return { ...region, name: newStationLineName.trim() };
        }
        return region;
      });
      setListStationLine(updatedStationLines);
    }
    setIsEditingStationLineName(false);
  };

  const handleUpStationLine = async (region: any) => {};

  const handleDownStationLine = async (region: any) => {};

  const handleDeleteStationLine = async (region: any) => {
    try {
      const resDeleteStationLine: any = await stationLineApi.delete(
        region.id.toString()
      );
      if (resDeleteStationLine?.code === 200) {
        const updatedStationLines = listStationLine.filter(
          (item: any) => item.id !== region.id
        );
        setListStationLine(updatedStationLines);
        setStationLineSelected(updatedStationLines[0]);
        setIsEditingStationLineName(false);
      }
    } catch (error: any) {
      console.log("err delete region: ", error);
    }
  };

  //subway
  const handleCreateSubway = async () => {
    if (valueInputCreateSubway.trim() === "") {
      setIsCreatingSubwayName(false);
      return;
    }
    const res: any = await subwayApi.create({
      name: valueInputCreateSubway,
      setting_station_line_id: stationLineSelected.id,
    });
    if (res.code === 200) {
      getListSubway();
      setValueInputCreateSubway("");
      setIsCreatingSubwayName(false);
    } else {
      console.log("err: ", res);
      setIsCreatingSubwayName(false);
    }
  };

  const handleEditSubwayName = () => {
    setIsEditingSubwayName(true);
    setNewSubwayName(subwaySelected.name);
  };

  const handleSaveSubwayName = async () => {
    if (newSubwayName === "" || newSubwayName === subwaySelected.name) {
      setNewSubwayName(subwaySelected.name);
      setIsEditingSubwayName(false);
      return;
    }
    const resEditSubway: any = await subwayApi.update(
      subwaySelected.id.toString(),
      {
        name: newSubwayName.trim(),
      }
    );
    if (resEditSubway?.code === 200) {
      const updatedSubways = listSubway.map((Subway: any) => {
        if (Subway.id === subwaySelected.id) {
          setSubwaySelected({ ...Subway, name: newSubwayName.trim() });
          return { ...Subway, name: newSubwayName.trim() };
        }
        return Subway;
      });
      setListSubway(updatedSubways);
    }
    setIsEditingSubwayName(false);
  };

  const handleUpSubway = async (subway: any) => {};

  const handleDownSubway = async (subway: any) => {};

  const handleDeleteSubway = async (subway: any) => {
    try {
      const resDeleteSubway: any = await subwayApi.delete(subway.id.toString());
      if (resDeleteSubway?.code === 200) {
        const updatedSubways = listSubway.filter(
          (item: any) => item.id !== subway.id
        );
        setListSubway(updatedSubways);
        setSubwaySelected(updatedSubways[0]);
        setIsEditingSubwayName(false);
      }
    } catch (error: any) {
      console.log("err delete Subway: ", error);
    }
  };

  useEffect(() => {
    setStationSelected(undefined);
    setStationLineSelected(undefined);
    setSubwaySelected(undefined);
    setListStation([]);
    setListStationLine([]);
    setListSubway([]);
    /////////////
    getListStation();
  }, [valueRegion]);

  useEffect(() => {
    setSubwaySelected(undefined);
    setStationLineSelected(undefined);
    setListStationLine([]);
    setListSubway([]);
    ////////////////
    getListStationLine();
  }, [stationSelected]);

  useEffect(() => {
    setSubwaySelected(undefined);
    setListSubway([]);
    //////////////////
    getListSubway();
  }, [stationLineSelected]);

  const orderStationLine = async (
    prev_index_number: number | undefined,
    next_index_number: number | undefined,
    index: number
  ) => {
    try {
      await stationLineApi.orderstationLine(listStationLine[index].id, {
        prev_index_number,
        next_index_number,
      });
      getListStationLine();
    } catch (error) {
      showError(error);
      getListStationLine();
    }
  };

  const onDragStationLineEnd = (result: any) => {
    setStationLineDragging(false);
    try {
      if (!result.destination) {
        return;
      }
      if (result.source.index < result.destination.index) {
        orderStationLine(
          listStationLine[result.destination.index]?.index,
          listStationLine[result.destination.index + 1]?.index,
          result.source.index
        );
      } else {
        orderStationLine(
          listStationLine[result.destination.index - 1]?.index,
          listStationLine[result.destination.index]?.index,
          result.source.index
        );
      }
      const newItems = [...listStationLine];
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      setListStationLine(newItems);
    } catch (error) {}
  };

  const orderSubway = async (
    prev_index_number: number | undefined,
    next_index_number: number | undefined,
    index: number
  ) => {
    try {
      await subwayApi.ordersubway(listSubway[index].id, {
        prev_index_number,
        next_index_number,
      });
      getListSubway();
    } catch (error) {
      showError(error);
      getListSubway();
    }
  };

  const onDragEndSubway = (result: any) => {
    setSubwayDragging(false);
    try {
      if (!result.destination) {
        return;
      }

      //////////////////////////////////
      //////////////////////////////////

      //////////////////////////////////
      //////////////////////////////////
      if (result.source.index < result.destination.index) {
        orderSubway(
          listSubway[result.destination.index]?.index,
          listSubway[result.destination.index + 1]?.index,
          result.source.index
        );
      } else {
        orderSubway(
          listSubway[result.destination.index - 1]?.index,
          listSubway[result.destination.index]?.index,
          result.source.index
        );
      }
      const newItems = [...listSubway];
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      setListSubway(newItems);
    } catch (error) {
      console.log("error", error);
    }
  };

  const _buildSubway = () => {
    return (
      <div className="w-3/4">
        <div className="px-3">
          <DragDropContext
            onDragStart={() => setSubwayDragging(true)}
            onDragEnd={onDragEndSubway}
          >
            <Droppable
              droppableId={`droppableSubway-${stationLineSelected.id}`}
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {listSubway.map((item: any, index: number) => {
                    const checkSelected =
                      subwaySelected && subwaySelected.id === item.id;
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={classNames(
                              snapshot.isDragging
                                ? "bg-dayBreakBlue50 rounded-lg"
                                : ""
                            )}
                          >
                            <div
                              key={index}
                              className={classNames(
                                "flex py-[10px] justify-between",
                                !isEditingSubwayName &&
                                  checkSelected &&
                                  !isCreatingSubwayName
                                  ? "bg-darkNight100 rounded-lg"
                                  : ""
                              )}
                              onClick={() => {
                                setSubwaySelected(item);
                              }}
                              onDoubleClick={handleEditSubwayName}
                            >
                              {isEditingSubwayName && checkSelected ? (
                                <div className="flex items-center justify-between flex-1 pr-4 border rounded-lg border-dayBreakBlue500">
                                  <BaseInput
                                    value={newSubwayName}
                                    onChange={(value) =>
                                      setNewSubwayName(value)
                                    }
                                    // onBlur={handleSaveSubwayName}
                                    onSave={handleSaveSubwayName}
                                    autoFocus
                                    styleInputContainer="w-full font-medium bg-white border-none text-darkNight900"
                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                  />
                                  {!isCreatingSubwayName && checkSelected && (
                                    <div className="flex gap-1">
                                      {/* <div onClick={() => handleUpSubway(item)}>
                                            <img
                                                src={Images.arrowUp2}
                                                className="w-6 h-6 cursor-pointer"
                                            />
                                        </div>
                                        <div onClick={() => handleDownSubway(item)}>
                                            <img
                                                src={Images.arrowDown2}
                                                className="w-6 h-6 cursor-pointer"
                                            />
                                        </div> */}
                                      <div
                                        onClick={() => handleDeleteSubway(item)}
                                      >
                                        <img
                                          src={Images.trash}
                                          className="w-6 h-6 cursor-pointer"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="flex justify-between w-full px-2 ">
                                  <BaseText
                                    locale
                                    size={16}
                                    bold
                                    className={classNames(
                                      !isCreatingSubwayName &&
                                        checkSelected &&
                                        !isCreatingSubwayName
                                        ? "text-primary"
                                        : ""
                                    )}
                                  >
                                    {item.name}
                                  </BaseText>
                                  {!isCreatingSubwayName && checkSelected && (
                                    <img
                                      src={Images.edit2}
                                      alt="Excel upload"
                                      className="w-6 h-6 text-white cursor-pointer"
                                      onClick={handleEditSubwayName}
                                    />
                                  )}
                                </div>
                              )}
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

          {isCreatingSubwayName && (
            <div
              className={classNames("flex items-center mb-2 cursor-pointer")}
              onClick={() => {}}
            >
              <BaseInput
                value={valueInputCreateSubway}
                onChange={(value) => setValueInputCreateSubway(value)}
                placeholder="Enter subway name"
                // onBlur={handleCreateStationLine}
                onSave={handleCreateSubway}
                autoFocus
                className="w-full"
                styleInputContainer="w-full font-medium bg-white border rounded-lg border-dayBreakBlue500 text-darkNight900"
                styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
              />
            </div>
          )}
        </div>
        <div
          className={classNames(
            "ml-2 cursor-pointer",
            subwayDragging ? "mt-[52px]" : "mt-2"
          )}
          onClick={() => {
            setIsCreatingSubwayName(true);
          }}
        >
          <BaseText locale size={16} bold className="text-primary">
            + Create one more
          </BaseText>
        </div>
      </div>
    );
  };

  const _buildStationLine = () => {
    return (
      <div className="w-1/4">
        <div className="flex-col pr-2 border-r">
          <DragDropContext
            onDragStart={() => setStationLineDragging(true)}
            onDragEnd={onDragStationLineEnd}
          >
            <Droppable droppableId="droppableStationLine">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {listStationLine.map((item: any, index: number) => {
                    const checkSelected =
                      stationLineSelected && stationLineSelected.id === item.id;
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={classNames(
                              snapshot.isDragging ? "bg-black rounded-lg " : ""
                            )}
                          >
                            <div
                              key={index}
                              className={classNames(
                                "flex py-[10px] justify-between",
                                !isEditingStationLineName &&
                                  checkSelected &&
                                  !isCreatingStationLineName
                                  ? "bg-darkNight900 rounded-xl"
                                  : ""
                              )}
                              onClick={() => {
                                setIsEditingStationLineName(false);
                                setStationLineSelected(item);
                              }}
                              onDoubleClick={handleEditStationLineName}
                            >
                              {isEditingStationLineName && checkSelected ? (
                                <div className="flex items-center justify-between flex-1 pr-4 border rounded-lg border-dayBreakBlue500">
                                  <BaseInput
                                    value={newStationLineName}
                                    onChange={(value) =>
                                      setNewStationLineName(value)
                                    }
                                    // onBlur={handleSaveStationLineName}
                                    onSave={handleSaveStationLineName}
                                    autoFocus
                                    styleInputContainer="w-full font-medium bg-white border-none text-darkNight900"
                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                  />
                                  {!isCreatingStationLineName &&
                                    checkSelected && (
                                      <div className="flex gap-1">
                                        {/* <div onClick={() => handleUpStationLine(item)}>
                                                      <img
                                                          src={Images.arrowUp2}
                                                          className="w-6 h-6 cursor-pointer"
                                                      />
                                                  </div>
                                                  <div onClick={() => handleDownStationLine(item)}>
                                                      <img
                                                          src={Images.arrowDown2}
                                                          className="w-6 h-6 cursor-pointer"
                                                      />
                                                  </div> */}
                                        <div
                                          onClick={() =>
                                            handleDeleteStationLine(item)
                                          }
                                        >
                                          <img
                                            src={Images.trash}
                                            className="w-6 h-6 cursor-pointer"
                                          />
                                        </div>
                                      </div>
                                    )}
                                </div>
                              ) : (
                                <div className="flex justify-between w-full px-4">
                                  <BaseText
                                    locale
                                    size={16}
                                    bold
                                    className={classNames(
                                      (!isCreatingStationLineName &&
                                        checkSelected &&
                                        !isCreatingStationLineName) ||
                                        snapshot.isDragging
                                        ? "text-white"
                                        : ""
                                    )}
                                  >
                                    {item.name}
                                  </BaseText>
                                  {!isCreatingStationLineName &&
                                    checkSelected && (
                                      <img
                                        src={Images.edit2White}
                                        alt="Excel upload"
                                        className="w-6 h-6 text-white cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEditStationLineName();
                                        }}
                                      />
                                    )}
                                </div>
                              )}
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

          {isCreatingStationLineName && (
            <div
              className={classNames("flex items-center mb-2 cursor-pointer")}
              onClick={() => {}}
            >
              <BaseInput
                value={valueInputCreateStationLine}
                onChange={(value) => setValueInputCreateStationLine(value)}
                placeholder="Enter station_line name"
                // onBlur={handleCreateStationLine}
                onSave={handleCreateStationLine}
                autoFocus
                className="w-full"
                styleInputContainer="w-full font-medium bg-white border rounded-lg border-dayBreakBlue500 text-darkNight900"
                styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
              />
            </div>
          )}
        </div>
        <div
          className={classNames(
            "cursor-pointer",
            !!regionDragging ? "mt-[54px]" : "mt-2"
          )}
          onClick={() => {
            setIsCreatingStationLineName(true);
          }}
        >
          <BaseText locale size={16} bold className="text-primary">
            + Create one more
          </BaseText>
        </div>
      </div>
    );
  };

  const _buildStation = () => {
    return (
      <div>
        {valueRegion === REGION_TYPE.KOREA && (
          <div className="flex-row flex">
            {listStation.map((item: any, index: number) => {
              return (
                <div
                  onClick={() => setStationSelected(item)}
                  className={classNames(
                    "ml-[-1px] cursor-pointer px-5 py-3 border justify-center items-center",
                    stationSelected?.id === item?.id
                      ? "border-[#0866FF] bg-[#E6F4FF] z-[1000]"
                      : ""
                  )}
                >
                  <BaseText
                    medium
                    size={16}
                    className={classNames(
                      "text-center",
                      stationSelected?.id === item?.id ? "text-[#0866FF] " : ""
                    )}
                  >
                    {item.name}
                  </BaseText>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const _buildAction = () => {
    return (
      <>
        <div className="flex gap-2 border rounded-full w-fit">
          <div
            className={`flex-1 p-2 cursor-pointer ${
              valueRegion === REGION_TYPE.KOREA ? "bg-black rounded-full" : ""
            }`}
            onClick={() => {
              setValueRegion(REGION_TYPE.KOREA);
            }}
          >
            <BaseText
              locale
              medium
              className={`${
                valueRegion === REGION_TYPE.KOREA ? "text-white" : "text-black"
              }`}
            >
              Korean
            </BaseText>
          </div>
          <div
            className={`flex-1 p-2 cursor-pointer ${
              valueRegion === REGION_TYPE.GLOBAL ? "bg-black rounded-full" : ""
            }`}
            onClick={() => {
              setValueRegion(REGION_TYPE.GLOBAL);
            }}
          >
            <BaseText
              locale
              medium
              className={`${
                valueRegion === REGION_TYPE.GLOBAL ? "text-white" : "text-black"
              }`}
            >
              Global
            </BaseText>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {_buildStation()}
          <div
            className="flex gap-2 justify-center px-4 py-2.5 rounded-xl border-2 border-gray-200 border-solid cursor-pointer"
            onClick={() => {
              fileExcelRef?.current?.click();
            }}
          >
            <img
              src={Images.uploadExcel}
              alt="Excel upload"
              className="w-6 h-6 shrink-0 aspect-square"
            />
            <BaseText locale>Upload Excel</BaseText>
            <input
              ref={fileExcelRef}
              // onChange={handleFileChange}
              id="fileExcel"
              type="file"
              className="hidden"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </div>
          {/* <CustomButton
                    className="py-6"
                    onClick={() => {
                        console.log('Update');
                    }}
                    locale
                    primary
                    bold
                >
                    Update
                </CustomButton> */}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      {_buildAction()}
      <div className="flex">
        {_buildStationLine()}
        {stationLineSelected && _buildSubway()}
      </div>
    </div>
  );
};
