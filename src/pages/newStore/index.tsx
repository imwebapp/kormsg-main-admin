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
import { ModalCreateNewManage } from "./components/ModalCreateNewManage";
import { ModalCreateNewPrice } from "./components/ModalCreateNewPrice";
interface IFormDataPage1 {
  storeCopyFunc: string;
  storeOwnerMembershipSetting: string;
  storeName: string;
  storeNumber: string;
  storeAddress: string;
  storeAddressDetails: string;
  storeImages: File[];
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
  amountBeforeDiscount?: number;
  amountAfterDiscount?: number;
  amountBeforeNightDiscount?: number;
  amountAfterNightDiscount?: number;
  unit: string;
}
interface INewManger {
  id: string;
  name: string;
  description: string;
  image: string;
}
interface IFormDataPage2 {
  storeIntroduction: string;
  priceList: INewPrice[];
  manager: INewManger[];
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

const dataPrice: Array<INewPrice> = [
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
const dataManage: Array<INewManger> = [
  {
    id: '1dataPrice',
    name: "관리사 YK",
    description: "너무 잘하고 착합니다, 단골지명 많은 분이 세요. 매주 화요일 근무해요! 부원장 이민영.",
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  },
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
  const [dataNewPrice, setDataNewPrice] = useState<INewPrice>({
    id: '',
    name: '',
    description: '',
    time: '',
    amountBeforeDiscount: undefined,
    amountAfterDiscount: undefined,
    amountBeforeNightDiscount: undefined,
    amountAfterNightDiscount: undefined,
    unit: '',
  });

  const [openModalCreateNewManage, setOpenModalCreateNewManage] = useState<boolean>(false);
  const [dataNewManage, setDataNewManage] = useState<INewManger>({
    id: '',
    name: '',
    description: '',
    image: '',
  });
  console.log('dataNewManage', dataNewManage);

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
    console.log('submit create new price: ', dataNewPrice);
    setOpenModalCreateNewPrice(false);
  };

  const handleCloseModalCreateNewManage = () => {
    setOpenModalCreateNewManage(false);
  };
  const handleImageCreateNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Image Create New Manage (File)
  };

  const handleSubmitCreateNewManage = (dataNewManage: any) => {
    console.log('submit create new manage: ', dataNewManage);
    setOpenModalCreateNewManage(false);
  };

  const [formDataPage1, setFormDataPage1] = useState<IFormDataPage1>({
    storeCopyFunc: '',
    storeOwnerMembershipSetting: '',
    storeName: '',
    storeNumber: '',
    storeAddress: '',
    storeAddressDetails: '',
    storeImages: [],
    storeOpeningHours: '',
    category: "1",
    region: '',
    hashtag: ['1', '2'],
    subway: '',
    chatMessageFunc: '',
    stampSetting: '',
    reservationFuncSetting: '',
  });

