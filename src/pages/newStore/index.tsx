import { useEffect, useState } from "react";
import { BaseText, CustomButton, HeaderComponent } from "../../components";

import { Descriptions, Layout } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Images from "../../assets/gen";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseInputSelect } from "../../components/input/BaseInputSelect";
import { ListCategoryPart1 } from "./components/ListCategoryPart1";
import { ChatMessageFuncPart1 } from "./components/ChatMessageFuncPart1";
import { BaseModal } from "../../components/modal/BaseModal";
import { BaseInputImage } from "../../components/input/InputImage";
import { classNames } from "../../utils/common";
import { LIST_REGION } from "../../utils/constants";
import { ManageTab } from "./components/ManageTab";
import { PriceListTab } from "./components/PriceListTab";
interface IFormDataPage1 {
  storeCopyFunc: string;
  storeOwnerMembershipSetting: string;
  storeName: string;
  storeNumber: string;
  storeAddress: string;
  storeAddressDetails: string;
  storeImages: number[];
  storeOpeningHours: string;
  category: string;
  region: string;
  hashtag: string[];
  subway: string;
  chatMessageFunc: string;
  stampSetting: string;
  reservationFuncSetting: string;
}

interface INewPrice {
  id: string;
  name: string;
  description: string;
  time: string;
  amountBeforeDiscount: number;
  amountAfterDiscount: number;
  unit: 'USD' | 'VND' | 'Won';
}
interface IFormDataPage2 {
  storeIntroduction: string;
  priceList: INewPrice[];
  manager: string;
}

const CATEGORY_PART1 = [
  {
    id: "1",
    name: "타이",
  },
  {
    id: "2",
    name: "러시아",
  },
  {
    id: "3",
    name: "한국",
  },
  {
    id: "4",
    name: "중국",
  },
]
const listHashtag = [
  {
    id: '1',
    name: "1"
  },
  {
    id: '2',
    name: "2"
  },
  {
    id: '3',
    name: "3"
  }
];

const LIST_SUBWAY = [
  {
    id: '1',
    name: '1호선',
    children: [
      {
        value: "부산",
        title: "부산",
      },
      {
        value: "동래",
        title: "동래",
      },
      {
        value: "추량",
        title: "추량",
      },
      {
        value: "명륜",
        title: "명륜",
      },
      {
        value: "명륜2",
        title: "명륜2",
      },
    ],
  },
  {
    id: '2',
    name: '2호선',
    children: [
      {
        value: "부산",
        title: "부산",
      },
      {
        value: "동래",
        title: "동래",
      },
      {
        value: "추량",
        title: "추량",
      },
      {
        value: "명륜",
        title: "명륜",
      },
    ],
  },
  {
    id: '3',
    name: '3호선',
    children: [
      {
        value: "부산",
        title: "부산",
      },
      {
        value: "동래",
        title: "동래",
      },
      {
        value: "추량",
        title: "추량",
      },
      {
        value: "명륜",
        title: "명륜",
      },
    ],
  },
  {
    id: '4',
    name: '4호선',
    children: [
      {
        value: "부산",
        title: "부산",
      },
      {
        value: "동래",
        title: "동래",
      },
      {
        value: "추량",
        title: "추량",
      },
      {
        value: "명륜",
        title: "명륜",
      },
    ],
  },
  {
    id: '5',
    name: '5호선',
    children: [
      {
        value: "부산",
        title: "부산",
      },
      {
        value: "동래",
        title: "동래",
      },
      {
        value: "추량",
        title: "추량",
      },
      {
        value: "명륜",
        title: "명륜",
      },
    ],
  },
  {
    id: '6',
    name: '6호선',
    children: [
      {
        value: "부산",
        title: "부산",
      },
      {
        value: "동래",
        title: "동래",
      },
      {
        value: "추량",
        title: "추량",
      },
      {
        value: "명륜",
        title: "명륜",
      },
    ],
  },
  {
    id: '7',
    name: '7호선',
    children: [
      {
        value: "부산",
        title: "부산",
      },
      {
        value: "동래",
        title: "동래",
      },
      {
        value: "추량",
        title: "추량",
      },
      {
        value: "명륜",
        title: "명륜",
      },
    ],
  }
];

const listOptionPart2 = [
  {
    title: "가격표",
    value: "가격표",
  },
  {
    title: "담당자",
    value: "담당자",
  },
];

