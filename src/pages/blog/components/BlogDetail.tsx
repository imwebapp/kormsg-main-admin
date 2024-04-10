import { useState } from "react";
import Images from "../../../assets/gen";
import { BaseText } from "../../../components";
import BaseButton from "../../../components/baseButton";
import { BaseInput } from "../../../components/input/BaseInput";
import { DatePicker } from "antd";
import { useLocalStorage } from "../../../stores/localStorage";
import { formatDate, formatHour } from "../../../utils/common";
import moment from "moment";
import JoditEditor from "jodit-react";

export default function BlogDetail() {
  return (
    <div className="w-full h-full flex flex-row">
      <CreateDetail />
      <Preview />
    </div>
  );
}

const CreateDetail = () => {
  const [isToday, setIsToday] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { locale } = useLocalStorage((state) => state);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
  };

  const handleChange = (newContent: string) => {
    // setContent(newContent);
  };
  return (
    <div className="w-2/3 border-r p-6">
      <div className="w-full max-w-[600px]">
        <BaseText bold size={24} locale>
          Writing articles
        </BaseText>
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        <BaseButton className="mt-6 w-full !bg-darkNight50 justify-between">
          <BaseText locale className="text-primary" medium>
            Theme/Category
          </BaseText>
          <img src={Images.chevronRightTiny} className="w-6 h-6" />
        </BaseButton>
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        <BaseInput
          title="Title"
          className="mt-6"
          placeholder="Please enter a title"
        />
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        <div className="h-6"></div>
        <BaseText locale bold>
          Content
        </BaseText>
        <div className="h-[18px]"></div>
        <JoditEditor value={content} config={config} onChange={handleChange} />
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        <BaseInput
          title="Hashtag"
          className="mt-6"
          placeholder="#Hashtags (maximum 30)"
        />
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        <div className="h-6"></div>
        <BaseText locale bold>
          Publication time
        </BaseText>
        <div className="h-[18px]"></div>

        <div className="flex flex-row gap-x-8">
          <div
            onClick={() => setIsToday(true)}
            className="cursor-pointer flex flex-row gap-x-2"
          >
            <img
              src={isToday ? Images.radioActive : Images.radioInactive}
              className="w-6 h-6"
            />
            <BaseText locale bold>
              Today
            </BaseText>
          </div>
          <div
            onClick={() => setIsToday(false)}
            className="cursor-pointer flex flex-row gap-x-2"
          >
            <img
              src={!isToday ? Images.radioActive : Images.radioInactive}
              className="w-6 h-6"
            />
            <BaseText locale bold>
              Reservation
            </BaseText>
          </div>
        </div>
        <div className="h-[18px]"></div>
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {!isToday && (
          <div className="flex flex-row gap-x-6">
            <label
              htmlFor="select-date"
              className=" cursor-pointer flex-1  flex flex-row border rounded-xl px-6 py-4 gap-x-3 relative"
            >
              <img src={Images.calendar} className="w-6 h-6" />
              <div className="gap-y-2 flex flex-col">
                <BaseText locale medium>
                  Date
                </BaseText>
                <BaseText bold size={16}>
                  {formatDate(selectedDate, locale)}
                </BaseText>
              </div>
              <DatePicker
                onChange={(date: any, dateString: any) => {
                  const newDate = moment(date.$d);
                  newDate.hour(moment(selectedDate).hour());
                  newDate.minute(moment(selectedDate).minute());
                  newDate.second(moment(selectedDate).second());
                  setSelectedDate(newDate.toDate());
                }}
                id="select-date"
                className="absolute opacity-0 top-0 left-0"
              />
            </label>
            <label
              htmlFor="select-time"
              className=" cursor-pointer flex-1  flex flex-row border rounded-xl px-6 py-4 gap-x-3 relative"
            >
              <img src={Images.clock} className="w-6 h-6" />
              <div className="gap-y-2 flex flex-col">
                <BaseText locale medium>
                  Time
                </BaseText>
                <BaseText bold size={16}>
                  {formatHour(selectedDate, locale)}
                </BaseText>
              </div>
              <DatePicker
                id="select-time"
                picker="time"
                onChange={(date: any, dateString: any) => {
                  const newDate = moment(date.$d);
                  newDate.year(moment(selectedDate).year());
                  newDate.month(moment(selectedDate).month());
                  newDate.date(moment(selectedDate).date());
                  setSelectedDate(newDate.toDate());
                }}
                className="absolute opacity-0 top-0 left-0"
              />
            </label>
          </div>
        )}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        <BaseButton
          onClick={() => {
            console.log("selectedDate", selectedDate.toISOString());
          }}
          className="w-full mt-6"
        >
          Blog post
        </BaseButton>
      </div>
    </div>
  );
};
const Preview = () => {
  return <div className="w-1/3"></div>;
};
