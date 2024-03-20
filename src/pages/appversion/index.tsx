import { useEffect, useState } from "react";
import Images from "../../assets/gen";
import { BaseText } from "../../components";
import { appVersionApi } from "../../apis/appVersionApi";
import { Input } from "antd";

export default function AppVersion() {
  const [androidVersion, setAndroidVersion] = useState("");
  const [iosVersion, setIosVersion] = useState("");
  const getVersion = async () => {
    try {
      let result: any = await appVersionApi.getVersion();

      if (result.code === 200) {
        setAndroidVersion(result.results.object.android);
        setIosVersion(result.results.object.ios);
      }
    } catch (error) {}
  };
  const [valueAndroidVersion, setValueAndroidVersion] = useState("");
  const [valueIOSVersion, setValueIOSVersion] = useState("");
  const updateVersion = async ({ android, ios }: any) => {
    try {
      const params: { android?: any; ios?: any } = {};

      if (android !== undefined) {
        params.android = android;
      }

      if (ios !== undefined) {
        params.ios = ios;
      }

      let result: any = await appVersionApi.updateVersion(params);
      if (result.code === 200) {
        setAndroidVersion(result.results.object.android);
        setIosVersion(result.results.object.ios);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getVersion();
  }, []);

  return (
    <div className="self-stretch px-6 py-8">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-8 py-11 rounded-xl border border-gray-200 border-solid leading-[150%] max-md:px-4 max-md:mt-8 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto text-xl font-bold text-neutral-900">
                Android Version
              </div>
              <div className="flex flex-1 gap-2 my-auto text-base">
                <div className="grow text-neutral-600">Current version:</div>
                <div className="font-bold text-neutral-900">
                  {androidVersion}
                </div>
              </div>
            </div>
            <BaseText className="mt-6 text-base font-medium text-neutral-900 max-md:max-w-full">
              Version to modify:
            </BaseText>
            <div className="flex gap-3 mt-2 text-base text-zinc-400 max-md:flex-wrap">
              <div className="flex flex-auto gap-2 px-4 py-3 bg-white rounded-xl border border-solid border-[#d0d0d0]">
                <img
                  loading="lazy"
                  src={Images.android2}
                  className="shrink-0 w-6 aspect-square"
                />
                <Input
                  variant="borderless"
                  onChange={(e) => setValueAndroidVersion(e.target.value)}
                />
              </div>
              <button
                className="justify-center px-6 py-3 font-medium whitespace-nowrap rounded-xl bg-neutral-100 max-md:px-5 hover:bg-blue-700 hover:text-white"
                onClick={() => {
                  if (valueAndroidVersion) {
                    if (valueAndroidVersion) {
                      updateVersion({
                        android: valueAndroidVersion,
                      });
                    }
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-8 py-11 rounded-xl border border-gray-200 border-solid leading-[150%] max-md:px-5 max-md:mt-8 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto text-xl font-bold text-neutral-900">
                IOS Version
              </div>
              <div className="flex flex-1 gap-2 my-auto text-base">
                <div className="grow text-neutral-600">Current version:</div>
                <div className="font-bold text-neutral-900">{iosVersion}</div>
              </div>
            </div>
            <BaseText className="mt-6 text-base font-medium text-neutral-900 max-md:max-w-full">
              Version to modify:
            </BaseText>
            <div className="flex gap-3 mt-2 text-base text-zinc-400 max-md:flex-wrap">
              <div className="flex flex-auto gap-2 px-4 py-3 bg-white rounded-xl border border-solid border-stone-300">
                <img
                  loading="lazy"
                  src={Images.iphone2}
                  className="shrink-0 w-6 aspect-square"
                />
                <Input
                  variant="borderless"
                  onChange={(e) => setValueIOSVersion(e.target.value)}
                />
              </div>
              <button
                className="justify-center px-6 py-3 font-medium whitespace-nowrap rounded-xl bg-neutral-100 max-md:px-5 hover:bg-blue-700 hover:text-white"
                onClick={() => {
                  if (valueIOSVersion) {
                    updateVersion({ ios: valueIOSVersion });
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
