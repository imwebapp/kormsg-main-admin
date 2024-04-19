import { useEffect, useRef, useState } from "react";
import { settingApi } from "../../../apis/settingApi";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { showError } from "../../../utils/showToast";
import { BaseInput } from "../../../components/input/BaseInput";

export default function CustomService() {
  const { t } = useTranslation();
  const [webLink, setWebLink] = useState("");
  const [chPlayLink, setChPlayLink] = useState("");
  const [appStoreLink, setAppStoreLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [kakaoTalkOpenChatUrl, setKakaoTalkOpenChatUrl] = useState("");
  const handleWebLinkChange = (event: any) => {
    console.log("event", event);

    setWebLink(event);
  };

  const handleChPlayLinkChange = (event: any) => {
    setChPlayLink(event);
  };

  const handleAppStoreLinkChange = (event: any) => {
    setAppStoreLink(event);
  };

  const handlePhoneNumberChange = (event: any) => {
    setPhoneNumber(event);
  };

  const handleKakaoTalkOpenChatUrlChange = (event: any) => {
    setKakaoTalkOpenChatUrl(event);
  };

  const getSettingPage = async () => {
    try {
      const params = {
        fields: '["$all"]',
        filter: JSON.stringify({
          field: {
            $or: [
              "PHONE_NUMBER",
              "CH_PLAY_LINK",
              "APP_STORE_LINK",
              "WEB_LINK",
              "KAKAO_TALK_OPEN_CHAT_URL",
            ],
          },
        }),
      };

      let result: any = await settingApi.getList(params);
      if (result.code === 200) {
        result?.results?.objects?.rows.forEach((service: any) => {
          switch (service.field) {
            case "WEB_LINK":
              setWebLink(service.value);
              break;
            case "CH_PLAY_LINK":
              setChPlayLink(service.value);
              break;
            case "APP_STORE_LINK":
              setAppStoreLink(service.value);
              break;
            case "PHONE_NUMBER":
              setPhoneNumber(service.value);
              break;
            case "KAKAO_TALK_OPEN_CHAT_URL":
              setKakaoTalkOpenChatUrl(service.value);
              break;
            default:
              break;
          }
        });
      }
    } catch (error) {
      showError(error);
    }
  };
  useEffect(() => {
    getSettingPage();
    return () => {};
  }, []);
  function Service({ title, value, placeholder, onChange }: any) {
    const [inputValue, setInputValue] = useState(value);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
    };
    return (
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow self-stretch px-5 max-md:mt-10 max-md:max-w-full">
          <h2 className="text-base font-bold leading-6 text-neutral-900 max-md:max-w-full">
            {title}
          </h2>
          <div className="flex gap-4 mt-2 text-xl font-medium leading-7 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <Input
              className="flex-1 justify-center items-start px-4 py-3 text-black rounded-xl bg-neutral-100 max-md:pr-5 max-md:max-w-full border-none"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleChange}
            />
            <button
              className="justify-center px-5 py-3 text-white bg-blue-600 rounded-xl"
              onClick={
                onChange(inputValue) // Gọi hàm onChange được truyền từ props của component cha
              }
            >
              {t("Update")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-8">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 pb-10 ">
        <Service
          title={"고객센터 전화번호"}
          placeholder="입력해주세요"
          onChange={handlePhoneNumberChange}
          value={phoneNumber}
        />
        <Service
          title="고객센터 채팅링크"
          placeholder="입력해주세요"
          onChange={handleKakaoTalkOpenChatUrlChange}
          value={kakaoTalkOpenChatUrl}
        />
      </div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 pb-10">
        <Service
          title={"안드로이드 APP URL"}
          placeholder="입력해주세요"
          onChange={handleChPlayLinkChange}
          value={chPlayLink}
        />
        <Service
          title="IOS APP URL"
          placeholder="입력해주세요"
          onChange={handleAppStoreLinkChange}
          value={appStoreLink}
        />
      </div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 pb-10">
        <Service
          title={"WEB URL"}
          placeholder="입력해주세요"
          onChange={handleWebLinkChange}
          value={webLink}
        />
      </div>
    </div>
  );
}
