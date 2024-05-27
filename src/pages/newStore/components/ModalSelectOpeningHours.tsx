import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Tag
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Images from "../../../assets/gen";
import { BaseText } from "../../../components";
import { BaseModal } from "../../../components/modal/BaseModal";
import { classNames } from "../../../utils/common";
import { HOLIDAYS, HOLIDAY_SETTING, Weekdays } from "../../../utils/constants";
import TimePickerAbout from "./TimePickerAbout";

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (data: any) => void;
  data?: {
    leave_day?: boolean;
    working_day?: string[];
    holiday_setting?: string;
    holiday_day?: number[];
    opening_hours: string;
    opening_hours_weekend?: string;
    break_time?: string[];
    break_time_weekend?: string[];
  };
}
export const ModalSelectOpeningHours = (props: IProps) => {
  const { isOpen, onClose, onSubmit, data } = props;
  const [t] = useTranslation();
  const [dataOpening, setDataOpening] = useState("00:00");
  const [dataClosing, setDataClosing] = useState("00:00");
  const [dataOpeningWeekend, setDataOpeningWeekend] = useState("00:00");
  const [dataClosingWeekend, setDataClosingWeekend] = useState("00:00");

  const [leaveDay, setLeaveDay] = useState(true);
  const [typePickTime, setTypePickTime] = useState(false);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);
  const [optionChecked, setOptionChecked] = useState<number | null>(null);

  const [listDaySelected, setListDaySelected] = useState<any[]>([]);
  const [listHolidaySelected, setListHolidaySelected] = useState<number[]>([]);
  const [listBreakTime, setListBreakTime] = useState<string[]>([]);
  const [listBreakTimeWeekend, setListBreakTimeWeekend] = useState<string[]>([]);

  const handleSelectedDay = (id: string) => {
    if (listDaySelected.includes(id)) {
      setListDaySelected(listDaySelected.filter((day) => day !== id));
    } else {
      setListDaySelected([...listDaySelected, id]);
    }
  };

  const handleSelectedHoliday = (id: number) => {
    if (listHolidaySelected.includes(id)) {
      setListHolidaySelected(listHolidaySelected.filter((day) => day !== id));
    } else {
      setListHolidaySelected([...listHolidaySelected, id]);
    }
  };

  const handleOptionChange = (option: number) => {
    if (option === optionChecked) {
      setOptionChecked(null); // Uncheck the option if it's already checked
      setListHolidaySelected([]);
    } else {
      setOptionChecked(option);
    }
  };

  const handleAddTime = () => {
    setListBreakTime([...listBreakTime, '00:00~00:00']);
  };
  const setStartBreakTime = (index: number, startTime: string) => {
    const newList = [...listBreakTime];
    const [_, endTime] = newList[index].split('~');
    newList[index] = `${startTime}~${endTime || ''}`;
    setListBreakTime(newList);
  };

  const setEndBreakTime = (index: number, endTime: string) => {
    const newList = [...listBreakTime];
    const [startTime] = newList[index].split('~');
    newList[index] = `${startTime || ''}~${endTime}`;
    setListBreakTime(newList);
  };

  const handleRemoveBreakTime = (index: number) => {
    const newList = listBreakTime.filter((_, i) => i !== index);
    setListBreakTime(newList);
  };

  const handleAddTimeWeekend = () => {
    setListBreakTimeWeekend([...listBreakTimeWeekend, '00:00~00:00']);
  };

  const setStartBreakTimeWeekend = (index: number, startTime: string) => {
    const newList = [...listBreakTimeWeekend];
    const [_, endTime] = newList[index].split('~');
    newList[index] = `${startTime}~${endTime || ''}`;
    setListBreakTimeWeekend(newList);
  };

  const setEndBreakTimeWeekend = (index: number, endTime: string) => {
    const newList = [...listBreakTimeWeekend];
    const [startTime] = newList[index].split('~');
    newList[index] = `${startTime || ''}~${endTime}`;
    setListBreakTimeWeekend(newList);
  };

  const handleRemoveBreakTimeWeekend = (index: number) => {
    const newList = listBreakTimeWeekend.filter((_, i) => i !== index);
    setListBreakTimeWeekend(newList);
  };

  const handleCloseModalOpeningHours = () => {
    setLeaveDay(true);
    setTypePickTime(false);
    onClose && onClose();
  };
  const handleSubmitModalOpeningHours = () => {
    const dataOpeningConvert = dataOpening + "~" + dataClosing;
    const dataOpeningWeekendConvert = dataOpeningWeekend + "~" + dataClosingWeekend;
    const dataConvert = {
      leave_day: leaveDay,
      working_day: listDaySelected,
      holiday_setting: optionChecked === 1 ? HOLIDAY_SETTING.ONLY_LUNAR_NEW_YEAR_AND_CHUSEOK : optionChecked === 2 ? HOLIDAY_SETTING.ALL : HOLIDAY_SETTING.OTHER,
      holiday_day: listHolidaySelected,
      opening_hours: dataOpeningConvert,
      opening_hours_weekend: typePickTime ? dataOpeningWeekendConvert : '',
      break_time: listBreakTime,
      break_time_weekend: listBreakTimeWeekend,
    };
    onSubmit && onSubmit(dataConvert);
  };

  //dataEdit
  useEffect(() => {
    if (data?.opening_hours) {
      setLeaveDay(typeof data?.leave_day === 'boolean' ? data?.leave_day : true);
      setListDaySelected(data?.working_day || []);
      setOptionChecked(data?.holiday_setting === HOLIDAY_SETTING.ONLY_LUNAR_NEW_YEAR_AND_CHUSEOK ? 1 : data?.holiday_setting === HOLIDAY_SETTING.ALL ? 2 : null);
      setListHolidaySelected(data?.holiday_day || []);

      if (data?.opening_hours) {
        const dataOpeningConvert = data?.opening_hours.split("~");
        setDataOpening(dataOpeningConvert[0]);
        setDataClosing(dataOpeningConvert[1]);
      }
      if (data?.opening_hours_weekend) {
        const dataOpeningWeekendConvert = data?.opening_hours_weekend.split("~");
        setTypePickTime(true);
        setDataOpeningWeekend(dataOpeningWeekendConvert[0]);
        setDataClosingWeekend(dataOpeningWeekendConvert[1]);
      }

      setListBreakTime(data?.break_time || []);
      setListBreakTimeWeekend(data?.break_time_weekend || []);
    }
  }, [data]);

  // useEffect(() => {
  //   setListBreakTime([]);
  //   setListBreakTimeWeekend([]);
  // }, [typePickTime]);

  useEffect(() => {
    if (optionChecked === 1) {
      setListHolidaySelected([22, 82]);
    } else if (optionChecked === 2) {
      let ids: number[] = [];
      HOLIDAYS.forEach((holiday) => {
        ids.push(holiday.id);
        if (holiday.child) {
          holiday.child.forEach((child) => {
            ids.push(child.id);
          });
        }
      });
      setListHolidaySelected(ids);
    } else {
      setListHolidaySelected([]);
    }
  }, [optionChecked]);

  useEffect(() => {
    if (isAlwaysOpen) {
      setDataOpening("00:00");
      setDataClosing("00:00");
    }
  }, [isAlwaysOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCloseModalOpeningHours}
      onSubmit={handleSubmitModalOpeningHours}
      title="영업시간"
      disableSubmitBtn={!dataOpening || !dataClosing}
    >
      <div className="flex items-center gap-6 mb-4">
        <div
          onClick={() => {
            if (!leaveDay) {
              setLeaveDay(!leaveDay);
              setListDaySelected([]);
              setOptionChecked(null);
              setListHolidaySelected([]);
            }
          }}
          className={classNames(
            "flex items-center justify-center flex-1 py-2 border rounded-lg",
            leaveDay ? "bg-dayBreakBlue50 border-primary" : ""
          )}
        >
          <BaseText
            locale
            bold
            className={classNames(leaveDay ? "text-primary" : "")}
          >
            휴무일이 있어요
          </BaseText>
        </div>
        <div
          onClick={() => {
            if (leaveDay) {
              setLeaveDay(!leaveDay);
              setOptionChecked(null);
              setListHolidaySelected([]);
              const allDay = Weekdays.map((item) => item.id);
              setListDaySelected(allDay);
            }
          }}
          className={classNames(
            "flex items-center justify-center flex-1 py-2 border rounded-lg",
            !leaveDay ? "bg-dayBreakBlue50 border-primary" : ""
          )}
        >
          <BaseText
            locale
            bold
            className={classNames(!leaveDay ? "text-primary" : "")}
          >
            휴무일이 없어요
          </BaseText>
        </div>
      </div>

      <div>
        {leaveDay && (
          <>
            <div className="flex flex-col gap-1 mb-4">
              <BaseText bold locale>
                정기 휴무일이 있나요?
              </BaseText>
              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-lg bg-darkNight50">
                  <BaseText medium locale>
                    매주
                  </BaseText>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Weekdays.map((item, index) => {
                    return (
                      <div
                        key={item?.id}
                        onClick={() => handleSelectedDay(item.id)}
                        className={classNames(
                          "px-4 py-2 rounded-full cursor-pointer bg-darkNight50 border",
                          listDaySelected.includes(item.id)
                            ? "border-primary bg-dayBreakBlue50"
                            : ""
                        )}
                      >
                        <BaseText
                          medium
                          locale
                          color={
                            listDaySelected.includes(item.id)
                              ? "text-primary"
                              : ""
                          }
                        >
                          {item.name}
                        </BaseText>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <BaseText bold locale>
                공휴일 중 휴무일이 있나요?
              </BaseText>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <Checkbox
                    checked={optionChecked === 1}
                    onChange={() => handleOptionChange(1)}
                  >
                    <BaseText medium locale>
                      설,추석 당일만 휴무
                    </BaseText>
                  </Checkbox>
                  <Checkbox
                    checked={optionChecked === 2}
                    onChange={() => handleOptionChange(2)}
                  >
                    <BaseText medium locale>
                      전체 휴무
                    </BaseText>
                  </Checkbox>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {HOLIDAYS.map((holiday, index) => {
                  if (holiday.child) {
                    return (
                      <div
                        key={index}
                        className="flex border rounded-md cursor-pointer bg-darkNight50"
                      >
                        {holiday.child.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              if (optionChecked === null) {
                                handleSelectedHoliday(item.id);
                              }
                            }}
                            className={classNames(
                              "p-2 text-center ",
                              index == 1 ? "border-x" : "",
                              listHolidaySelected.includes(item.id)
                                ? "bg-dayBreakBlue50"
                                : ""
                            )}
                          >
                            <BaseText
                              locale
                              color={
                                listHolidaySelected.includes(item.id)
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              {item.name}
                            </BaseText>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <Tag
                        key={index}
                        onClick={() => {
                          if (optionChecked === null) {
                            handleSelectedHoliday(holiday.id);
                          }
                        }}
                        className={classNames(
                          "p-2 text-center cursor-pointer bg-darkNight50",
                          listHolidaySelected.includes(holiday.id)
                            ? "bg-dayBreakBlue50"
                            : ""
                        )}
                      >
                        <BaseText
                          locale
                          color={
                            listHolidaySelected.includes(holiday.id)
                              ? "text-primary"
                              : ""
                          }
                        >
                          {holiday.name}
                        </BaseText>
                      </Tag>
                    );
                  }
                })}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col gap-1 mb-4">
          <BaseText bold locale>
            영업 시간을 알려주세요.
          </BaseText>
          <div className="flex gap-4 mb-4">
            <div
              onClick={() => {
                if (typePickTime) setTypePickTime(!typePickTime);
              }}
              className={classNames(
                "flex items-center justify-center flex-1 py-2 border rounded-lg",
                !typePickTime ? "bg-dayBreakBlue50 border-primary" : ""
              )}
            >
              <BaseText
                locale
                bold
                className={classNames(!typePickTime ? "text-primary" : "")}
              >
                모든 영업일이 같아요
              </BaseText>
            </div>
            <div
              onClick={() => {
                if (!typePickTime) setTypePickTime(!typePickTime);
              }}
              className={classNames(
                "flex items-center justify-center flex-1 py-2 border rounded-lg",
                typePickTime ? "bg-dayBreakBlue50 border-primary" : ""
              )}
            >
              <BaseText
                locale
                bold
                className={classNames(typePickTime ? "text-primary" : "")}
              >
                평일/주말 달라요
              </BaseText>
            </div>
          </div>
          {!typePickTime ? (
            <>
              <div className="flex gap-2 mb-2">
                <div className="flex items-center flex-1 gap-2">
                  <BaseText bold locale>
                    영업시간
                  </BaseText>
                  <div className="flex-1">
                    <TimePickerAbout
                      startTime={dataOpening}
                      setStartTime={(e) => {
                        if (!isAlwaysOpen) setDataOpening(e);
                      }}
                      endTime={dataClosing}
                      setEndTime={(e) => {
                        if (!isAlwaysOpen) setDataClosing(e);
                      }}
                    />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setIsAlwaysOpen(!isAlwaysOpen);
                  }}
                  className={classNames(
                    "flex items-center justify-center p-2 flex-1 border rounded-lg cursor-pointer",
                    isAlwaysOpen ? "bg-dayBreakBlue50 border-primary" : ""
                  )}
                >
                  <BaseText
                    locale
                    bold
                    className={classNames(
                      isAlwaysOpen ? "text-primary" : ""
                    )}
                  >
                    24시간 운영해요.
                  </BaseText>
                  <CheckOutlined
                    className={classNames(
                      "w-6 h-6",
                      isAlwaysOpen ? "text-primary" : ""
                    )}
                  />
                </div>
              </div>

              <div className="flex items-end gap-3">
                {listBreakTime.length > 0 ? (
                  <>
                    <div className="flex flex-col items-center gap-4">
                      {listBreakTime.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex flex-1 gap-2"
                        >
                          <div className="flex items-center flex-1 gap-2">
                            {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                            <BaseText bold locale>
                              휴게시간
                            </BaseText>
                            <div className="flex-1">
                              <TimePickerAbout
                                startTime={item.split('~')[0] || '00:00'}
                                setStartTime={(e) => setStartBreakTime(index, e)}
                                endTime={item.split('~')[1] || '00:00'}
                                setEndTime={(e) => setEndBreakTime(index, e)}
                              />
                            </div>
                            <div
                              onClick={() => handleRemoveBreakTime(index)}
                              className="absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer"
                              style={{
                                top: "-10px",
                                right: "-10px",
                              }}
                            >
                              <img
                                src={Images.trashred}
                                alt="close"
                                className="w-4 h-4"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      onClick={handleAddTime}
                      className="flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary"
                    >
                      <PlusOutlined className="w-6 h-6 text-primary" />
                      <BaseText locale bold className="text-primary">
                        시간 추가
                      </BaseText>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <BaseText bold locale>
                      공휴일 중 휴무일이 있나요?
                    </BaseText>
                    <div
                      onClick={handleAddTime}
                      className="flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary"
                    >
                      <BaseText locale bold className="text-primary">
                        설정하기
                      </BaseText>
                      <CheckOutlined className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="pb-4 border-b">
                <div className="flex gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <BaseText bold locale>
                      평일(월~금)
                    </BaseText>
                    <div className="flex-1">
                      <TimePickerAbout
                        startTime={dataOpening}
                        setStartTime={(e) => {
                          setDataOpening(e);
                        }}
                        endTime={dataClosing}
                        setEndTime={(e) => {
                          setDataClosing(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  {listBreakTime.length > 0 ? (
                    <>
                      <div className="flex flex-col items-center gap-4">
                        {listBreakTime.map((item, index) => (
                          <div
                            key={index}
                            className="relative flex flex-1 gap-2"
                          >
                            <div className="flex items-center flex-1 gap-2">
                              {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                              <BaseText bold locale>
                                휴게시간
                              </BaseText>
                              <div className="flex-1">
                                <TimePickerAbout
                                  startTime={item.split('~')[0] || '00:00'}
                                  setStartTime={(e) => setStartBreakTime(index, e)}
                                  endTime={item.split('~')[1] || '00:00'}
                                  setEndTime={(e) => setEndBreakTime(index, e)}
                                />
                              </div>
                              <div
                                onClick={() => handleRemoveBreakTime(index)}
                                className="absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer"
                                style={{
                                  top: "-10px",
                                  right: "-10px",
                                }}
                              >
                                <img
                                  src={Images.trashred}
                                  alt="close"
                                  className="w-4 h-4"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        onClick={handleAddTime}
                        className="flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary"
                      >
                        <PlusOutlined className="w-6 h-6 text-primary" />
                        <BaseText locale bold className="text-primary">
                          시간 추가
                        </BaseText>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BaseText bold locale>
                        공휴일 중 휴무일이 있나요?
                      </BaseText>
                      <div
                        onClick={handleAddTime}
                        className="flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary"
                      >
                        <BaseText locale bold className="text-primary">
                          설정하기
                        </BaseText>
                        <CheckOutlined className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <div className="flex gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <BaseText bold locale>
                      주말
                    </BaseText>
                    <div className="flex-1">
                      <TimePickerAbout
                        startTime={dataOpeningWeekend}
                        setStartTime={(e) => {
                          setDataOpeningWeekend(e);
                        }}
                        endTime={dataClosingWeekend}
                        setEndTime={(e) => {
                          setDataClosingWeekend(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  {listBreakTimeWeekend.length > 0 ? (
                    <>
                      <div className="flex flex-col items-center gap-4">
                        {listBreakTimeWeekend.map((item, index) => (
                          <div
                            key={index}
                            className="relative flex flex-1 gap-2"
                          >
                            <div className="flex items-center flex-1 gap-2">
                              {/* {index === 0 && <BaseText bold locale>휴게시간</BaseText>} */}
                              <BaseText bold locale>
                                휴게시간
                              </BaseText>
                              <div className="flex-1">
                                <TimePickerAbout
                                  startTime={item.split('~')[0] || '00:00'}
                                  setStartTime={(e) => setStartBreakTimeWeekend(index, e)}
                                  endTime={item.split('~')[1] || '00:00'}
                                  setEndTime={(e) => setEndBreakTimeWeekend(index, e)}
                                />
                              </div>
                              <div
                                onClick={() => handleRemoveBreakTimeWeekend(index)}
                                className="absolute top-0 right-0 p-1 bg-white border rounded-full cursor-pointer"
                                style={{
                                  top: "-10px",
                                  right: "-10px",
                                }}
                              >
                                <img
                                  src={Images.trashred}
                                  alt="close"
                                  className="w-4 h-4"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        onClick={handleAddTimeWeekend}
                        className="flex items-center justify-center p-2 border rounded-lg cursor-pointer border-primary"
                      >
                        <PlusOutlined className="w-6 h-6 text-primary" />
                        <BaseText locale bold className="text-primary">
                          시간 추가
                        </BaseText>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BaseText bold locale>
                        공휴일 중 휴무일이 있나요?
                      </BaseText>
                      <div
                        onClick={handleAddTimeWeekend}
                        className="flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer border-primary"
                      >
                        <BaseText locale bold className="text-primary">
                          설정하기
                        </BaseText>
                        <CheckOutlined className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