const dataPrice: Array<
  {
    id: string,
    name: string,
    description: string,
    time: string,
    amountBeforeDiscount: number,
    amountAfterDiscount: number,
    unit: 'USD' | 'VND' | 'Won',
  }
> = [
    {
      id: '1dataPrice',
      name: "가격표",
      description: "가격표",
      time: '2022-12-12',
      amountBeforeDiscount: 100,
      amountAfterDiscount: 90,
      unit: 'USD',
    },
    {
      id: '2dataPrice',
      name: "가격표2",
      description: "가격표2",
      time: '2023-12-12',
      amountBeforeDiscount: 150,
      amountAfterDiscount: 100,
      unit: 'Won',
    }
  ];

const { Header } = Layout;

const NewStore = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [openModalOpenHours, setOpenModalOpenHours] = useState<boolean>(false);
  const [openModalRegion, setOpenModalRegion] = useState<boolean>(false);

  const [regionSelected, setRegionSelected] = useState<any>(LIST_REGION[0]);
  const [regionSelectedChild, setRegionSelectedChild] = useState<any>({
    title: '',
    value: '',
  });

  const [openModalSubway, setOpenModalSubway] = useState<boolean>(false);
  const [subwaySelected, setSubwaySelected] = useState<any>();
  const [subwaySelectedChild, setSubwaySelectedChild] = useState<any>({
    title: '',
    value: '',
  });

  const [openModalCreateNewPrice, setOpenModalCreateNewPrice] = useState<boolean>(false);
  const [dataNewPrice, setDataNewPrice] = useState<INewPrice>({} as INewPrice);


  const [optionPart2Selected, setOptionPart2Selected] = useState<string>('가격표');

  const handleCloseModalOpenHours = () => {
    setOpenModalOpenHours(false);
  };

  const handleSubmitOpenHours = () => {
    console.log('submit open hours');
    setOpenModalOpenHours(false);
  };

  const handleCloseModalRegion = () => {
    setOpenModalRegion(false);
  };

  const handleSubmitRegion = () => {
    console.log('submit region');
    handleInputChange('region', regionSelectedChild.value);
    setOpenModalRegion(false);
  };

  const handleCloseModalSubway = () => {
    setOpenModalSubway(false);
    setSubwaySelected(undefined);
    setSubwaySelectedChild({
      title: '',
      value: '',
    });
  };

  const handleSubmitSubway = () => {
    console.log('submit subway');
    handleInputChange('subway', subwaySelectedChild.value);
    setOpenModalSubway(false);
    setSubwaySelected(undefined);
    setSubwaySelectedChild({
      title: '',
      value: '',
    });
  };

  const handleCloseModalCreateNewPrice = () => {
    setOpenModalCreateNewPrice(false);
  };

  const handleSubmitCreateNewPrice = () => {
    console.log('submit create new price');
    setOpenModalCreateNewPrice(false);
  };

  const [formDataPage1, setFormDataPage1] = useState<IFormDataPage1>({
    storeCopyFunc: '',
    storeOwnerMembershipSetting: '',
    storeName: '',
    storeNumber: '',
    storeAddress: '',
    storeAddressDetails: '',
    storeImages: [1, 2, 3, 4, 5, 6],
    storeOpeningHours: '',
    category: "1",
    region: '',
    hashtag: ['1', '2'],
    subway: '',
    chatMessageFunc: '',
    stampSetting: '',
    reservationFuncSetting: '',
  });

  const [formDataPage2, setFormDataPage2] = useState<IFormDataPage2>({} as IFormDataPage2);

  console.log('formDataPage1', formDataPage1);
  console.log('formDataPage2', formDataPage2);

  const handleInputChange = (name: string, value: any) => {
    setFormDataPage1({ ...formDataPage1, [name]: value });
  };
  const handleInputChangePage2 = (name: string, value: any) => {
    setFormDataPage2({ ...formDataPage2, [name]: value });
  };
  const handleInputChangeNewPrice = (name: string, value: any) => {
    setDataNewPrice({ ...dataNewPrice, [name]: value });
  };
  useEffect(() => {
  }, []);

  return (
    <Layout className="h-screen bg-white">
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
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <BaseInputImage
                onImageChange={(e: any) => {
                  console.log('e', e);

                }}
                description
                className="flex flex-col items-center justify-center w-2/3 rounded-lg bg-darkNight50 h-[380px]"
              />
              <div className="flex flex-col w-1/3 gap-3">
                <BaseInputImage
                  onImageChange={(e: any) => {
                    console.log('e', e);
                  }}
                  src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
                  className="h-[184px]"
                />
                <BaseInputImage
                  onImageChange={(e: any) => {
                    console.log('e', e);

                  }}
                  className="h-[184px]"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 grid-flow-rows min-h-[380px]">
              {(formDataPage1.storeImages || []).map((item, index) => {
                console.log('item', item, index);
                return (
                  <BaseInputImage
                    onImageChange={(e: any) => {
                      console.log('e', e);

                    }}
                    key={index}
                    className="h-[184px]"
                  />
                );
              })}
            </div>
          </div>
          <ListCategoryPart1 title="영업시간" value="" placeholder="영업시간을 설정해주세요" onClick={() => { setOpenModalOpenHours(true) }} />
          <BaseInputSelect
            title="카테고리"
            options={CATEGORY_PART1.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            placeholder="카테고리를 선택해주세요"
            value={formDataPage1.category}
            onChange={(value) => handleInputChange('category', value)}
          />
          <BaseInputSelect
            title="태그"
            options={listHashtag.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            placeholder="태그를 선택해주세요"
            value={formDataPage1.hashtag}
            onChange={(value) => handleInputChange('hashtag', value)}
            multiple
          />
          <ListCategoryPart1 title="지역" value={formDataPage1.region} placeholder="지역을 선택해주세요" onClick={() => { setOpenModalRegion(true) }} />
          <ListCategoryPart1 title="지하철" value={formDataPage1.subway} placeholder="지하철을 선택해주세요" onClick={() => { setOpenModalSubway(true) }} />

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


        <div className="flex flex-col w-1/3 gap-4 p-6 overflow-auto border-x ">
          <BaseInput
            onChange={(value) => handleInputChange('storeIntroduction', value)}
            value={formDataPage2.storeIntroduction}
            placeholder="매장의 소개해주세요
            구글 혹은 네이버에 노출 될 수 있으니
            소개글과 노출 원하는 키워드도 같이
            입력바랍니다. 예시: 강남케어, 강남맛집,강남추천 등~"
            title="매장 소개"
            className="flex w-full"
            styleInputContainer="w-full"
            textArea
            titleSize={16}
          />
          <div className="flex">
            {listOptionPart2.map((item, index) => {
              return (
                <div
                  onClick={() => setOptionPart2Selected(item.value)}
                  key={index}
                  className={
                    "flex w-1/2 items-center justify-center cursor-pointer border-b"
                  }
                >
                  <div className="flex flex-col gap-4 ">
                    <div className="flex items-center justify-center gap-2 ">
                      <BaseText
                        locale
                        size={20}
                        bold
                        color={classNames(
                          optionPart2Selected !== item.value
                            ? "text-darkNight500"
                            : ""
                        )}
                      >
                        {t(item.title)}
                      </BaseText>
                    </div>
                    {optionPart2Selected === item.value ? (
                      <div className="w-full h-1 bg-dayBreakBlue500 rounded-t-xl" />
                    ) : (
                      <div className="w-full h-1" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {optionPart2Selected === "담당자" ?
              <ManageTab

              />
              :
              <PriceListTab
                data={dataPrice}
                onCLickCreateNew={() => { setOpenModalCreateNewPrice(true) }}
              />}
          </div>

        </div>


        <div className="flex w-1/3 overflow-auto ">3</div>
      </div>
      <BaseModal
        isOpen={openModalOpenHours}
        onClose={handleCloseModalOpenHours}
        onSubmit={handleSubmitOpenHours}
        title="영업시간"
        disableSubmitBtn={!formDataPage1.storeOpeningHours}
      >
        abc
      </BaseModal>

      <BaseModal
        isOpen={openModalRegion}
        onClose={handleCloseModalRegion}
        onSubmit={handleSubmitRegion}
        title="지역"
        disableSubmitBtn={!regionSelectedChild.value}
      >
        <div className="flex h-[400px]">
          <div className="w-1/4 border-r">
            {
              LIST_REGION.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={classNames('flex px-4 py-[10px]', regionSelected.id === item.id ? 'bg-darkNight900' : '')}
                    onClick={() => { setRegionSelected(item) }}
                  >
                    <BaseText locale size={16} bold className={classNames(regionSelected.id === item.id ? 'text-white' : '')}>
                      {item.name}
                    </BaseText>
                  </div>
                )
              })
            }
          </div>
          <div className="w-3/4 px-3 overflow-auto">{
            (regionSelected.children || []).map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className='flex justify-between py-3'
                  onClick={() => { setRegionSelectedChild(item) }}
                >
                  <BaseText locale size={16} bold className={classNames(regionSelectedChild.value === item.value ? 'text-primary' : '')}>
                    {item.title}
                  </BaseText>
                  {regionSelectedChild.value === item.value && <CheckOutlined style={{ marginLeft: '8px', color: '#0866FF' }} />}
                </div>
              )
            })
          }</div>
        </div>
      </BaseModal>

      <BaseModal
        isOpen={openModalSubway}
        onClose={handleCloseModalSubway}
        onSubmit={handleSubmitSubway}
        title="뒤로"
        disableSubmitBtn={!subwaySelectedChild.value}
        hideButton={!subwaySelected}
      >
        <div className="flex flex-col gap-4">
          {
            subwaySelected ? (
              <>
                <div>
                  <></>
                  <BaseText size={24} medium>
                    {subwaySelected.name}
                  </BaseText>
                </div>
                <div className="grid grid-cols-4 gap-3 overflow-auto grid-flow-rows max-h-[400px]">
                  {
                    subwaySelected.children.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={classNames('flex h-fit items-center justify-center px-8 py-3 rounded-lg', subwaySelectedChild.value === item.value ? 'bg-black' : 'bg-darkNight50')}
                          onClick={() => { setSubwaySelectedChild(item) }}
                        >
                          <BaseText locale size={16} bold className={classNames(subwaySelectedChild.value === item.value ? 'text-white' : '')} >
                            {item.title}
                          </BaseText>
                        </div>
                      )
                    })
                  }
                </div>
              </>
            ) : (
              <>
                <BaseText size={24} medium>
                  지하철
                </BaseText>
                <div className="grid grid-cols-3 gap-3 grid-flow-rows">
                  {
                    LIST_SUBWAY.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className='flex px-4 py-[20px] border-primary border-l-8'
                          onClick={() => { setSubwaySelected(item) }}
                        >
                          <BaseText locale size={16} bold >
                            {item.name}
                          </BaseText>
                        </div>
                      )
                    })
                  }
                </div>
              </>
            )
          }
        </div>
      </BaseModal>

      <BaseModal
        isOpen={openModalCreateNewPrice}
        onClose={handleCloseModalCreateNewPrice}
        onSubmit={handleSubmitCreateNewPrice}
        title="코스등록"
        disableSubmitBtn={!dataNewPrice}
      >

        <div className="flex flex-col gap-4">
          <ChatMessageFuncPart1
            title="주간 야간별 요금을 각각 설정"
            value=''
            onClick={(value) => { console.log('click Stamp settings', value) }}
            options={[
              { value: '1', label: '아니오' },
              { value: '2', label: '예' }
            ]} />
          <BaseInput
            title="코스이름"
            placeholder="타이마사지"
            value={dataNewPrice.name}
            onChange={(value) => handleInputChangeNewPrice('name', value)}
          />
          <BaseInput
            title="코스설명"
            placeholder="타이마사지"
            value={dataNewPrice.description}
            onChange={(value) => handleInputChangeNewPrice('description', value)}
          />
          <BaseInputSelect
            title="코스시간"
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
              },
            ]}
            value={'1'}
            onChange={(value) => handleInputChange('storeOpeningHours', value)}
            placeholder="시간선택"
          />
          <BaseInput
            title="요금"
            placeholder="100"
            type="number"
            value={dataNewPrice.amountBeforeDiscount}
            onChange={(value) => handleInputChangeNewPrice('amountBeforeDiscount', value)}
          />
          <BaseInput
            title="할인된 요금"
            placeholder="90"
            type="number"
            value={dataNewPrice.amountAfterDiscount}
            onChange={(value) => handleInputChangeNewPrice('amountAfterDiscount', value)}
          />

          <BaseInputSelect
            title="코스시간"
            options={[
              {
                value: "1",
                label: "USD",
              },
              {
                value: "2",
                label: "VND",
              },
              {
                value: "3",
                label: "Won",
              },
            ]}
            value={'1'}
            onChange={(value) => handleInputChange('storeOpeningHours', value)}
          />
        </div>
      </BaseModal>
    </Layout>
  );
};

export default NewStore;
