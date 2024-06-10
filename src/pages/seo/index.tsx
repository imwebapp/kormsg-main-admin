import React, { useEffect, useState } from "react";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseText, CustomButton } from "../../components";
import Images from "../../assets/gen";
import { PlusOutlined } from "@ant-design/icons";
import { seoApi } from "../../apis/seoApi";
import { classNames } from "../../utils/common";
import { UploadApi } from "../../apis/uploadApi";
import { App, Spin } from "antd";

const SeoPage = () => {
  const { message } = App.useApp();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [dataSeo, setDataSeo] = useState({
    siteName: "",
    siteDescription: "",
    metaKeyword: "",
    favicon: "",
    avatar: "",
    metaCode: "",
    metaNaverCode: "",
    google_ads: "",
  });
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const handleChange = (key: string, value: string) => {
    setDataSeo({ ...dataSeo, [key]: value });
  };

  const isFormDataValid = () => {
    for (const key in dataSeo) {
      const value = dataSeo[key as keyof typeof dataSeo];
      if (key === "favicon" && selectedIcon === null && !value) {
        return false;
      }
      if (key === "avatar" && selectedAvatar === null && !value) {
        return false;
      }
      if (key !== "favicon" && key !== "avatar" && key !== "google_ads" && !value) {
        return false;
      }
    }
    return true;
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event?.target?.files[0];
      setSelectedIcon(imageFile);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event?.target?.files[0];
      setSelectedAvatar(imageFile);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoadingScreen(true);
      let iconUploaded = dataSeo?.favicon;
      let imageUploaded = dataSeo?.avatar;
      if (selectedIcon !== null) {
        const ResUploadIcon = await UploadApi.uploadImage(selectedIcon);
        iconUploaded = ResUploadIcon.url;
      }
      if (selectedAvatar !== null) {
        const ResUploadAvatar = await UploadApi.uploadImage(selectedAvatar);
        imageUploaded = ResUploadAvatar.url;
      }
      const dataConvert = {
        title: dataSeo?.siteName.trim(),
        description: dataSeo?.siteDescription.trim(),
        icon: iconUploaded,
        avatar: imageUploaded,
        keywords: dataSeo?.metaKeyword.trim(),
        meta: dataSeo?.metaCode.trim(),
        meta_naver: dataSeo?.metaNaverCode.trim(),
        google_ads: dataSeo?.google_ads.trim(),
      };

      const response: any = await seoApi.updateSEO(dataConvert);
      if (response.code === 200) {
        setSelectedIcon(null);
        setSelectedAvatar(null);
        setDataSeo({
          siteName: response?.results?.object?.title,
          siteDescription: response?.results?.object?.description,
          metaKeyword: response?.results?.object?.keywords,
          favicon: response?.results?.object?.icon,
          avatar: response?.results?.object?.avatar,
          metaCode: response?.results?.object?.meta,
          metaNaverCode: response?.results?.object?.meta_naver,
          google_ads: response?.results?.object?.google_ads,
        });
        setLoadingScreen(false);
        message.success("Update SEO success");
      }
    } catch (error: any) {
      console.log("error", error);
      setLoadingScreen(false);
      message.error(error.data.response || "Update SEO failed");
    }
  };

  const _getDataSeo = async () => {
    // Call API to get data
    try {
      const response: any = await seoApi.getSEO();
      if (response.code === 200) {
        setDataSeo({
          siteName: response?.results?.object?.title,
          siteDescription: response?.results?.object?.description,
          metaKeyword: response?.results?.object?.keywords,
          favicon: response?.results?.object?.icon,
          avatar: response?.results?.object?.avatar,
          metaCode: response?.results?.object?.meta,
          metaNaverCode: response?.results?.object?.meta_naver,
          google_ads: response?.results?.object?.google_ads,
        });
      }
    } catch (error) { }
  };

  useEffect(() => {
    _getDataSeo();
  }, []);

  return (
    <div className="flex flex-col gap-3 p-6">
      <Spin
        spinning={loadingScreen}
        tip="Loading..."
        size="large"
        className="flex"
        fullscreen
      />
      <div className="p-8 border rounded-lg flex flex-col gap-[20px]">
        <BaseInput
          title="Site name"
          placeholder="Site name"
          value={dataSeo.siteName}
          onChange={(value) => handleChange("siteName", value)}
        />
        <BaseInput
          title="Site description"
          placeholder="Site description"
          value={dataSeo.siteDescription}
          onChange={(value) => handleChange("siteDescription", value)}
        />

        <div className="flex flex-col gap-2">
          <BaseText locale bold size={14}>
            Meta keyword
          </BaseText>
          <BaseText locale bold size={14} className="text-red-500">
            *Please enter keywords related to the website separated by commas(,)
            (Robot meta tag)
          </BaseText>
          <BaseInput
            placeholder="Meta keyword"
            value={dataSeo.metaKeyword}
            onChange={(value) => handleChange("metaKeyword", value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <BaseText locale bold size={14}>
            Favicon
          </BaseText>
          <div className="flex items-center gap-6">
            {selectedIcon ? (
              <img
                src={URL.createObjectURL(selectedIcon)}
                className="h-[120px] w-[120px] flex justify-center items-center rounded-lg"
              />
            ) : dataSeo?.favicon ? (
              <img
                src={dataSeo.favicon}
                className="h-[120px] w-[120px] flex justify-center items-center rounded-lg"
              />
            ) : (
              <div className="h-[120px] w-[120px] flex justify-center items-center rounded-lg border-dashed border-2">
                <img src={Images.uploadCloudIcon} />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  style={{ display: "none" }}
                  id="upload-icon"
                  key="upload-icon"
                />
                <CustomButton
                  primary
                  icon={<PlusOutlined />}
                  bold
                  locale
                  onClick={() => {
                    const uploadIconImgInput =
                      document.getElementById("upload-icon");
                    if (uploadIconImgInput) {
                      uploadIconImgInput.click();
                    }
                  }}
                >
                  Upload new picture
                </CustomButton>
                <CustomButton
                  bold
                  locale
                  onClick={() => {
                    setSelectedIcon(null);
                    setDataSeo({ ...dataSeo, favicon: "" });
                  }}
                >
                  Remove
                </CustomButton>
              </div>
              <BaseText locale bold size={14} className="text-red-500">
                *Recommended resolution: 512X512 PNG/ 16X16 ICO
              </BaseText>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <BaseText locale bold size={14}>
            Avatar
          </BaseText>
          <div className="flex items-center gap-6">
            {selectedAvatar ? (
              <img
                src={URL.createObjectURL(selectedAvatar)}
                className="h-[120px] w-[120px] flex justify-center items-center rounded-lg"
              />
            ) : dataSeo?.avatar ? (
              <img
                src={dataSeo.avatar}
                className="h-[120px] w-[120px] flex justify-center items-center rounded-lg"
              />
            ) : (
              <div className="h-[120px] w-[120px] flex justify-center items-center rounded-lg border-dashed border-2">
                <img src={Images.uploadCloudIcon} />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                  id="upload-avatar"
                  key="upload-avatar"
                />
                <CustomButton
                  primary
                  icon={<PlusOutlined />}
                  bold
                  locale
                  onClick={() => {
                    const uploadImageInput =
                      document.getElementById("upload-avatar");
                    if (uploadImageInput) {
                      uploadImageInput.click();
                    }
                  }}
                >
                  Upload new picture
                </CustomButton>
                <CustomButton
                  bold
                  locale
                  onClick={() => {
                    setSelectedAvatar(null);
                    setDataSeo({ ...dataSeo, avatar: "" });
                  }}
                >
                  Remove
                </CustomButton>
              </div>
              <BaseText locale bold size={14} className="text-red-500">
                *Recommended resolution: 512 X512 PNG/ Favicon: 200X200/ PNG
              </BaseText>
            </div>
          </div>
        </div>

        <BaseInput
          title="Meta code"
          placeholder="Meta code"
          value={dataSeo.metaCode}
          onChange={(value) => handleChange("metaCode", value)}
          textArea
        />
        <BaseText locale bold size={14} color="text-darkNight700">
          Insert the meta tag for ownership for Naver and Google Webmaster Tools
          here.
        </BaseText>

        <BaseInput
          title="Google AdSense code"
          placeholder="Google AdSense code"
          value={dataSeo.google_ads}
          onChange={(value) => handleChange("google_ads", value)}
          textArea
        />
        <BaseText locale bold size={14} color="text-darkNight700">
          {/* Insert the meta tag for ownership for Naver and Google Webmaster Tools
          here. */}
        </BaseText>
      </div>
      <CustomButton
        className="flex justify-center p-6"
        locale
        primary
        onClick={handleSubmit}
        bold
        disabled={!isFormDataValid()}
      >
        Save
      </CustomButton>
    </div>
  );
};

export default SeoPage;
