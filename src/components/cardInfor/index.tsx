import { useNavigate } from "react-router-dom";
import BaseText from "../text";
import { Url } from "../../routers/paths";
import { useLocalStorage } from "../../stores/localStorage";

const CardInfor = () => {
  const navigate = useNavigate();
  const { setRefreshToken, setAccessToken, setExpiresIn } = useLocalStorage((state) => state);
  const handleLogout = () => {
    console.log('logout');
    setAccessToken("");
    setRefreshToken("");
    setExpiresIn(0);
    window.location.reload();
  };
  return (
    <div onClick={handleLogout} className="cursor-pointer">
      <BaseText locale medium>Logout</BaseText>
    </div>
  )
};

export default CardInfor;
