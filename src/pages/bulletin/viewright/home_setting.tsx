import { Switch, message } from "antd";
import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { useEffect, useMemo, useState } from "react";
import { BannerInterface } from "../../../entities/banner.entity";
import { NAVBAR } from "../../../utils/constants";
import { AdminSettingInterface } from "../../../entities/adminsetting.entity";
import { useBulletinState } from "../store";
import { UploadApi } from "../../../apis/uploadApi";
import { HomeSettingApi } from "../../../apis/homeSettingApi";
import { NavBarApi } from "../../../apis/navbarApi";
import { NavBarInterface } from "../../../entities/navbar.entity";
import { showError } from "../../../utils/showToast";
import { useTranslation } from "react-i18next";

export default function HomeSetting() {
  return (
    <div className="flex flex-col">
      <AdminSetting />
      <Banner />
      <NavigationBar />
    </div>
  );
}

const AdminSetting = () => {
  const [mentorStatus, setMentorStatus] = useState<boolean | undefined>(false);
  const [adultVerificationStatus, setAdultVerificationStatus] = useState<
    boolean | undefined
  >(false);
  const { setLastRefresh } = useBulletinState((state) => state);

  const getSettingAdmin = async () => {
    try {
      const data: AdminSettingInterface = await HomeSettingApi.settingAdmin();
      setMentorStatus(data.mentor_status);
      setAdultVerificationStatus(data.status);
    } catch (error) {}
  };

  const settingAdultVerification = async () => {
    try {
      await HomeSettingApi.settingAdultVerification();
      setLastRefresh(Date.now());
    } catch (error) {
      showError(error);
    }
  };

  const settingMentorStatus = async () => {
    try {
      await HomeSettingApi.settingMentorStatus();
      setLastRefresh(Date.now());
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    getSettingAdmin();
  }, []);

  return (
    <>
      <BaseText locale bold size={16} className="mb-4">
        Things
      </BaseText>
      <BaseText locale medium className="mb-4">
        Adult certification
      </BaseText>
      <div className="flex flex-row justify-between">
        <BaseText locale medium className="mb-4">
          Adult verification status
        </BaseText>
        <Switch
          value={adultVerificationStatus}
          onChange={(value) => {
            setAdultVerificationStatus(value);
            settingAdultVerification();
          }}
        />
      </div>
      <div className="h-[1px] bg-darkNight100"></div>
      <div className="flex flex-row justify-between mt-4">
        <BaseText locale medium className="mb-4">
          Whether profile features are exposed?
        </BaseText>
        <Switch
          value={mentorStatus}
          onChange={(value) => {
            setMentorStatus(value);
            settingMentorStatus();
          }}
        />
      </div>
    </>
  );
};

const Banner = () => {
  const [banners, setBanners] = useState<Array<BannerInterface>>([]);
  const { setLastRefresh } = useBulletinState((state) => state);

  const getListBanner = async () => {
    try {
      const data = await HomeSettingApi.getList();
      setBanners(data);
    } catch (error) {}
  };

  useEffect(() => {
    getListBanner();
  }, []);

  const updateBanner = async (item: BannerInterface) => {
    try {
      await HomeSettingApi.updateBanner(item.id || "", item);
      getListBanner();
      setLastRefresh(Date.now());
    } catch (error) {}
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    item: BannerInterface
  ) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const respon = await UploadApi.uploadImage(file);
        updateBanner({ ...item, thumbnail: respon.url });
      }
    } catch (error) {
      showError(error);
    }
  };

  const createBanner = async () => {
    try {
      await HomeSettingApi.createBanner({
        thumbnail: "",
        url: "",
      });
      setLastRefresh(Date.now());
      getListBanner();
    } catch (error) {
      showError(error);
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      await HomeSettingApi.deleteBanner(id);
      setLastRefresh(Date.now());
      getListBanner();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      {useMemo(
        () => (
          <>
            <div className="h-[1px] bg-darkNight100"></div>
            <div className="flex flex-row justify-between mt-4">
              <BaseText locale bold className="mb-4">
                Banner
              </BaseText>
              <img
                onClick={createBanner}
                src={Images.plus}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              {banners.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex flex-row items-center justify-between">
                      <BaseText medium>
                        <BaseText locale>Banner</BaseText> {index + 1}
                      </BaseText>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          id={"bannerInput" + index}
                          style={{ display: "none" }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleImageChange(e, item);
                          }}
                        />
                        <label
                          htmlFor={"bannerInput" + index}
                          className="flex flex-row bg-dayBreakBlue50 justify-between items-center rounded-md p-2 cursor-pointer"
                        >
                          <img src={Images.upload} className="w-5 h-5 mr-2" />
                          <BaseText
                            locale
                            bold
                            className="text-dayBreakBlue500"
                          >
                            Upload
                          </BaseText>
                        </label>
                      </div>
                    </div>
                    <img
                      src={item.thumbnail}
                      className="w-full h-[128px] mt-4 object-cover rounded-xl"
                    />
                    <div className="flex flex-row justify-between items-center mt-4">
                      <BaseText locale medium>
                        Link to
                      </BaseText>
                      <BaseInput
                        key={Date.now() + index}
                        styleInputContainer="h-9"
                        onSave={(value) => {
                          updateBanner({
                            ...item,
                            url: value,
                          });
                        }}
                        onBlur={(value) => {
                          updateBanner({
                            ...item,
                            url: value,
                          });
                        }}
                        defaultValue={item.url}
                        placeholder="Enter Link"
                        className="w-[170px]"
                      />
                    </div>
                    <CustomButton
                      onClick={() => deleteBanner(item.id || "")}
                      className="my-4 bg-dustRed50 border-none w-full"
                      classNameTitle="text-dustRed500"
                      medium
                      locale
                    >
                      Delete
                    </CustomButton>
                  </div>
                );
              })}
            </div>
          </>
        ),
        [banners]
      )}
    </>
  );
};

