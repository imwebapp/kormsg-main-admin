import { DatePicker, Switch, TimePicker, message } from 'antd';
import { BaseText, CustomButton } from '../../../components';
import Images from '../../../assets/gen';
import { BaseInput } from '../../../components/input/BaseInput';
import { BaseInputSelect } from '../../../components/input/BaseInputSelect';
import { useEffect, useMemo, useState } from 'react';
import { BannerInterface } from '../../../entities/banner.entity';
import { NAVBAR, SELECT_ALL } from '../../../utils/constants';
import { AdminSettingInterface } from '../../../entities/adminsetting.entity';
import { useBulletinState } from '../store';
import { UploadApi } from '../../../apis/uploadApi';
import { HomeSettingApi } from '../../../apis/homeSettingApi';
import { NavBarApi } from '../../../apis/navbarApi';
import { NavBarInterface } from '../../../entities/navbar.entity';
import { showError } from '../../../utils/showToast';
import { useTranslation } from 'react-i18next';
import { BoardLinkApi } from '../../../apis/boardLinkApi';
import { BoardLinkInterface } from '../../../entities';
import moment from 'moment';
import { useLocalStorage } from '../../../stores/localStorage';
import dayjs from 'dayjs';
import { ThemaApi } from '../../../apis/themaApi';

