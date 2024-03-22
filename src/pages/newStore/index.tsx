import { useEffect, useState } from "react";
import { BaseText, CustomButton, HeaderComponent } from "../../components";

import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Images from "../../assets/gen";
import { CheckOutlined } from "@ant-design/icons";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseInputSelect } from "../../components/input/BaseInputSelect";


interface IFormDataPage1 {
  storeCopyFunc: string;
  storeOwnerMembershipSetting: string;
  storeName: string;
  storeNumber: string;
  storeAddress: string;
  storeAddressDetails: string;
  storeImages: [];
  storeOpeningHours: string;
  category: string;
  region: string;
  subway: string;
  chatMessageFunc: string;
  stampSetting: string;
  reservationFuncSetting: string;
}

const listOpenHours = [
  {
    id: 1,
    name: "Monday",
  },
  {
    id: 2,
    name: "Tuesday",
  },
  {
    id: 3,
    name: "Wednesday",
  },
  {
    id: 4,
    name: "Thursday",
  },
  {
    id: 5,
    name: "Friday",
  },
  {
    id: 6,
    name: "Saturday",
  },
  {
    id: 7,
    name: "Sunday",
  }

];

const { Header } = Layout;

const NewStore = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formDataPage1, setFormDataPage1] = useState<IFormDataPage1>({
    storeCopyFunc: '',
    storeOwnerMembershipSetting: '',
    storeName: '',
    storeNumber: '',
    storeAddress: '',
    storeAddressDetails: '',
    storeImages: [],
    storeOpeningHours: '',
    category: '',
    region: '',
    subway: '',
    chatMessageFunc: '',
    stampSetting: '',
    reservationFuncSetting: '',
  });


  const handleInputChange = (name: string, value: any) => {
    setFormDataPage1({ ...formDataPage1, [name]: value });
  };
  useEffect(() => {
  }, []);

  return (
    <Layout className="h-screen bg-white">
      <Layout className="bg-white ">
        <Header
          className="bg-white border-b h-[71px] px-6"
        >
          <div className="flex flex-row items-center justify-between h-full">
            <div className="flex flex-row items-center gap-3">
              <img src={Images.arrowLeft} className="w-6 h-6" onClick={() => { navigate(-1) }} />
              <BaseText
                locale
                size={20}
                bold
                className="line-clamp-1"
              >
                New Shop
              </BaseText>
            </div>
            <div className="flex flex-row items-center">
              <CustomButton
                locale
                onClick={() => console.log("Public")}
                primary
                icon={<CheckOutlined />}
                disabled
              >
                Public
              </CustomButton>
            </div>
          </div>
        </Header>
        <div className="flex w-full overflow-hidden"
          style={{ height: "calc(100vh - 71px)" }}
        >
          <div className="flex flex-col w-1/3 gap-4 p-6 overflow-auto ">
            <BaseInput
              value={formDataPage1.storeCopyFunc}
              onChange={(value) => handleInputChange('storeCopyFunc', value)}
              placeholder="Store Copy Function"
              title="Store Copy Function"
            />
            <BaseInput
              value={formDataPage1.storeOwnerMembershipSetting}
              onChange={(value) => handleInputChange('storeOwnerMembershipSetting', value)}
              placeholder="Store Copy Function"
              title="Store Copy Function"
            />
            <BaseInput
              value={formDataPage1.storeName}
              onChange={(value) => handleInputChange('storeName', value)}
              placeholder="Store Copy Function"
              title="Store Copy Function"
            />
            <BaseInput
              title="Store Copy Function"
              placeholder="Store Copy Function"
              value={formDataPage1.storeNumber}
              onChange={(value) => handleInputChange('storeNumber', value)}
            />
            <div>
              <BaseInput
                title="Store address (location-based application)"
                placeholder="Enter address"
                value={formDataPage1.storeAddress}
                onChange={(value) => handleInputChange('storeAddress', value)}
              />
              <BaseInput
                placeholder="Enter detailed address"
                value={formDataPage1.storeAddressDetails}
                onChange={(value) => handleInputChange('storeAddressDetails', value)}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <BaseText locale size={16} bold>
                Please upload a photo of your store
              </BaseText>
              <BaseText locale size={16} bold>
                Please register at least 1 photo
              </BaseText>
            </div>
            <div>
              image area
            </div>
            <div onClick={() => { console.log('click storeOpeningHours') }}>
              <BaseText locale size={16} bold>
                Please register at least 1 photo
              </BaseText>
            </div>

          </div>
          <div className="flex w-1/3 overflow-auto border-x ">2</div>
          <div className="flex w-1/3 overflow-auto ">3</div>
        </div>
      </Layout>
    </Layout>
  );
};

export default NewStore;
