import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { districtApi } from "../../../apis/districtApi";
import { regionApi } from "../../../apis/regionApi";
import { BaseText } from "../../../components";
import { BaseModal } from "../../../components/modal/BaseModal";
import { classNames, convertParams } from "../../../utils/common";
import { REGION_TYPE } from "../../../utils/constants";

interface IProps {
  isAddressKor: boolean;
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (data: { province: string; district: string }) => void;
  dataProvince?: string;
  dataDistrict?: string;
}

export const ModalSelectRegion = ({
  isAddressKor,
  isOpen,
  onClose,
  onSubmit,
  dataProvince,
  dataDistrict,
}: IProps) => {
  const [listRegion, setListRegion] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [regionSelected, setRegionSelected] = useState({ id: "", name: "" });
  const [regionSelectedChild, setRegionSelectedChild] = useState({
    id: "",
    name: "",
  });
  const initialized = useRef(false);

  const handleCloseModalRegion = () => {
    onClose && onClose();
  };

  const handleSubmitModalRegion = () => {
    onSubmit &&
      onSubmit({
        province: regionSelected?.name,
        district: regionSelectedChild?.name,
      });
  };

  const getListRegion = async () => {
    try {
      const resListRegion: any = await regionApi.getList(
        convertParams({
          limit: 50,
          fields: ["$all"],
          filter: {
            region: isAddressKor ? REGION_TYPE.KOREA : REGION_TYPE.GLOBAL,
          },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListRegion?.code === 200) {
        setListRegion(resListRegion?.results?.objects?.rows || []);
      }
    } catch (error) {
      console.error("Error fetching regions: ", error);
    }
  };

  const getListDistrict = async () => {
    if (!regionSelected?.id) return;
    try {
      const resListDistrict: any = await districtApi.getList(
        convertParams({
          limit: 50,
          fields: ["$all"],
          filter: { setting_province_id: regionSelected.id },
          order: [
            ["index", "ASC"],
            ["updated_at", "DESC"],
          ],
        })
      );
      if (resListDistrict?.code === 200) {
        setListDistrict(resListDistrict?.results?.objects?.rows || []);
      }
    } catch (error) {
      console.error("Error fetching districts: ", error);
    }
  };

  useEffect(() => {
    setListDistrict([])
    setListRegion([])
    getListRegion();
  }, [isAddressKor]);

  useEffect(() => {
    if (dataProvince && listRegion.length > 0 && !initialized.current) {
      const province = listRegion.find(
        (item: any) => item.name === dataProvince
      );
      if (province) {
        setRegionSelected(province);
        const district = listDistrict.find(
          (item: any) => item.name === dataDistrict
        );
        if (district) {
          setRegionSelectedChild(district);
          initialized.current = true; // Mark initialization as done
        }
      }
    }
  }, [dataProvince, dataDistrict, listRegion, listDistrict]);

  useEffect(() => {
    getListDistrict();
    setRegionSelectedChild({ id: "", name: "" });
  }, [regionSelected]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCloseModalRegion}
      onSubmit={handleSubmitModalRegion}
      title="지역"
      disableSubmitBtn={!regionSelectedChild.id}
    >
      <div className="flex h-[400px]">
        <div className="w-1/4 overflow-auto border-r">
          {listRegion.map((item: any, index: number) => (
            <div
              key={index}
              className={classNames(
                "flex px-4 py-[10px]",
                regionSelected.id === item.id ? "bg-darkNight900" : ""
              )}
              onClick={() => setRegionSelected(item)}
            >
              <BaseText
                locale
                size={16}
                bold
                className={classNames(
                  regionSelected.id === item.id ? "text-white" : ""
                )}
              >
                {item.name}
              </BaseText>
            </div>
          ))}
        </div>
        <div className="w-3/4 px-3 overflow-auto">
          {listDistrict.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between py-3"
              onClick={() => setRegionSelectedChild(item)}
            >
              <BaseText
                locale
                size={16}
                bold
                className={classNames(
                  regionSelectedChild.id === item.id ? "text-primary" : ""
                )}
              >
                {item.name}
              </BaseText>
              {regionSelectedChild.id === item.id && (
                <CheckOutlined
                  style={{ marginLeft: "8px", color: "#0866FF" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
};
