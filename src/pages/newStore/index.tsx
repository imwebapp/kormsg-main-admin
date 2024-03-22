import { useEffect, useState } from "react";
import { BaseText, CustomButton, HeaderComponent } from "../../components";

import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Images from "../../assets/gen";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseInputSelect } from "../../components/input/BaseInputSelect";
import { ListCategoryPart1 } from "./components/ListCategoryPart1";
import { ChatMessageFuncPart1 } from "./components/ChatMessageFuncPart1";


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
              title="매장 복사 기능"
              placeholder="복사할 매장을 검색해주세요"
              value={formDataPage1.storeCopyFunc}
              onChange={(value) => handleInputChange('storeCopyFunc', value)}
            />
            <BaseInput
              title="매장 주인 회원 설정"
              placeholder="회원을 닉네임 혹은 아이디로 검색해주세요"
              value={formDataPage1.storeOwnerMembershipSetting}
              onChange={(value) => handleInputChange('storeOwnerMembershipSetting', value)}
            />
            <BaseInput
              title="매장 이름"
              placeholder="지역명도 같이 넣어주세요"
              value={formDataPage1.storeName}
              onChange={(value) => handleInputChange('storeName', value)}
            />
            <BaseInput
              title="매장 번호"
              placeholder="고객님이 전화할 수 있는 번호를 입력"
              value={formDataPage1.storeNumber}
              onChange={(value) => handleInputChange('storeNumber', value)}
            />
            <div>
              <BaseInput
                title="매장 주소(위치기반 적용)"
                placeholder="주소입력"
                value={formDataPage1.storeAddress}
                onChange={(value) => handleInputChange('storeAddress', value)}
              />
              <BaseInput
                placeholder="상세주소 입력"
                value={formDataPage1.storeAddressDetails}
                onChange={(value) => handleInputChange('storeAddressDetails', value)}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <BaseText locale size={16} bold>
                매장 사진을 업로드 해주세요
              </BaseText>
              <BaseText locale size={16} bold>
                사진은 최소 1장이상 등록해주세요
              </BaseText>
            </div>
            <div>
              image area
            </div>
            <ListCategoryPart1 title="영업시간" value="" placeholder="영업시간을 설정해주세요" onClick={() => { console.log('click openning') }} />
            <ListCategoryPart1 title="카테고리" value="" placeholder="카테고리를 선택해주세요" onClick={() => { console.log('click category') }} />
            <ListCategoryPart1 title="지역" value="" placeholder="지역을 선택해주세요" onClick={() => { console.log('click region') }} />
            <ListCategoryPart1 title="지하철" value="" placeholder="지하철을 선택해주세요" onClick={() => { console.log('click subway') }} />

            <ChatMessageFuncPart1
              title="채팅 메시지 기능"
              value=''
              onClick={(value) => { console.log('click Chat message function', value) }}
              options={[
                { value: '1', label: '활성화' },
                { value: '2', label: '비활성화' }
              ]} />
            <ChatMessageFuncPart1
              title="스탬프 설정"
              value=''
              onClick={(value) => { console.log('click Stamp settings', value) }}
              options={[
                { value: '11', label: '활성화' },
                { value: '22', label: '비활성화' }
              ]} />
            <ChatMessageFuncPart1
              title="예약기능 설정"
              value=''
              onClick={(value) => { console.log('click Reservation function settings', value) }}
              options={[
                { value: '111', label: '활성화' },
                { value: '222', label: '비활성화' }
              ]} />
          </div>
          <div className="flex w-1/3 overflow-auto border-x ">2</div>
          <div className="flex w-1/3 overflow-auto ">3</div>
        </div>
      </Layout>
    </Layout>
  );
};

export default NewStore;
