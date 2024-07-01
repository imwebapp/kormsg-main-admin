import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Images from "../../../assets/gen";
import { BaseText } from "../../../components";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseModal } from "../../../components/modal/BaseModal";
import { classNames, convertParams } from "../../../utils/common";
import { REGION_TYPE, STATION } from "../../../utils/constants";
import { stationApi } from "../../../apis/stationApi";
import { stationLineApi } from "../../../apis/stationLineApi";
import { subwayApi } from "../../../apis/stationSubwayApi";

interface IProps {
  isAddressKor: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (data: {
    subwayStation: any;
    subwayLine: any;
    subwayLocation: any;
  }) => void;
}
export const ModalSelectSubway = (props: IProps) => {
  const {
    isAddressKor,
    isOpen,
    onClose,
    onSubmit,
  } = props;
  const [t] = useTranslation();

  const [valueSearchStation, setValueSearchStation] = useState<string>("");
  const [listDataSearch, setListDataSearch] = useState<string[]>([]);

  const [listStation, setListStation] = useState<any>([]);
  const [listStationLine, setListStationLine] = useState<any>([]);
  const [listSubway, setListSubway] = useState<any>([]);
  const [stationSelected, setStationSelected] = useState<any>();
  const [stationLineSelected, setStationLineSelected] = useState<any>();
  const [subwaySelected, setSubwaySelected] = useState<any>();

  const getListStation = async () => {
    try {
      const resListStation: any = await stationApi.getList(
        convertParams({
          limit: 50,
          fields: ["$all"],
          filter: {
            region: isAddressKor ? REGION_TYPE.KOREA : REGION_TYPE.GLOBAL,
          },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListStation?.code === 200) {
        const data = resListStation?.results?.objects?.rows || [];
        setListStation(data);
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
          filter: { setting_station_id: stationSelected?.id },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListStationLine?.code === 200) {
        const data = resListStationLine?.results?.objects?.rows || [];
        setListStationLine(data);
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
          filter: { setting_station_line_id: stationLineSelected?.id },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListSubway?.code === 200) {
        setListSubway(resListSubway?.results?.objects?.rows || []);
      }
    } catch (error: any) {
      console.log("err getList Group: ", error);
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
  }, [isAddressKor]);

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

  const handleCloseModalSubway = () => {
    setValueSearchStation("");
    onClose && onClose();
  };

  const handleSubmitModalSubway = () => {
    setValueSearchStation("");
    const dataConvert = {
      subwayStation: stationSelected.name,
      subwayLine: stationLineSelected.name,
      subwayLocation: subwaySelected.name,
    };
    onSubmit && onSubmit(dataConvert);
  };

  useEffect(() => {
    if (valueSearchStation.trim() !== "") {
      const subways = listSubway?.filter((item: any) =>
        item.name.includes(valueSearchStation.trim())
      );
      setListDataSearch(subways);
    }
  }, [valueSearchStation]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCloseModalSubway}
      onSubmit={handleSubmitModalSubway}
      title="뒤로"
      disableSubmitBtn={!stationSelected}
      isHideAction={!stationLineSelected}
    >
      <div className="flex flex-col gap-4">
        {stationSelected ? (
          <>
            {stationLineSelected ? (
              <>
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={Images.arrowLeft}
                      className="w-6 h-6"
                      onClick={() => {
                        setStationLineSelected(undefined);
                        setSubwaySelected(undefined);
                      }}
                    />
                    <BaseText size={24} medium>
                      {stationLineSelected?.name}
                    </BaseText>
                  </div>
                  <BaseInput
                    placeholder="Search"
                    className="w-2/4"
                    value={valueSearchStation}
                    onChange={(value) => {
                      setValueSearchStation(value);
                    }}
                    iconLeft={
                      <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
                    }
                  />
                </div>

                <div className="grid grid-cols-4 gap-3 grid-flow-rows h-[400px]">
                  {valueSearchStation.trim() !== ""
                    ? listDataSearch?.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className={classNames(
                              "flex h-fit items-center justify-center px-8 py-3 rounded-lg",
                              subwaySelected?.id === item.id
                                ? "bg-black"
                                : "bg-darkNight50"
                            )}
                            onClick={() => {
                              setSubwaySelected(item);
                            }}
                          >
                            <BaseText
                              locale
                              size={16}
                              bold
                              className={classNames(
                                subwaySelected?.id === item.id
                                  ? "text-white"
                                  : ""
                              )}
                            >
                              {item.name}
                            </BaseText>
                          </div>
                        );
                      })
                    : listSubway.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className={classNames(
                              "flex h-fit items-center justify-center px-8 py-3 rounded-lg",
                              subwaySelected?.id === item?.id
                                ? "bg-black"
                                : "bg-darkNight50"
                            )}
                            onClick={() => {
                              setSubwaySelected(item);
                            }}
                          >
                            <BaseText
                              locale
                              size={16}
                              bold
                              className={classNames(
                                subwaySelected?.id === item.id
                                  ? "text-white"
                                  : ""
                              )}
                            >
                              {item.name}
                            </BaseText>
                          </div>
                        );
                      })}
                </div>
              </>
            ) : (
              <>
                <BaseText size={24} medium>
                  지하철
                </BaseText>
                <div className="flex items-center gap-2">
                  <img
                    src={Images.arrowLeft}
                    className="w-6 h-6"
                    onClick={() => {
                      setStationLineSelected(undefined);
                      setStationSelected(undefined);
                    }}
                  />
                  <BaseText size={24} medium>
                    {stationSelected?.name}
                  </BaseText>
                </div>
                <div className="grid grid-cols-3 gap-3 grid-flow-rows">
                  {listStationLine.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{ borderLeftColor: item.color }}
                        onClick={() => {
                          setStationLineSelected(item);
                        }}
                        className={classNames(
                          "flex px-4 py-[20px] border-l-8",
                          stationLineSelected?.id === item?.id ? "bg-black" : ""
                        )}
                      >
                        <BaseText
                          locale
                          size={16}
                          bold
                          className={classNames(
                            stationLineSelected?.id === item?.id
                              ? "text-white"
                              : ""
                          )}
                        >
                          {item?.name}
                        </BaseText>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 grid-flow-rows">
              {listStation.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={classNames(
                      "flex h-fit items-center justify-center px-8 py-3 rounded-lg",
                      stationLineSelected?.id === item?.id
                        ? "bg-black"
                        : "bg-darkNight50"
                    )}
                    onClick={() => {
                      setStationSelected(item);
                    }}
                  >
                    <BaseText
                      locale
                      size={16}
                      bold
                      className={classNames(
                        stationLineSelected?.id === item.id ? "text-white" : ""
                      )}
                    >
                      {item.name}
                    </BaseText>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
};
