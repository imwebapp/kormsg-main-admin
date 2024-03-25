import { useNavigate } from "react-router-dom";
import { CustomButton, StoreListTable } from "../../components";
import { Url } from "../../routers/paths";

const StorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <CustomButton
        onClick={() => navigate(Url.newStore)}
      >
        Create Store
      </CustomButton>
      <StoreListTable />
    </div>
  );
};

export default StorePage;