const NavigationBar = () => {
  const [navbars, setNavbar] = useState<Array<NavBarInterface>>([]);
  const { setLastRefresh } = useBulletinState((state) => state);
  const { t } = useTranslation();

  const getNavBars = async () => {
    try {
      const data = await NavBarApi.getList();
      setNavbar(data);
    } catch (error) {}
  };

  useEffect(() => {
    getNavBars();
  }, []);

  const createNavBar = async () => {
    try {
      await NavBarApi.createNavbar({});
      setLastRefresh(Date.now());
      getNavBars();
    } catch (error) {
      showError(error);
    }
  };

  const updateNav = async (item: NavBarInterface) => {
    try {
      await NavBarApi.updateNavbar(item.id || "", item);
      getNavBars();
      setLastRefresh(Date.now());
    } catch (error) {}
  };

  const deleteNav = async (id: string) => {
    try {
      await NavBarApi.deleteNavbar(id);
      setLastRefresh(Date.now());
      getNavBars();
    } catch (error) {
      showError(error);
    }
  };

  const handleImageChange = async (
    isActiveIcon: boolean,
    e: React.ChangeEvent<HTMLInputElement>,
    item: NavBarInterface
  ) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const respon = await UploadApi.uploadImage(file);
        updateNav({
          ...item,
          image_inactive: isActiveIcon ? item.image_inactive : respon.url,
          image_active: isActiveIcon ? respon.url : item.image_active,
        });
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      {useMemo(
        () => (
          <div>
            <div className="flex flex-row justify-between mt-4">
              <BaseText locale bold className="mb-4">
                NAVIGATION BAR
              </BaseText>
              <img
                onClick={createNavBar}
                src={Images.plus}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <div>
              {navbars.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-row items-center">
                      <BaseText medium className="w-[92px]">
                        <BaseText locale>Label</BaseText> {index + 1}
                      </BaseText>
                      <BaseInput
                        key={Date.now() + index}
                        styleInputContainer="h-9"
                        onSave={(value) => {
                          updateNav({
                            ...item,
                            name: value,
                          });
                        }}
                        onBlur={(value) => {
                          updateNav({
                            ...item,
                            name: value,
                          });
                        }}
                        defaultValue={item.name}
                        placeholder="Enter Label"
                        className="flex-1 "
                      />
                    </div>
                    <div className="flex flex-row mt-2">
                      <div className="w-[92px]"></div>
                      <BaseInputSelect
                        className="flex-1"
                        onChange={(value) => {
                          updateNav({
                            ...item,
                            type: value,
                          });
                        }}
                        defaultValue={item.type}
                        required={true}
                        allowClear={false}
                        size="middle"
                        textInputSize={12}
                        placeholder="Select"
                        options={Object.values(NAVBAR).map((item) => {
                          return {
                            label: t(item),
                            value: item,
                          };
                        })}
                      />
                    </div>
                    <div className="flex flex-row mt-2">
                      <div className="w-[92px]"></div>
                      <div className="flex flex-row flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          id={"Inactive icon" + index}
                          style={{ display: "none" }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleImageChange(false, e, item);
                          }}
                        />
                        <label
                          htmlFor={"Inactive icon" + index}
                          className="w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer"
                        >
                          {item.image_inactive ? (
                            <img
                              src={item.image_inactive}
                              className="object-contain w-[86px] h-[86px]"
                            />
                          ) : (
                            <>
                              <img src={Images.upload} className="w-5 h-5" />
                              <BaseText size={12}>
                                {t("Inactive icon")}
                              </BaseText>
                            </>
                          )}
                        </label>
                      </div>
                      <div className="flex flex-row flex-1 ml-2">
                        <input
                          type="file"
                          accept="image/*"
                          id={"active icon" + index}
                          style={{ display: "none" }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleImageChange(true, e, item);
                          }}
                        />
                        <label
                          htmlFor={"active icon" + index}
                          className="w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer"
                        >
                          {item.image_active ? (
                            <img
                              src={item.image_active}
                              className="object-contain w-[86px] h-[86px]"
                            />
                          ) : (
                            <>
                              <img src={Images.upload} className="w-5 h-5" />
                              <BaseText size={12}>{t("Active icon")}</BaseText>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    <CustomButton
                      onClick={() => deleteNav(item.id || "")}
                      className="my-4 bg-dustRed50 border-none w-full"
                      classNameTitle="text-dustRed500"
                      medium
                      locale
                    >
                      Delete
                    </CustomButton>
                  </div>
                );
              })}
            </div>
          </div>
        ),
        [navbars, t]
      )}
    </>
  );
};
