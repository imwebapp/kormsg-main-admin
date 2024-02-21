import { useState } from "react";
import { BaseText } from "../../components";
import { BaseInput } from "../../components/input/BaseInput";
import Images from "../../assets/gen";
import { BaseInputSelect } from "../../components/input/BaseInputSelect";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState<string>("Hello");
  const [inputSelectValue, setInputSelectValue] = useState<string>("jack");
  console.log('xxx', inputValue);
  return (
    <>
      
    </>
  );
};

export default Dashboard;
