import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../apis/authApi";
import { setTokens } from "../../apis/axiosClient";
import { BaseText, CustomButton } from "../../components";
import { Url } from "../../routers/paths";
import { useLocalStorage } from "../../stores/localStorage";
import { BASE_URL, IS_TEST, ListCountries } from "../../utils/constants";
import ReactFlagsSelect from "react-flags-select";
import Images from "../../assets/gen";
import BaseButton from "../../components/baseButton";
import OtpInput from "react-otp-input";
import { BaseInput } from "../../components/input/BaseInput";
import { App, Layout, Space, Spin } from "antd";
import { classNames, formatPhoneNumber } from "../../utils/common";
import { set } from "lodash";
import { useCommonState } from "../../stores/commonStorage";
import { showError, showSuccess } from "../../utils/showToast";
import md5 from "md5";

const BgList = [
  Images.bgLogin1,
  Images.bgLogin2,
  Images.bgLogin3,
  Images.bgLogin4,
  Images.bgLogin5,
];
const getRandomBg = () => {
  const randomIndex = Math.floor(Math.random() * BgList.length);
  return BgList[randomIndex];
};

const Login = () => {
  const navigate = useNavigate();
  // const { message } = App.useApp();
  const { accessToken, setAccessToken } = useLocalStorage((state) => state);
  const { setLoading } = useCommonState((state) => state);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [bg, setBg] = useState(getRandomBg());
  // const [phone, setPhone] = useState("");
  // const [dialCode, setDialCode] = useState("+82");
  // const [selected, setSelected] = useState("KR");

  // const [timer, setTimer] = useState(60);
  // const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [isErrorOtp, setIsErrorOtp] = useState(false);

  // const isServerTest = BASE_URL?.includes(IS_TEST || "server-dev");

  // const handleChangeOtp = (otp: string) => {
  //   setOtp(otp);
  // };

  // const customLabels = ListCountries.reduce((acc: any, item) => {
  //   acc[item.code] = {
  //     primary: item.name,
  //     secondary: item.dial_code,
  //   };
  //   return acc;
  // }, {});

  // const sendOtp = async () => {
  //   try {
  //     const cleanedPhoneNumber = formatPhoneNumber(phone);
  //     setLoadingScreen(true);
  //     const data = {
  //       phone: dialCode + cleanedPhoneNumber,
  //     };
  //     const resSendOtp: any = await authApi.sendOtp(data);

  //     if (resSendOtp.code === 200) {
  //       setLoadingScreen(false);

  //       setIsVerifyOtp(true);
  //       startTimer();
  //     }
  //   } catch (error: any) {
  //     console.log("Error sending OTP:", error);
  //     setLoadingScreen(false);
  //     if (error?.response?.data?.message === "Record Not Found") {
  //       message.error("Phone number Not Found");
  //     }
  //   }
  // };

  // const startTimer = () => {
  //   setTimer(60);
  //   const intervalId = setInterval(() => {
  //     setTimer((prevTime) => prevTime - 1);
  //   }, 1000);

  //   setTimeout(() => {
  //     clearInterval(intervalId);
  //   }, 60000);
  // };

  // const handleResendOtp = () => {
  //   sendOtp();
  // };

  // const handleLogin = async () => {
  //   try {
  //     const cleanedPhoneNumber = formatPhoneNumber(phone);
  //     setLoadingScreen(true);
  //     const data = {
  //       phone: dialCode + cleanedPhoneNumber,
  //       otp,
  //     };
  //     const resVerify: any = await authApi.verifyOtp(data);
  //     if (resVerify?.code === 200) {
  //       message.success("login successfully");
  //       setAccessToken(resVerify?.results?.token);
  //       setTokens();
  //       setLoadingScreen(false);
  //       navigate(Url.dashboard);
  //     }
  //   } catch (error: any) {
  //     console.log("Error verify OTP:", error);
  //     if (error?.response?.data?.message === "Code Error") {
  //       setIsErrorOtp(true);
  //     } else {
  //       setIsErrorOtp(false);
  //     }
  //     setLoadingScreen(false);
  //     message.error(error?.response?.data?.message || "Error verify OTP");
  //   }
  // };

  const handleLoginIdPass = async () => {
    try {
      setLoading(true);
      const param = {
        username: username.trim(),
        password: md5(password.trim()),
      };
      const resLoginTest: any = await authApi.login(param);

      if (resLoginTest?.code === 200) {
        setAccessToken(resLoginTest?.results?.token);
        setTokens();
        navigate(Url.dashboard);
        showSuccess("login successfully");
      }
    } catch (error) {
      console.log("Error verify OTP:", error);
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (timer === 0) {
  //     clearInterval(timer);
  //   }
  // }, [timer]);

  return (
    <div className="flex h-screen bg-white ">
      <div className="relative w-1/3 bg-red-100">
        <img src={bg} className="w-full h-full" />
      </div>
      <div className="flex items-center justify-center w-2/3">
        {/* {isVerifyOtp ? (
          <div className="w-2/3 bg-white rounded-lg p-11 drop-shadow-lg">
            <BaseText bold size={30}>
              SMS verification code
            </BaseText>
            <div className="flex flex-col gap-3 mt-8 mb-6">
              <BaseText medium size={16}>
                Please enter the 6-digit code we texted to your phone number
              </BaseText>
              <BaseText bold size={16}>
                {dialCode} {formatPhoneNumber(phone)}
              </BaseText>
            </div>
            <OtpInput
              value={otp}
              onChange={handleChangeOtp}
              numInputs={6}
              // renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={classNames("px-2 text-5xl rounded-lg border border-gray-300 bg-darkNight50 text-center", isErrorOtp ? 'border-red-500' : '')}
              containerStyle="flex justify-center gap-3 rounded-lg p-4"
            />
            {
              timer > 0 ? (
                <BaseText medium size={16} className="flex flex-row-reverse">
                  {timer}
                </BaseText>
              ) : (
                <div className="cursor-pointer" onClick={handleResendOtp}>
                  <BaseText bold size={16} className="flex flex-row-reverse cursor-pointer" color="text-primary">
                    Resend code
                  </BaseText>
                </div>
              )
            }

            <BaseButton onClick={handleLogin} className="w-full mt-6" disabled={!(otp.length === 6)}>
              <BaseText bold size={16} className="text-white">
                Confirm
              </BaseText>
            </BaseButton>
          </div>
        ) : (
          <div className="w-2/3 bg-white rounded-lg p-11 drop-shadow-lg">
            <BaseText bold size={30}>
              Login to Admin page
            </BaseText>
            <div className="flex gap-3 mt-8">
              <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => {
                  setSelected(code);
                  const selectedCountry = ListCountries.find(country => country.code === code);
                  if (selectedCountry) {
                    setDialCode(selectedCountry.dial_code);
                  }
                }}
                customLabels={{
                  ...customLabels
                }}
                // showSelectedLabel={false}
                showSecondarySelectedLabel={true}
                searchPlaceholder="Search..."
                searchable={true}
                className="w-full h-11 bg-darkNight50"
              />
              <BaseInput
                placeholder="Phone number"
                className="w-full border border-gray-300 rounded-md"
                styleInputContainer="w-full h-11"
                onChange={(value) => { setPhone(value) }}
                value={phone}
                type="number"
              />
            </div>
            <div className="flex items-center gap-2 p-4 mt-6 border rounded-lg">
              <img src={Images.infoIcon} className="w-8 h-8" />
              <BaseText medium size={14}>
                The account will automatically log out after 15 minutes of inactivity
              </BaseText>
            </div>
            <BaseButton onClick={sendOtp} className="w-full mt-6" disabled={!phone}>
              <BaseText bold size={16} className="text-white">
                Continue
              </BaseText>
            </BaseButton>
            {isServerTest &&
              <BaseButton onClick={handleLoginTest} className="w-full mt-6">
                <BaseText bold size={16} className="text-white">
                  TEST
                </BaseText>
              </BaseButton>
            }
          </div>)} */}

        <div className="w-2/3 bg-white rounded-lg p-11 drop-shadow-lg">
          <BaseText locale bold size={30}>
            Administrator page login
          </BaseText>
          <div className="flex mt-8 flex-col">
            <div className="flex flex-row gap-3">
              <div className="bg-darkNight50 w-[56px] h-[60px] flex justify-center items-center rounded-lg">
                <BaseText bold size={20}>
                  ID
                </BaseText>
              </div>
              <BaseInput
                placeholder="Please enter your ID"
                className="w-full border border-gray-300 rounded-md"
                styleInputContainer="w-full h-[60px]"
                onChange={(value) => {
                  setUsername(value);
                }}
                value={username}
              />
            </div>
            <div className="flex flex-row gap-3 mt-6">
              <div className="bg-darkNight50 w-[56px] h-[60px] flex justify-center items-center rounded-lg">
                <BaseText bold size={20}>
                  PW
                </BaseText>
              </div>
              <BaseInput
                placeholder="Please enter your password"
                className="w-full border border-gray-300 rounded-md"
                styleInputContainer="w-full h-[60px]"
                onChange={(value) => {
                  setPassword(value);
                }}
                value={password}
              />
            </div>
          </div>
          <BaseButton
            onClick={handleLoginIdPass}
            className="w-full mt-6"
            disabled={password.length === 0 || username.length === 0}
          >
            <BaseText locale bold size={16} className="text-white">
              Continue
            </BaseText>
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
