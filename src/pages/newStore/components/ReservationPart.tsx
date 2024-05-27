import { BaseText, CustomButton } from '../../../components';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { classNames } from '../../../utils/common';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { BaseModal2 } from '../../../components/modal/BaseModal2';
import { LIST_BANKING } from '../../../utils/constants';
import { BaseInput } from '../../../components/input/BaseInput';

interface IProps {
  onSubmitBank?: (dataBank: {
    bankId: string;
    bankName: string;
    bankImage: string;
    bankNumber: string;
    bankUserName: string;
  }) => void;
  onChangeMeetAndCash?: (value: boolean) => void;
  onChangeMeetAndTransfer?: (value: boolean) => void;
  onChangeMeetAndCard?: (value: boolean) => void;
  dataMeetAndCash?: boolean;
  dataMeetAndTransfer?: boolean;
  dataMeetAndCard?: boolean;
  dataBanking?: {
    bankId: string;
    bankName: string;
    bankImage: string;
    bankNumber: string;
    bankUserName: string;
  };
}

export const ReservationPart = (props: IProps) => {
  const {
    dataBanking,
    dataMeetAndCash,
    dataMeetAndTransfer,
    dataMeetAndCard,
    onSubmitBank,
    onChangeMeetAndCash,
    onChangeMeetAndTransfer,
    onChangeMeetAndCard,
  } = props;

  const { t } = useTranslation();
  const [meetAndCash, setMeetAndCash] = useState(dataMeetAndCash);
  const [meetAndTransfer, setMeetAndTransfer] = useState(dataMeetAndTransfer);
  const [meetAndCard, setMeetAndCard] = useState(dataMeetAndCard);

  const [isShowModal, setIsShowModal] = useState(false);
  const [dataBank, setDataBank] = useState({
    bankId: '',
    bankName: '',
    bankImage: '',
    bankNumber: '',
    bankUserName: '',
  });

  const handleChangeMeetAndCash = () => {
    setMeetAndCash(!meetAndCash);
    onChangeMeetAndCash && onChangeMeetAndCash(!meetAndCash);
  };

  const handleChangeMeetAndTransfer = () => {
    setMeetAndTransfer(!meetAndTransfer);
    onChangeMeetAndTransfer && onChangeMeetAndTransfer(!meetAndTransfer);
  };

  const handleChangeMeetAndCard = () => {
    setMeetAndCard(!meetAndCard);
    onChangeMeetAndCard && onChangeMeetAndCard(!meetAndCard);
  };

  const handleSubmitModal = () => {
    onSubmitBank && onSubmitBank(dataBank);
    setIsShowModal(false);
    setDataBank({
      bankId: '',
      bankName: '',
      bankImage: '',
      bankNumber: '',
      bankUserName: '',
    });
  };

  useEffect(() => {
    if (!meetAndCash && !meetAndTransfer && !meetAndCard) {
      setMeetAndCash(true);
      onChangeMeetAndCash && onChangeMeetAndCash(true);
    }
    if (!meetAndTransfer) {
      onSubmitBank &&
        onSubmitBank({
          bankId: '',
          bankName: '',
          bankImage: '',
          bankNumber: '',
          bankUserName: '',
        });
      setDataBank({
        bankId: '',
        bankName: '',
        bankImage: '',
        bankNumber: '',
        bankUserName: '',
      });
    }
  }, [meetAndCash, meetAndTransfer, meetAndCard]);

  return (
    <>
      <div className='flex flex-col gap-2'>
        <BaseText locale size={16} bold>
          결제방법 선택
        </BaseText>
        <div className='flex flex-col gap-2'>
          <Checkbox checked={meetAndCash} onChange={handleChangeMeetAndCash}>
            <BaseText medium locale>
              만나서 현금결제
            </BaseText>
          </Checkbox>
          <Checkbox
            checked={meetAndTransfer}
            onChange={handleChangeMeetAndTransfer}
          >
            <BaseText medium locale>
              만나서 계좌이체
            </BaseText>
          </Checkbox>
          {meetAndTransfer && (
            <div
              className='flex justify-between p-3 rounded-lg bg-darkNight50'
              onClick={() => {
                setIsShowModal(true);
              }}
            >
              <div className='flex gap-2'>
                {dataBanking?.bankNumber && (
                  <img
                    src={dataBanking?.bankImage}
                    alt={dataBank?.bankName}
                    className='w-6 h-6'
                  />
                )}
                <BaseText
                  size={16}
                  className={classNames(
                    dataBanking?.bankUserName ? '' : 'text-darkNight300'
                  )}
                >
                  {dataBanking?.bankUserName || ''}
                </BaseText>
                <BaseText
                  size={16}
                  className={classNames(
                    dataBanking?.bankNumber ? '' : 'text-darkNight300'
                  )}
                >
                  {dataBanking?.bankNumber || t('은행선택')}
                </BaseText>
              </div>
              <DownOutlined />
            </div>
          )}
          <Checkbox checked={meetAndCard} onChange={handleChangeMeetAndCard}>
            <BaseText medium locale>
              만나서 카드결제
            </BaseText>
          </Checkbox>
        </div>
      </div>
      <BaseModal2
        isOpen={isShowModal}
        isHideAction={true}
        onClose={() => {
          setIsShowModal(false);
          setDataBank({
            bankId: '',
            bankName: '',
            bankImage: '',
            bankNumber: '',
            bankUserName: '',
          });
        }}
        title={
          dataBank?.bankId ? (
            <div className='flex gap-2'>
              <img
                src={dataBank?.bankImage}
                alt={dataBank?.bankName}
                className='w-6 h-6'
              />
              <BaseText size={16}>{dataBank?.bankName}</BaseText>
            </div>
          ) : (
            '은행선택'
          )
        }
      >
        <div>
          {dataBank?.bankId ? (
            <div className='flex flex-col items-center gap-3'>
              <BaseInput
                placeholder='입금자명'
                value={dataBank?.bankUserName}
                onChange={(value) => {
                  setDataBank({
                    ...dataBank,
                    bankUserName: value,
                  });
                }}
                className='w-full'
              />
              <BaseInput
                placeholder='계좌번호 입력'
                value={dataBank?.bankNumber}
                type='number'
                onChange={(value) => {
                  setDataBank({
                    ...dataBank,
                    bankNumber: value,
                  });
                }}
                className='w-full'
              />
              <CustomButton
                locale
                className='w-full'
                primary
                onClick={handleSubmitModal}
                disabled={!dataBank?.bankNumber || !dataBank?.bankUserName}
              >
                다음
              </CustomButton>
            </div>
          ) : (
            LIST_BANKING.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-2 p-3 cursor-pointer'
                onClick={() => {
                  setDataBank({
                    bankId: item.nameBank,
                    bankName: item.nameBank,
                    bankImage: item.imageBank,
                    bankNumber: '',
                    bankUserName: '',
                  });
                }}
              >
                <img
                  src={item.imageBank}
                  alt={item.nameBank}
                  className='w-6 h-6'
                />
                <BaseText size={16}>{item.nameBank}</BaseText>
              </div>
            ))
          )}
        </div>
      </BaseModal2>
    </>
  );
};
