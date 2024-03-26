import { Switch, message } from "antd";
import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { useEffect, useState } from "react";
import { BannerInterface } from "../../../entities/banner.entity";
import { NAVBAR } from "../../../utils/constants";
import { AdminSettingInterface } from "../../../entities/adminsetting.entity";
import { useBulletinState } from "../store";
import { UploadApi } from "../../../apis/uploadApi";
import { HomeSettingApi } from "../../../apis/homeSettingApi";
import { NavBarApi } from "../../../apis/navbarApi";
import { NavBarInterface } from "../../../entities/navbar.entity";
import { showError } from "../../../utils/showToast";

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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleImageChange(e, item);
                    }}
                  />
                  <label
                    htmlFor={"bannerInput" + index}
                    className="flex flex-row bg-dayBreakBlue50 justify-between items-center rounded-md p-2 cursor-pointer"
                  >
                    <img src={Images.upload} className="w-5 h-5 mr-2" />
                    <BaseText locale bold className="text-dayBreakBlue500">
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
                    console.log("value ", value);
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
  );
};

const NavigationBar = () => {
  const [navbars, setNavbar] = useState<Array<NavBarInterface>>([]);
  const { setLastRefresh } = useBulletinState((state) => state);

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

  const deleteBanner = async (id: string) => {
    try {
      await NavBarApi.deleteNavbar(id);
      setLastRefresh(Date.now());
      getNavBars();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
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
                  styleInputContainer="h-9"
                  onChange={() => {}}
                  value=""
                  placeholder="Enter Label"
                  className="flex-1 "
                />
              </div>
              <div className="flex flex-row mt-2">
                <div className="w-[92px]"></div>
                <BaseInputSelect
                  className="flex-1"
                  onChange={() => {}}
                  required={true}
                  allowClear={false}
                  size="middle"
                  textInputSize={12}
                  value="Home"
                  options={[
                    {
                      value: "Home",
                      label: "Home",
                    },
                    {
                      value: "Shop",
                      label: "Shop",
                    },
                    {
                      value: "Common",
                      label: "Common",
                    },
                    {
                      value: "Profile",
                      label: "Profile",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-row mt-2">
                <div className="w-[92px]"></div>
                <div className="flex flex-row flex-1">
                  <div className="w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer">
                    <img src={Images.upload} className="w-5 h-5" />
                    <BaseText size={12}>Inactive icon</BaseText>
                  </div>
                </div>
                <div className="flex flex-row flex-1 ml-2">
                  <div className="w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer">
                    <img src={Images.upload} className="w-5 h-5" />
                    <BaseText size={12}>Active icon</BaseText>
                  </div>
                </div>
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
  );
};
