import { PropsWithChildren } from "react";
import { DatePicker, Space } from "antd";
import { DatePickerProps, GetProps } from "antd";
import { useTranslation } from "react-i18next";
import "./styles.css";
import CustomButton from "../button";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const { RangePicker } = DatePicker;
interface CustomTimePickerProps extends DatePickerProps {
  range?: boolean;
}

export default function CustomTimePicker(
  props: PropsWithChildren<CustomTimePickerProps>
) {
  const { locale, children, range, className, ...newProps } = props;
  const { t } = useTranslation();

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
  };

  const renderExtraFooter = () => {
    return (
      <div className="space-align-container">
        <div className="space-align-block">
          <Space
            direction="horizontal"
            size={14}
            align="center"
            style={{ width: "100%" }}
          >
            <CustomButton
              type="primary"
              locale
              bold
              style={{
                color: "black",
                backgroundColor: "#f6f6f6",
                alignContent: "center",
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="primary"
              locale
              bold
              style={{
                color: "#fff",
                backgroundColor: "blue",
                alignContent: "center",
              }}
              onClick={() => {
                console.log("abc");
              }}
            >
              Apply
            </CustomButton>
          </Space>
        </div>
      </div>
    );
  };
  return (
    <Space direction="horizontal" size={14}>
      {range && (
        <RangePicker
          onChange={onChange}
          onOk={onOk}
          placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
          renderExtraFooter={renderExtraFooter}
        />
      )}
      {!range && (
        <DatePicker {...newProps} onOk={onOk} placeholder={"YYYY.MM.DD"} />
      )}
    </Space>
  );
}
