import { useState } from "react";
import { BaseText, CustomButton } from "../../components";
import { BaseInput } from "../../components/input/BaseInput";
import axiosClient from "../../apis/axiosClient";
import { authApi } from "../../apis/authApi";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { useLocalStorage } from "../../stores/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useLocalStorage((state) => state);
  const [username, setUsername] = useState("adminj");
  const [password, setPassword] = useState("c9b3109c85263c46320c635bd3548f1e");
  const handleLogin = () => {
    console.log('loginnnnnn: ', username, password);
    const param = { username, password }
    authApi.login(param).then((res) => {
      console.log('resLOGIN: ', res.results.token);
      setAccessToken(String(res.results?.token))
      navigate(Url.dashboard)
    }).catch((err) => {
      console.log('err: ', err);
    });
  };
  return (
    <>
      <BaseText bold size={30} className="text-red-500">
        login
      </BaseText>
      <BaseInput
        placeholder="username"
        type="text"
        className="w-1/2"
        onChange={(value) => { setUsername(value) }}
        value={username}
      />
      <BaseInput
        placeholder="password"
        type="text"
        className="w-1/2"
        onChange={(value) => { setPassword('b832596dc55133cc7272754b18bbfc22') }}
        value={password}
      />
      <CustomButton onClick={handleLogin} className="w-1/2">
        login
      </CustomButton>
    </>
  );
};

export default Login;
