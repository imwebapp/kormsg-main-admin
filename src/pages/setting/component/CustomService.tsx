import { useEffect, useState } from "react";
import { settingApi } from "../../../apis/settingApi";
import { useTranslation } from "react-i18next";
import { showError, showSuccess } from "../../../utils/showToast";
import { Input } from "antd";
import { BaseInput } from "../../../components/input/BaseInput";

export default function CustomService() {
  const { t } = useTranslation();
  const [webLink, setWebLink] = useState<any>({});
  const [chPlayLink, setChPlayLink] = useState<any>({});
  const [appStoreLink, setAppStoreLink] = useState<any>({});
  const [phoneNumber, setPhoneNumber] = useState<any>({});
  const [kakaoTalkOpenChatUrl, setKakaoTalkOpenChatUrl] = useState<any>({});
  const handlePhoneNumberChange = (value: string) => {
    const updatedPhoneNumber = { ...phoneNumber };
    updatedPhoneNumber.value = value;
    setPhoneNumber(updatedPhoneNumber);
  };
  const handleWebLinkChange = (value: string) => {
    const updatedWebLink = { ...webLink };
    // Cập nhật trường value trong object webLink
    updatedWebLink.value = value;
    setWebLink(updatedWebLink);
  };

  const handleChPlayLinkChange = (value: string) => {
    const updatedChPlayLink = { ...chPlayLink };
    updatedChPlayLink.value = value;
    setChPlayLink(updatedChPlayLink);
  };

  const handleAppStoreLinkChange = (value: string) => {
    const updatedAppStoreLink = { ...appStoreLink };
    updatedAppStoreLink.value = value;
    setAppStoreLink(updatedAppStoreLink);
  };

  const handleKakaoTalkOpenChatUrlChange = (value: string) => {
    const updatedKakaoTalkOpenChatUrl = { ...kakaoTalkOpenChatUrl };
    updatedKakaoTalkOpenChatUrl.value = value;
    setKakaoTalkOpenChatUrl(updatedKakaoTalkOpenChatUrl);
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
              setWebLink(service);
              break;
            case "CH_PLAY_LINK":
              setChPlayLink(service);
              break;
            case "APP_STORE_LINK":
              setAppStoreLink(service);
              break;
            case "PHONE_NUMBER":
              setPhoneNumber(service);
              break;
            case "KAKAO_TALK_OPEN_CHAT_URL":
              setKakaoTalkOpenChatUrl(service);
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
  const updateData = async (id: string, value: string) => {
    try {
      const data = {
        value: value,
      };
      let result: any = await settingApi.updateSetting(id, data);
      if (result.code === 200) {
        showSuccess("Update Customer Service Success");
      }
    } catch (error) {
      showError(error);
    }
  };
  useEffect(() => {
    getSettingPage();
    return () => {};
  }, []);

  return (
    <div className="px-6 pt-8">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 pb-10 ">
        {/* Phone Number */}
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow self-stretch px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-base font-bold leading-6 text-neutral-900 max-md:max-w-full">
              {t("고객센터 전화번호")}
            </h2>
            <div className="flex gap-4 mt-2 text-xl font-medium leading-7 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
              <Input
                className="flex-1 justify-center items-start px-4 py-3 text-black rounded-xl bg-neutral-100 max-md:pr-5 max-md:max-w-full border-none"
                placeholder={"입력해주세요"}
                value={phoneNumber.value}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
              />
              <button
                className="justify-center px-5 py-3 text-white bg-blue-600 rounded-xl"
                onClick={() => updateData(phoneNumber.id, phoneNumber.value)}
              >
                {t("Update")}
              </button>
            </div>
          </div>
        </div>
        {/* IOS APP URL */}
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow self-stretch px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-base font-bold leading-6 text-neutral-900 max-md:max-w-full">
              {t("고객센터 채팅링크")}
            </h2>
            <div className="flex gap-4 mt-2 text-xl font-medium leading-7 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
              <Input
                className="flex-1 justify-center items-start px-4 py-3 text-black rounded-xl bg-neutral-100 max-md:pr-5 max-md:max-w-full border-none"
                placeholder={"입력해주세요"}
                value={kakaoTalkOpenChatUrl.value}
                onChange={(e) =>
                  handleKakaoTalkOpenChatUrlChange(e.target.value)
                }
              />
              <button
                className="justify-center px-5 py-3 text-white bg-blue-600 rounded-xl"
                onClick={() =>
                  updateData(
                    kakaoTalkOpenChatUrl.id,
                    kakaoTalkOpenChatUrl.value
                  )
                }
              >
                {t("Update")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 pb-10">
        {/* CH PLAY APP URL */}
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow self-stretch px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-base font-bold leading-6 text-neutral-900 max-md:max-w-full">
              {t("안드로이드 APP URL")}
            </h2>
            <div className="flex gap-4 mt-2 text-xl font-medium leading-7 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
              <Input
                className="flex-1 justify-center items-start px-4 py-3 text-black rounded-xl bg-neutral-100 max-md:pr-5 max-md:max-w-full border-none"
                placeholder={"입력해주세요"}
                value={chPlayLink.value}
                onChange={(e) => handleChPlayLinkChange(e.target.value)}
              />
              <button
                className="justify-center px-5 py-3 text-white bg-blue-600 rounded-xl"
                onClick={() => updateData(chPlayLink.id, chPlayLink.value)}
              >
                {t("Update")}
              </button>
            </div>
          </div>
        </div>
        {/* IOS APP URL */}
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow self-stretch px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-base font-bold leading-6 text-neutral-900 max-md:max-w-full">
              {t("IOS APP URL")}
            </h2>
            <div className="flex gap-4 mt-2 text-xl font-medium leading-7 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
              <Input
                className="flex-1 justify-center items-start px-4 py-3 text-black rounded-xl bg-neutral-100 max-md:pr-5 max-md:max-w-full border-none"
                placeholder={"입력해주세요"}
                value={appStoreLink.value}
                onChange={(e) => handleAppStoreLinkChange(e.target.value)}
              />
              <button
                className="justify-center px-5 py-3 text-white bg-blue-600 rounded-xl"
                onClick={() => updateData(appStoreLink.id, appStoreLink.value)}
              >
                {t("Update")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 pb-10">
        {/* Web URL */}
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow self-stretch px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-base font-bold leading-6 text-neutral-900 max-md:max-w-full">
              {t("WEB URL")}
            </h2>
            <div className="flex gap-4 mt-2 text-xl font-medium leading-7 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
              <Input
                className="flex-1 justify-center items-start px-4 py-3 text-black rounded-xl bg-neutral-100 max-md:pr-5 max-md:max-w-full border-none"
                placeholder={"입력해주세요"}
                value={webLink.value}
                onChange={(e) => handleWebLinkChange(e.target.value)}
              />
              <button
                className="justify-center px-5 py-3 text-white bg-blue-600 rounded-xl"
                onClick={() => updateData(webLink.id, webLink.value)}
              >
                {t("Update")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"></div>
      </div>
    </div>
  );
}
