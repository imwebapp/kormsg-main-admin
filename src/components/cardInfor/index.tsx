import { useNavigate } from "react-router-dom";
import BaseText from "../text";
import { Url } from "../../routers/paths";

const CardInfor = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('accessToken');
    navigate(Url.login);
  };
  return (
    <div onClick={handleLogout} className="cursor-pointer">
      <BaseText locale medium>Logout</BaseText>
    </div>
  )
};

export default CardInfor;
