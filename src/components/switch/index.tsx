import React, { useEffect, useState } from "react";

interface SwitchComponentProps {
  value?: boolean;
  onChange?: (checked: boolean) => void;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
  value = false,
  onChange,
}) => {
  const [isOn, setIsOn] = useState(value);

  useEffect(() => {
    setIsOn(value);
  }, [value]);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn);
    }
  };

  return (
    <div
      className={`flex items-center cursor-pointer p-1 rounded-full min-w-[52px] h-6 ${
        isOn ? "bg-[#0866FF]" : "bg-[#5C5C5C]"
      }`}
      onClick={toggleSwitch}
    >
      <p className={`text-white text-xs ${isOn ? "ml-1" : "hidden"} font-bold`}>
        ON
      </p>
      <div
        className={`min-w-4 min-h-4 bg-[#E8E8E8] rounded-full shadow-md transform transition-transform duration-200 ${
          isOn ? "translate-x-2" : "translate-x-0"
        }`}
      ></div>
      <p className={`text-white text-xs ${isOn ? "hidden" : "ml-1"} font-bold`}>
        OFF
      </p>
    </div>
  );
};

export default SwitchComponent;