export default function HomeSetting() {
  return (
    <div className='flex flex-col'>
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
  const { setLastRefresh, lastRefresh } = useBulletinState((state) => state);
  const [startTime, setStartTime] = useState<any>('00:00');
  const [endTime, setEndTime] = useState<any>('00:00');
  const { locale } = useLocalStorage((state) => state);
  const [links, setLinks] = useState<BoardLinkInterface[]>([]);
  const { t } = useTranslation();
  const [themaAdults, setthemaAdults] = useState<string[]>([]);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const _getBoardLinks = async () => {
    try {
      const respon = await BoardLinkApi.getList();
      console.log('respon', respon);
      const themaAdults = respon
        .filter((item: BoardLinkInterface) => !!item.thema?.is_for_adults)
        .map((item: BoardLinkInterface) => item.thema_id);
      if (respon[0]) {
        setStartTime(respon[0].thema.start_time.slice(0, 5));
        setEndTime(respon[0].thema.end_time.slice(0, 5));
      }
      setthemaAdults(themaAdults);
      setLinks(respon);
    } catch (error) {}
  };

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
    _getBoardLinks();
  }, [lastRefresh]);

  const setThemaAdults = async (value: any) => {
    try {
      await Promise.all(
        links.map(async (item: BoardLinkInterface) => {
          if (value.includes(item.thema_id || '')) {
            await ThemaApi.updateThema(item.thema_id ?? '', {
              is_for_adults: true,
            });
          } else {
            await ThemaApi.updateThema(item.thema_id ?? '', {
              is_for_adults: false,
            });
          }
        })
      );
    } catch (error) {
      showError(error);
    }
  };

  const setThemaAdultsTime = async () => {
    try {
      await Promise.all(
        links.map(async (item: BoardLinkInterface) => {
          await ThemaApi.updateThema(item.thema_id ?? '', {
            start_time: startTime,
            end_time: endTime,
          });
        })
      );
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!isFirstLoad) setThemaAdultsTime();
  }, [startTime, endTime]);

  return (
    <>
      <BaseText locale bold size={16} className='mb-4'>
        Things
      </BaseText>
      <BaseText locale medium className='mb-4'>
        Adult certification
      </BaseText>
      <div className='flex flex-row justify-between'>
        <BaseText locale medium className='mb-4'>
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
      <div className='w-full h-11 gap-x-2 border rounded-lg flex flex-row justify-center items-center'>
        <label htmlFor='select-start-time' className='cursor-pointer relative'>
          <BaseText bold size={16}>
            {startTime}
          </BaseText>
          <TimePicker
            id='select-start-time'
            className='absolute opacity-0 top-0 right-0'
            defaultValue={dayjs(startTime, 'HH:mm')}
            format={'HH:mm'}
            onChange={(time: any, timeString: any) => {
              if (typeof timeString == 'string' && timeString.length > 0)
                setStartTime(timeString);
            }}
          />
        </label>
        <BaseText bold size={16} className='text-darkNight200'>
          ~
        </BaseText>
        <label htmlFor='select-end-time' className='cursor-pointer relative'>
          <BaseText bold size={16}>
            {endTime}
          </BaseText>
          <TimePicker
            id='select-end-time'
            className='absolute opacity-0 top-0 left-0'
            defaultValue={dayjs(endTime, 'HH:mm')}
            format={'HH:mm'}
            onChange={(time: any, timeString: any) => {
              console.log('timeString', timeString);
              if (typeof timeString == 'string' && timeString.length > 0)
                setEndTime(timeString);
            }}
          />
        </label>
      </div>
      <BaseInputSelect
        multiple
        className='mt-4'
        onChange={setThemaAdults}
        defaultValue={themaAdults}
        required={true}
        allowClear={false}
        size='large'
        textInputSize={12}
        placeholder='Select'
        options={[
          { label: t('All Page'), value: SELECT_ALL },
          ...links.map((item: BoardLinkInterface, index) => {
            return {
              label: item.name,
              value: item.thema_id || '',
            };
          }),
        ]}
      />
      <div className='h-[1px] bg-darkNight100 mt-4'></div>
      <div className='flex flex-row justify-between mt-4'>
        <BaseText locale medium className='mb-4'>
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
      await HomeSettingApi.updateBanner(item.id || '', item);
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
        thumbnail: '',
        url: '',
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
            <div className='h-[1px] bg-darkNight100'></div>
            <div className='flex flex-row justify-between mt-4'>
              <BaseText locale bold className='mb-4'>
                Banner
              </BaseText>
              <img
                onClick={createBanner}
                src={Images.plus}
                className='w-6 h-6 cursor-pointer'
              />
            </div>
            <div className='flex flex-col'>
              {banners.map((item, index) => {
                return (
                  <div key={index}>
                    <div className='flex flex-row items-center justify-between'>
                      <BaseText medium>
                        <BaseText locale>Banner</BaseText> {index + 1}
                      </BaseText>
                      <div>
                        <input
                          type='file'
                          accept='image/*'
                          id={'bannerInput' + index}
                          style={{ display: 'none' }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleImageChange(e, item);
                          }}
                        />
                        <label
                          htmlFor={'bannerInput' + index}
                          className='flex flex-row bg-dayBreakBlue50 justify-between items-center rounded-md p-2 cursor-pointer'
                        >
                          <img src={Images.upload} className='w-5 h-5 mr-2' />
                          <BaseText
                            locale
                            bold
                            className='text-dayBreakBlue500'
                          >
                            Upload
                          </BaseText>
                        </label>
                      </div>
                    </div>
                    <img
                      src={item.thumbnail}
                      className='w-full h-[128px] mt-4 object-cover rounded-xl'
                    />
                    <div className='flex flex-row justify-between items-center mt-4'>
                      <BaseText locale medium>
                        Link to
                      </BaseText>
                      <BaseInput
                        key={Date.now() + index}
                        styleInputContainer='h-9'
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
                        placeholder='Enter Link'
                        className='w-[170px]'
                      />
                    </div>
                    <CustomButton
                      onClick={() => deleteBanner(item.id || '')}
                      className='my-4 bg-dustRed50 border-none w-full'
                      classNameTitle='text-dustRed500'
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

interface NavBarType {
  name: string;
  route?: string;
  thema_id?: string;
}
const NavigationBar = () => {
  const [navbars, setNavbar] = useState<Array<NavBarInterface>>([]);
  const [navbarType, setNavbarType] = useState<NavBarType[]>([]);
  const { setLastRefresh, lastRefresh } = useBulletinState((state) => state);
  const { t } = useTranslation();

  const _getBoardLinks = async () => {
    try {
      const respon = await BoardLinkApi.getList();
      const data = [
        ...Object.values(NAVBAR).map((item) => {
          return { name: item };
        }),
        ...respon.map((item: BoardLinkInterface) => {
          return {
            name: item.name,
            route: item.route,
            thema_id: item.thema_id,
          };
        }),
      ];
      setNavbarType(data);
    } catch (error) {}
  };

  useEffect(() => {
    _getBoardLinks();
  }, [lastRefresh]);

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
      await NavBarApi.updateNavbar(item.id || '', item);
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

  const getValue = (item: NavBarInterface) => {
    if (navbarType[0]) {
      const index = navbarType
        .map((item) => JSON.stringify(item))
        .indexOf(item.type || '');
      return index >= 0 ? index : null;
    }
    return;
  };

  return (
    <>
      {useMemo(
        () => (
          <div>
            <div className='flex flex-row justify-between mt-4'>
              <BaseText locale bold className='mb-4'>
                NAVIGATION BAR
              </BaseText>
              <img
                onClick={createNavBar}
                src={Images.plus}
                className='w-6 h-6 cursor-pointer'
              />
            </div>
            <div>
              {navbars.map((item, index) => {
                return (
                  <div key={index} className='flex flex-col'>
                    <div className='flex flex-row items-center'>
                      <BaseText medium className='w-[92px]'>
                        <BaseText locale>Label</BaseText> {index + 1}
                      </BaseText>
                      <BaseInput
                        key={Date.now() + index}
                        styleInputContainer='h-9'
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
                        placeholder='Enter Label'
                        className='flex-1 '
                      />
                    </div>
                    <div className='flex flex-row mt-2'>
                      <div className='w-[92px]'></div>
                      <BaseInputSelect
                        className='flex-1'
                        onChange={(value) => {
                          updateNav({
                            ...item,
                            type: JSON.stringify(navbarType[value]),
                          });
                        }}
                        defaultValue={getValue(item)}
                        required={true}
                        allowClear={false}
                        size='middle'
                        textInputSize={12}
                        placeholder='Select'
                        options={(navbarType || []).map(
                          (item: NavBarType, index: number) => {
                            return {
                              label: t(item.name),
                              value: index,
                            };
                          }
                        )}
                      />
                    </div>
                    <div className='flex flex-row mt-2'>
                      <div className='w-[92px]'></div>
                      <div className='flex flex-row flex-1'>
                        <input
                          type='file'
                          accept='image/*'
                          id={'Inactive icon' + index}
                          style={{ display: 'none' }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleImageChange(false, e, item);
                          }}
                        />
                        <label
                          htmlFor={'Inactive icon' + index}
                          className='w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer'
                        >
                          {item.image_inactive ? (
                            <img
                              src={item.image_inactive}
                              className='object-contain w-[86px] h-[86px]'
                            />
                          ) : (
                            <>
                              <img src={Images.upload} className='w-5 h-5' />
                              <BaseText size={12}>
                                {t('Inactive icon')}
                              </BaseText>
                            </>
                          )}
                        </label>
                      </div>
                      <div className='flex flex-row flex-1 ml-2'>
                        <input
                          type='file'
                          accept='image/*'
                          id={'active icon' + index}
                          style={{ display: 'none' }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleImageChange(true, e, item);
                          }}
                        />
                        <label
                          htmlFor={'active icon' + index}
                          className='w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer'
                        >
                          {item.image_active ? (
                            <img
                              src={item.image_active}
                              className='object-contain w-[86px] h-[86px]'
                            />
                          ) : (
                            <>
                              <img src={Images.upload} className='w-5 h-5' />
                              <BaseText size={12}>{t('Active icon')}</BaseText>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    <CustomButton
                      onClick={() => deleteNav(item.id || '')}
                      className='my-4 bg-dustRed50 border-none w-full'
                      classNameTitle='text-dustRed500'
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
        [navbars, t, navbarType]
      )}
    </>
  );
};
