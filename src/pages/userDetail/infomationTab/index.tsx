
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/common";
import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";

interface Iprops {
  dataUser: {
    id: string,
    avatar: string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    birthday: string,
    type: string,
    groupName: string,
    countShop: number,
    paymentInfo: string
  };
}

export const InformationTab = (prop: Iprops) => {
  const { dataUser } = prop;
  const navigate = useNavigate();

  return (
    <>
      <div className={classNames('flex item-center py-11 px-2 justify-center h-full')}>
        <div className={classNames('flex flex-col gap-7 p-8 border border-darkNight100 h-fit rounded-lg w-1/2')}>
          <div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                User name
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.fullName}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                ID Account
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.email}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                User Type
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.type}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Shop registration
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.countShop}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Payment information
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.paymentInfo}
              </BaseText>
            </div>
          </div>
          <div className={classNames('flex flex-col gap-3')}>
            <CustomButton
              locale
              onClick={() => console.log('Change password')}
              icon={<img src={Images.logo} className={classNames('w-6 h-6')} />}
              className="text-dayBreakBlue500 border-dayBreakBlue500"
              children="Change password"
            />
            <CustomButton
              locale
              onClick={() => console.log('Edit information')}
              icon={<img src={Images.logo} className={classNames('w-6 h-6')} />}
              className="border-none text-dayBreakBlue500 bg-dayBreakBlue50 hover:bg-dayBreakBlue500 hover:text-white"
              children="Edit information"
            />
          </div>
        </div>
      </div>
    </>
  )
};