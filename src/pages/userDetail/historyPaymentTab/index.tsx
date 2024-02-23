
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/common";

export const UserDetail = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={classNames('flex overflow-hidden')} style={{ height: 'calc(100vh - 71px)' }}>
        <div className={classNames('w-1/5 border-r border-darkNight100 p-6')}>

        </div>
        <div className={classNames('w-4/5 p-6 flex flex-col gap-6')} style={{ height: 'calc(100vh - 71px)' }}>

        </div>
      </div>

    </>
  )
};