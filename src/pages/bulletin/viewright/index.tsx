import { useBulletinState } from "../store";
import BulletinSetting from "./board_link_setting";
import HomeSetting from "./home_setting";

export default function BulletinRight() {
  const { boardSelected } = useBulletinState((state) => state);

  return (
    <div className="w-[320px] border-l p-6 max-h-full overflow-auto no-scrollbar">
      {boardSelected.id === "HOME" ? <HomeSetting /> : <BulletinSetting/>}
    </div>
  );
}