  const [formDataPage2, setFormDataPage2] = useState<IFormDataPage2>({
    storeIntroduction: '',
    priceList: dataPrice,
    manager: dataManage,
  });

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
  const handleInputChangeNewManage = (name: string, value: any) => {
    setDataNewManage({ ...dataNewManage, [name]: value });
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
                  handleInputChange('storeImages', [e?.target?.files[0], ...formDataPage1.storeImages.slice(1)]);
                }}
                // src={URL.createObjectURL(formDataPage1?.storeImages[0])}
                onDelImage={() => {
                  const updatedStoreImages = formDataPage1.storeImages.slice(1);
                  handleInputChange('storeImages', updatedStoreImages);
                }}
                description
                className="flex flex-col items-center justify-center w-2/3 rounded-lg bg-darkNight50 h-[380px]"
              />
              <div className="flex flex-col w-1/3 gap-3">
                <BaseInputImage
                  onImageChange={(e: any) => {
                    console.log('e', e);
                    const updatedStoreImages = [...formDataPage1.storeImages];
                    updatedStoreImages[1] = e?.target?.files[0];
                    handleInputChange('storeImages', updatedStoreImages);
                  }}
                  onDelImage={() => {
                    const updatedStoreImages = formDataPage1.storeImages.slice(1);
                    handleInputChange('storeImages', updatedStoreImages);
                  }}
                  // src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
                  className="h-[184px]"
                />
                <BaseInputImage
                  onImageChange={(e: any) => {
                    console.log('e', e);
                    const updatedStoreImages = [...formDataPage1.storeImages];
                    updatedStoreImages[2] = e?.target?.files[0];
                    handleInputChange('storeImages', updatedStoreImages);
                  }}
                  className="h-[184px]"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 grid-flow-rows min-h-[380px]">
              {([1, 2, 3, 4, 5, 6]).map((item, index) => {
                console.log('item', item, index);
                return (
                  <BaseInputImage
                    onImageChange={(e: any) => {
                      console.log('e', e);

                      handleInputChange('storeImages', [...formDataPage1.storeImages, e?.target?.files[0]]);
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
            title="Tag"
            options={listHashtag.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            placeholder="Select tags"
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
            onChange={(value) => handleInputChangePage2('storeIntroduction', value)}
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
                data={formDataPage2.manager}
                onCLickCreateNew={() => { setOpenModalCreateNewManage(true) }}
              />
              :
              <PriceListTab
                data={formDataPage2.priceList}
                onCLickCreateNew={() => { setOpenModalCreateNewPrice(true) }}
              />}
          </div>

        </div>


        <div className="flex flex-col w-1/3 p-4 overflow-auto ">
          {formDataPage1.storeImages[0] && <img src={URL.createObjectURL(formDataPage1?.storeImages[0])} className="w-full h-[260px]" />}
          {formDataPage1.storeName && <div className="p-4 border">
            <BaseText locale size={16} bold className="flex justify-center py-8 border-b">{formDataPage1.storeName}</BaseText>
            <div className="flex py-4">
              <div className="flex flex-col items-center justify-center flex-1 gap-1 border-r cursor-pointer">
                <img src={Images.iconPhone} className="w-9 h-9" />
                <BaseText locale size={16} className="text-center">전화</BaseText>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-1 border-r cursor-pointer">
                <img src={Images.iconHeart} className="w-9 h-9" />
                <BaseText locale size={16} className="text-center">찜하기</BaseText>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-1 border-r cursor-pointer">
                <img src={Images.iconDirection} className="w-9 h-9" />
                <BaseText locale size={16} className="text-center">길찾기</BaseText>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-1 cursor-pointer">
                <img src={Images.share} className="w-9 h-9" />
                <BaseText locale size={16} className="text-center">공유</BaseText>
              </div>
            </div>
          </div>}
          {(formDataPage1.storeAddress || formDataPage1.storeNumber || formDataPage1.storeAddressDetails || formDataPage1.storeOpeningHours) &&
            <div className="mt-1 border ">
              <div className="flex">
                <BaseText locale size={16} bold className="flex justify-center flex-1 p-[10px] border-b-8 border-r">정보</BaseText>
                <BaseText locale size={16} className="flex justify-center flex-1 p-[10px]">리뷰</BaseText>
              </div>
              <div className="p-4">
                {(formDataPage1.storeAddress || formDataPage1.storeAddressDetails) &&
                  <div className="flex items-center gap-1 py-3 border-b">
                    <img src={Images.iconGps} className="w-5 h-5" />
                    <BaseText locale size={16} className="text-center">{formDataPage1.storeAddress + ' ' + formDataPage1.storeAddressDetails}</BaseText>
                  </div>
                }
                {formDataPage1.storeOpeningHours &&
                  <div className="flex items-center gap-1 py-3 border-b">
                    <img src={Images.iconClock} className="w-5 h-5" />
                    <BaseText locale size={16} className="text-center">{formDataPage1.storeOpeningHours}</BaseText>
                  </div>
                }
                {formDataPage1.storeNumber &&
                  <div className="flex items-center gap-1 py-3 border-b">
                    <img src={Images.iconPhone2} className="w-5 h-5" />
                    <BaseText locale size={16} className="text-center">{formDataPage1.storeNumber}</BaseText>
                  </div>
                }
                {
                  formDataPage1.category &&
                  <div className="flex items-center gap-1 py-3 border-b">
                    <img src={Images.iconCategory} className="w-5 h-5" />
                    <BaseText locale size={16} className="text-center">{formDataPage1.category}</BaseText>
                  </div>
                }
                {
                  formDataPage1.region &&
                  <div className="flex items-center gap-1 py-3 border-b">
                    <img src={Images.iconSquare} className="w-5 h-5" />
                    <BaseText locale size={16} className="text-center">{formDataPage1.region}</BaseText>
                  </div>
                }
                <div className="flex items-center gap-1 py-3 ">
                  <img src={Images.iconTag} className="w-5 h-5" />
                  {formDataPage1.hashtag.map((item, index) => {
                    return (
                      <div className="px-4 mr-1 rounded-lg bg-darkNight100">
                        <BaseText locale size={16} className="text-center">{item}</BaseText>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          }
          {formDataPage2?.priceList?.length > 0 && <div className="flex flex-col gap-2 py-3 mt-1">
            <BaseText locale size={16} bold>가격표</BaseText>
            {
              formDataPage2.priceList.map((item, index) => {
                return (
                  <div className="py-2 border-t">
                    <div
                      className="flex items-center justify-between px-4 py-3 drop-shadow-lg"
                      style={{
                        backgroundImage: `url(${Images.bgDiscount})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="flex gap-2">
                        <img src={Images.discount1} className="w-11 h-11" />
                        <div className="flex flex-col">
                          <BaseText locale size={16} bold>본업체는 이벤트 중입니다.</BaseText>
                          <BaseText locale size={16} bold>오늘도 즐거운 하루를 위해 5천원 할인</BaseText>
                        </div>
                      </div>
                      <BaseText locale size={16} bold>34일남음</BaseText>
                    </div>
                  </div>
                )
              })
            }
          </div>
          }
          {formDataPage2.storeIntroduction && <BaseText size={16} bold className="text-center" >{formDataPage2.storeIntroduction}</BaseText>}
          {formDataPage2?.manager?.length > 0 && <div className="flex flex-col gap-2 py-3 mt-1">
            <BaseText size={16} bold>{t('담당자')}({formDataPage2?.manager?.length})</BaseText>
            {
              formDataPage2?.manager.map((item, index) => {
                return (
                  <div className="flex gap-3 p-2 border rounded-lg">
                    <img src={item?.image || Images.avatarEmpty} className="w-[84px] h-[84px] rounded-lg" />
                    <div className="flex flex-col justify-center w-full">
                      <BaseText size={16} bold>{item?.name}</BaseText>
                      <BaseText size={16} bold>{item?.description}</BaseText>
                    </div>
                  </div>
                )
              })
            }
          </div>
          }
        </div>
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
        isHideAction={!subwaySelected}
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

      <ModalCreateNewPrice
        isOpen={openModalCreateNewPrice}
        onClose={handleCloseModalCreateNewPrice}
        onSubmit={handleSubmitCreateNewPrice}
        data={dataNewPrice}
      />

      <ModalCreateNewManage
        isOpen={openModalCreateNewManage}
        onClose={handleCloseModalCreateNewManage}
        onSubmit={handleSubmitCreateNewManage}
        data={dataNewManage}
        onImageChange={handleImageCreateNewChange}
      />
    </Layout>
  );
};

export default NewStore;
