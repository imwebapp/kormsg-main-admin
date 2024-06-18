import { notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { districtApi } from "../../../apis/districtApi";
import { regionApi } from "../../../apis/regionApi";
import { storeApi } from "../../../apis/storeApi";
import Images from "../../../assets/gen";
import { BaseText } from "../../../components";
import { BaseInput } from "../../../components/input/BaseInput";
import { classNames, convertParams } from "../../../utils/common";
import { showError } from "../../../utils/showToast";
import { REGION_TYPE } from "../../../utils/constants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const RegionSetting = () => {
  const fileExcelRef = useRef<any>(null);
  const [valueRegion, setValueRegion] = useState(REGION_TYPE.KOREA);
  const [listRegion, setListRegion] = useState<any>([]);
  const [listDistrict, setListDistrict] = useState<any>([]);
  const [regionSelected, setRegionSelected] = useState<any>();
  const [districtSelected, setDistrictSelected] = useState<any>();

  const [isCreatingRegionName, setIsCreatingRegionName] = useState(false);
  const [isEditingRegionName, setIsEditingRegionName] = useState(false);
  const [newRegionName, setNewRegionName] = useState("");
  const [valueInputCreateRegion, setValueInputCreateRegion] = useState("");

  const [isCreatingDistrictName, setIsCreatingDistrictName] = useState(false);
  const [isEditingDistrictName, setIsEditingDistrictName] = useState(false);
  const [newDistrictName, setNewDistrictName] = useState("");
  const [valueInputCreateDistrict, setValueInputCreateDistrict] = useState("");
  const [regionDragging, setRegionDragging] = useState(false);
  const [districtDragging, setDistrictDragging] = useState(false);

  const getListRegion = async () => {
    try {
      const resListRegion: any = await regionApi.getList(
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
      if (resListRegion?.code === 200) {
        console.log("resListRegion: ", resListRegion);
        setListRegion(resListRegion?.results?.objects?.rows || []);
        resListRegion?.results?.objects?.rows.length > 0 &&
          setRegionSelected(resListRegion?.results?.objects?.rows[0]);
      }
    } catch (error: any) {
      console.log("err getList Group: ", error);
    }
  };
  const getListDistrict = async () => {
    try {
      const resListDistrict: any = await districtApi.getList(
        convertParams({
          limit: 50,
          fields: ["$all"],
          filter: { setting_province_id: regionSelected.id },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListDistrict?.code === 200) {
        console.log("resListDistrict: ", resListDistrict);
        setListDistrict(resListDistrict?.results?.objects?.rows || []);
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

  //province
  const handleCreateRegion = async () => {
    if (valueInputCreateRegion.trim() === "") {
      setIsCreatingRegionName(false);
      return;
    }
    const res: any = await regionApi.create({
      name: valueInputCreateRegion,
      region: valueRegion,
    });
    if (res.code === 200) {
      getListRegion();
      setValueInputCreateRegion("");
      setIsCreatingRegionName(false);
    } else {
      console.log("err: ", res);
      setIsCreatingRegionName(false);
    }
  };

  const handleEditRegionName = () => {
    setIsEditingRegionName(true);
    setNewRegionName(regionSelected.name);
  };

  const handleSaveRegionName = async () => {
    if (newRegionName === "" || newRegionName === regionSelected.name) {
      setNewRegionName(regionSelected.name);
      setIsEditingRegionName(false);
      return;
    }
    const resEditRegion: any = await regionApi.update(
      regionSelected.id.toString(),
      { name: newRegionName.trim() }
    );
    if (resEditRegion?.code === 200) {
      const updatedRegions = listRegion.map((region: any) => {
        if (region.id === regionSelected.id) {
          setRegionSelected({ ...region, name: newRegionName.trim() });
          return { ...region, name: newRegionName.trim() };
        }
        return region;
      });
      setListRegion(updatedRegions);
    }
    setIsEditingRegionName(false);
  };

  const handleUpRegion = async (region: any) => {};

  const handleDownRegion = async (region: any) => {};

  const handleDeleteRegion = async (region: any) => {
    try {
      const resDeleteRegion: any = await regionApi.delete(region.id.toString());
      if (resDeleteRegion?.code === 200) {
        const updatedRegions = listRegion.filter(
          (item: any) => item.id !== region.id
        );
        setListRegion(updatedRegions);
        setRegionSelected(updatedRegions[0]);
        setIsEditingRegionName(false);
      }
    } catch (error: any) {
      console.log("err delete region: ", error);
    }
  };

  //district
  const handleCreateDistrict = async () => {
    if (valueInputCreateDistrict.trim() === "") {
      setIsCreatingDistrictName(false);
      return;
    }
    const res: any = await districtApi.create({
      name: valueInputCreateDistrict,
      setting_province_id: regionSelected.id,
    });
    if (res.code === 200) {
      getListDistrict();
      setValueInputCreateDistrict("");
      setIsCreatingDistrictName(false);
    } else {
      console.log("err: ", res);
      setIsCreatingDistrictName(false);
    }
  };

  const handleEditDistrictName = () => {
    setIsEditingDistrictName(true);
    setNewDistrictName(districtSelected.name);
  };

  const handleSaveDistrictName = async () => {
    if (newDistrictName === "" || newDistrictName === districtSelected.name) {
      setNewDistrictName(districtSelected.name);
      setIsEditingDistrictName(false);
      return;
    }
    const resEditDistrict: any = await districtApi.update(
      districtSelected.id.toString(),
      {
        name: newDistrictName.trim(),
      }
    );
    if (resEditDistrict?.code === 200) {
      const updatedDistricts = listDistrict.map((District: any) => {
        if (District.id === districtSelected.id) {
          setDistrictSelected({ ...District, name: newDistrictName.trim() });
          return { ...District, name: newDistrictName.trim() };
        }
        return District;
      });
      setListDistrict(updatedDistricts);
    }
    setIsEditingDistrictName(false);
  };

  const handleUpDistrict = async (district: any) => {};

  const handleDownDistrict = async (district: any) => {};

  const handleDeleteDistrict = async (district: any) => {
    try {
      const resDeleteDistrict: any = await districtApi.delete(
        district.id.toString()
      );
      if (resDeleteDistrict?.code === 200) {
        const updatedDistricts = listDistrict.filter(
          (item: any) => item.id !== district.id
        );
        setListDistrict(updatedDistricts);
        setDistrictSelected(updatedDistricts[0]);
        setIsEditingDistrictName(false);
      }
    } catch (error: any) {
      console.log("err delete District: ", error);
    }
  };

  useEffect(() => {
    getListRegion();
    setDistrictSelected(undefined);
    setRegionSelected(undefined);
  }, [valueRegion]);

  useEffect(() => {
    if (regionSelected?.id) {
      getListDistrict();
    }
  }, [regionSelected]);

  const orderRegion = async (
    prev_index_number: number | undefined,
    next_index_number: number | undefined,
    index: number
  ) => {
    try {
      await regionApi.orderRegion(listRegion[index].id, {
        prev_index_number,
        next_index_number,
      });
      getListRegion();
    } catch (error) {
      showError(error);
      getListRegion();
    }
  };

  const onDragRegionEnd = (result: any) => {
    setRegionDragging(false);
    try {
      if (!result.destination) {
        return;
      }
      if (result.source.index < result.destination.index) {
        orderRegion(
          listRegion[result.destination.index]?.index,
          listRegion[result.destination.index + 1]?.index,
          result.source.index
        );
      } else {
        orderRegion(
          listRegion[result.destination.index - 1]?.index,
          listRegion[result.destination.index]?.index,
          result.source.index
        );
      }
      const newItems = [...listRegion];
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      setListRegion(newItems);
    } catch (error) {}
  };

  const orderDistrict = async (
    prev_index_number: number | undefined,
    next_index_number: number | undefined,
    index: number
  ) => {
    try {
      await districtApi.orderDistrict(listDistrict[index].id, {
        prev_index_number,
        next_index_number,
      });
      getListDistrict();
    } catch (error) {
      showError(error);
      getListDistrict();
    }
  };

  const onDragEndDistrict = (result: any) => {
    setDistrictDragging(false);
    try {
      if (!result.destination) {
        return;
      }

      //////////////////////////////////
      //////////////////////////////////

      //////////////////////////////////
      //////////////////////////////////
      if (result.source.index < result.destination.index) {
        orderDistrict(
          listDistrict[result.destination.index]?.index,
          listDistrict[result.destination.index + 1]?.index,
          result.source.index
        );
      } else {
        orderDistrict(
          listDistrict[result.destination.index - 1]?.index,
          listDistrict[result.destination.index]?.index,
          result.source.index
        );
      }
      const newItems = [...listDistrict];
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      setListDistrict(newItems);
    } catch (error) {
      console.log("error", error);
    }
  };

  const _buildDistrict = () => {
    return (
      <div className="w-3/4">
        <div className="px-3">
          <DragDropContext
            onDragStart={() => setDistrictDragging(true)}
            onDragEnd={onDragEndDistrict}
          >
            <Droppable droppableId={`droppableDistrict-${regionSelected.id}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {listDistrict.map((item: any, index: number) => {
                    const checkSelected =
                      districtSelected && districtSelected.id === item.id;
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
                                !isEditingDistrictName &&
                                  checkSelected &&
                                  !isCreatingDistrictName
                                  ? "bg-darkNight100 rounded-lg"
                                  : ""
                              )}
                              onClick={() => {
                                setDistrictSelected(item);
                              }}
                              onDoubleClick={handleEditDistrictName}
                            >
                              {isEditingDistrictName && checkSelected ? (
                                <div className="flex items-center justify-between flex-1 pr-4 border rounded-lg border-dayBreakBlue500">
                                  <BaseInput
                                    value={newDistrictName}
                                    onChange={(value) =>
                                      setNewDistrictName(value)
                                    }
                                    // onBlur={handleSaveDistrictName}
                                    onSave={handleSaveDistrictName}
                                    autoFocus
                                    styleInputContainer="w-full font-medium bg-white border-none text-darkNight900"
                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                  />
                                  {!isCreatingDistrictName && checkSelected && (
                                    <div className="flex gap-1">
                                      {/* <div onClick={() => handleUpDistrict(item)}>
                                            <img
                                                src={Images.arrowUp2}
                                                className="w-6 h-6 cursor-pointer"
                                            />
                                        </div>
                                        <div onClick={() => handleDownDistrict(item)}>
                                            <img
                                                src={Images.arrowDown2}
                                                className="w-6 h-6 cursor-pointer"
                                            />
                                        </div> */}
                                      <div
                                        onClick={() =>
                                          handleDeleteDistrict(item)
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
                                <div className="flex justify-between w-full px-2 ">
                                  <BaseText
                                    locale
                                    size={16}
                                    bold
                                    className={classNames(
                                      !isCreatingDistrictName &&
                                        checkSelected &&
                                        !isCreatingDistrictName
                                        ? "text-primary"
                                        : ""
                                    )}
                                  >
                                    {item.name}
                                  </BaseText>
                                  {!isCreatingDistrictName && checkSelected && (
                                    <img
                                      src={Images.edit2}
                                      alt="Excel upload"
                                      className="w-6 h-6 text-white cursor-pointer"
                                      onClick={handleEditDistrictName}
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

          {isCreatingDistrictName && (
            <div
              className={classNames("flex items-center mb-2 cursor-pointer")}
              onClick={() => {}}
            >
              <BaseInput
                value={valueInputCreateDistrict}
                onChange={(value) => setValueInputCreateDistrict(value)}
                placeholder="Enter district name"
                // onBlur={handleCreateRegion}
                onSave={handleCreateDistrict}
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
            districtDragging ? "mt-[52px]" : "mt-2"
          )}
          onClick={() => {
            setIsCreatingDistrictName(true);
          }}
        >
          <BaseText locale size={16} bold className="text-primary">
            + Create one more
          </BaseText>
        </div>
      </div>
    );
  };

  const _buildRegion = () => {
    return (
      <div className="w-1/4">
        <div className="flex-col pr-2 border-r">
          <DragDropContext
            onDragStart={() => setRegionDragging(true)}
            onDragEnd={onDragRegionEnd}
          >
            <Droppable droppableId="droppableRegion">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {listRegion.map((item: any, index: number) => {
                    const checkSelected =
                      regionSelected && regionSelected.id === item.id;
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
                                !isEditingRegionName &&
                                  checkSelected &&
                                  !isCreatingRegionName
                                  ? "bg-darkNight900 rounded-xl"
                                  : ""
                              )}
                              onClick={() => {
                                setIsEditingRegionName(false);
                                setRegionSelected(item);
                              }}
                              onDoubleClick={handleEditRegionName}
                            >
                              {isEditingRegionName && checkSelected ? (
                                <div className="flex items-center justify-between flex-1 pr-4 border rounded-lg border-dayBreakBlue500">
                                  <BaseInput
                                    value={newRegionName}
                                    onChange={(value) =>
                                      setNewRegionName(value)
                                    }
                                    // onBlur={handleSaveRegionName}
                                    onSave={handleSaveRegionName}
                                    autoFocus
                                    styleInputContainer="w-full font-medium bg-white border-none text-darkNight900"
                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                  />
                                  {!isCreatingRegionName && checkSelected && (
                                    <div className="flex gap-1">
                                      {/* <div onClick={() => handleUpRegion(item)}>
                                                      <img
                                                          src={Images.arrowUp2}
                                                          className="w-6 h-6 cursor-pointer"
                                                      />
                                                  </div>
                                                  <div onClick={() => handleDownRegion(item)}>
                                                      <img
                                                          src={Images.arrowDown2}
                                                          className="w-6 h-6 cursor-pointer"
                                                      />
                                                  </div> */}
                                      <div
                                        onClick={() => handleDeleteRegion(item)}
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
                                      (!isCreatingRegionName &&
                                        checkSelected &&
                                        !isCreatingRegionName) ||
                                        snapshot.isDragging
                                        ? "text-white"
                                        : ""
                                    )}
                                  >
                                    {item.name}
                                  </BaseText>
                                  {!isCreatingRegionName && checkSelected && (
                                    <img
                                      src={Images.edit2White}
                                      alt="Excel upload"
                                      className="w-6 h-6 text-white cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditRegionName();
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

          {isCreatingRegionName && (
            <div
              className={classNames("flex items-center mb-2 cursor-pointer")}
              onClick={() => {}}
            >
              <BaseInput
                value={valueInputCreateRegion}
                onChange={(value) => setValueInputCreateRegion(value)}
                placeholder="Enter province name"
                // onBlur={handleCreateRegion}
                onSave={handleCreateRegion}
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
            setIsCreatingRegionName(true);
          }}
        >
          <BaseText locale size={16} bold className="text-primary">
            + Create one more
          </BaseText>
        </div>
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

        <div className="flex justify-between">
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
        {_buildRegion()}
        {regionSelected && _buildDistrict()}
      </div>
    </div>
  );
};
