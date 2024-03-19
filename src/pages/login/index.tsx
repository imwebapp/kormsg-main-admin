import { useState } from "react";
import { BaseText, CustomButton } from "../../components";
import { BaseInput } from "../../components/input/BaseInput";
import axiosClient from "../../apis/axiosClient";
import { authApi } from "../../apis/authApi";
import { setTokens } from "../../utils/setToken";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("master");
  const [password, setPassword] = useState("b832596dc55133cc7272754b18bbfc22");
  const handleLogin = () => {
    console.log('loginnnnnn: ', username, password);
    authApi.login({ username, password }).then((res) => {
      console.log('resLOGIN: ', res.results);
      setTokens(res.results)
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
