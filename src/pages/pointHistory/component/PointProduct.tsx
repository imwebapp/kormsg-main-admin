import { useTranslation } from "react-i18next";
import { BaseTable, BaseText, CustomButton } from "../../../components";
import { ArrowUpOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Input, TableColumnsType, message, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { pointHistoryApi } from "../../../apis/pointHistoryApi";
import { useNavigate } from "react-router-dom";
import { POINT_PRODUCT_TYPE_KR } from "../../../utils/constants";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { BaseInput } from "../../../components/input/BaseInput";
import { classNames } from "../../../utils/common";
import Images from "../../../assets/gen";
import { BaseModal2 } from "../../../components/modal/BaseModal2";
import { UploadApi } from "../../../apis/uploadApi";

export default function PointProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [valueKeywordFilter, setValueKeywordFilter] = useState("");
  const [openModalCreateProduct, setOpenModalCreateProduct] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("");
  const idProduct = useRef("");
  const [formDataCreateProduct, setFormDataCreateProduct] = useState({
    images: "",
    point: "",
    thumbnails: [],
    title: "",
    type: "",
    id: "",
  });
  const [imageCreateProduct, setImageCreateProduct] = useState<File>();
  const handleChangeTextKeyword = (e: any) => {
    setValueKeywordFilter(e.target.value);
  };
  const handleChangeTypeProduct = (value: string) => {
    setSelectedSorting(value);
  };
  //create product
  const handleOpenModalCreateProduct = () => {
    setIsCreate(true);
    setFormDataCreateProduct({
      images: "",
      point: "",
      thumbnails: [],
      title: "",
      type: "",
      id: "",
    });
    setImageCreateProduct(undefined);
    setOpenModalCreateProduct(true);
  };
  const handleInputChange = (name: string, value: any) => {
    setFormDataCreateProduct({ ...formDataCreateProduct, [name]: value });
  };
  const handleEditProduct = (record: any) => {
    console.log(record);

    setIsCreate(false);
    setOpenModalCreateProduct(true);
    setFormDataCreateProduct({
      images: record.images || [],
      point: record.point || 0,
      thumbnails: record.thumbnails || [],
      title: record.title || "",
      type: record.type || "",
      id: record.id || "",
    });
    setImageCreateProduct(record.images[0]);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("file", file);

      setImageCreateProduct(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormDataCreateProduct({
            ...formDataCreateProduct,
            images: reader.result,
          });
        } else {
          console.error("Invalid data type for avatar.");
        }
      };
    }
    console.log(formDataCreateProduct);
  };
  const handleCreateProduct = async () => {
    try {
      //Upload Image
      console.log("imageCreateProduct", imageCreateProduct);

      let resUploadImg: string = "";
      if (imageCreateProduct !== undefined) {
        const ResUploadImg = await UploadApi.uploadImage(imageCreateProduct);
        resUploadImg = ResUploadImg?.url;
      }

      const dataCreateConvert = {
        images: [resUploadImg] || null,
        point: parseFloat(formDataCreateProduct?.point),
        thumbnails: [resUploadImg] || null,
        title: formDataCreateProduct?.title,
        type: formDataCreateProduct?.type,
      };
      //create product
      const resCreateProduct: any = await pointHistoryApi.createProduct(
        dataCreateConvert
      );
      if (resCreateProduct.code === 200) {
        message.success("Create product successfully");
        setFormDataCreateProduct({
          images: "",
          point: "",
          thumbnails: [],
          title: "",
          type: "",
          id: "",
        });
        setImageCreateProduct(undefined);
        getListProduct();
      }
    } catch (error: any) {
      console.log("error Create user", error);
    }
  };
  const handleSubmitEditProduct = async () => {
    try {
      //Upload Image
      let resUploadImg: string = "";
      if (
        imageCreateProduct !== undefined &&
        typeof imageCreateProduct === "object"
      ) {
        const ResUploadImg = await UploadApi.uploadImage(imageCreateProduct);
        resUploadImg = ResUploadImg?.url;
      }

      const dataCreateConvert = {
        images: (resUploadImg && [resUploadImg]) ||
          null || [imageCreateProduct],
        point: parseFloat(formDataCreateProduct?.point),
        thumbnails: (resUploadImg && [resUploadImg]) ||
          null || [imageCreateProduct],
        title: formDataCreateProduct?.title,
        type: formDataCreateProduct?.type,
      };

      //create product
      const resEditProduct: any = await pointHistoryApi.editProduct(
        dataCreateConvert,
        formDataCreateProduct.id
      );
      if (resEditProduct.code === 200) {
        message.success("Edit product successfully");
        setFormDataCreateProduct({
          images: "",
          point: "",
          thumbnails: [],
          title: "",
          type: "",
          id: "",
        });
        setImageCreateProduct(undefined);
        getListProduct();
      }
    } catch (error: any) {
      console.log("error Create user", error);
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      const params = {
        items: [`${id}`],
      };
      console.log("id", params);

      await pointHistoryApi.deleteProduct([`${id}`]);
      notification.success({
        message: "Delete Success",
      });
      getListProduct();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };
  const getListProduct = async () => {
    try {
      const params = {
        fields: JSON.stringify(["$all"]),
        filter: JSON.stringify({
          title: { $iLike: `%${valueKeywordFilter}%` },
          ...(selectedSorting !== "" && { type: selectedSorting }),
        }),
      };
      let result: any = await pointHistoryApi.getListProduct(params);
      if (result.code === 200) {
        console.log("result.results.objects.rows", result.results.objects.rows);

        setData(result.results.objects.rows);
      }
      console.log(result);
    } catch (error) {}
  };
  let columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: (text, record, index) => (
        <div className="min-w-[40px]">
          <BaseText>{(currentPage - 1) * 50 + index + 1}</BaseText>
        </div>
      ),
      width: "10%",
    },
    {
      title: t("이미지"),
      dataIndex: ["thumbnails"],
      render: (value, record, index) => <img src={value} className="h-20" />,
    },
    {
      title: t("상품이름"),
      dataIndex: ["title"],
    },
    {
      title: t("상품종류"),
      dataIndex: ["type"],
    },
    {
      title: t("차감포인트"),
      dataIndex: ["point"],
      render: (text) => (
        <BaseText bold>
          {parseFloat(text).toLocaleString("en-US") + "P"}
        </BaseText>
      ),
    },
    {
      title: t("Management"),
      render: (text, record) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img
            src={Images.edit2}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              handleEditProduct(record);
            }}
          />
          <img
            src={Images.trash}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              deleteProduct(record.id);
            }}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    getListProduct();
  }, [valueKeywordFilter, selectedSorting]);
  const bodyTable = () => {
    return (
      <BaseTable
        maxContent
        sticky={{ offsetHeader: 0 }}
        pagination={{
          pageSize: 50,
        }}
        className="w-full"
        columns={columns}
        data={data}
      />
    );
  };
  return (
    <div className="p-4 py-0">
      <div className="flex gap-2.5 justify-between self-stretch py-2 text-base font-medium max-md:flex-wrap items-center">
        <div className="flex gap-4 text-base font-medium max-w-[651px] max-md:flex-wrap w-full my-4">
          <Input
            className="items-start justify-center flex-1 px-4 py-3 rounded-xl bg-neutral-100 max-md:pr-5"
            placeholder="Keyword"
            onChange={handleChangeTextKeyword}
            value={valueKeywordFilter}
          />
          <BaseInputSelect
            suffixIcon={<ArrowUpOutlined />}
            placeholder={t("Type Product")}
            style={{ width: 160 }}
            onChange={handleChangeTypeProduct}
            options={Object.entries(POINT_PRODUCT_TYPE_KR).map(
              ([key, value]) => {
                return {
                  value: key,
                  label: value,
                };
              }
            )}
            value={selectedSorting}
            defaultValue={selectedSorting}
            customizeStyleSelect={{ singleItemHeightLG: 50 }}
          />
        </div>
        <div className={classNames("flex gap-4")}>
          <CustomButton
            primary
            locale
            bold
            icon={<PlusCircleOutlined className="text-2xl" />}
            className={" px-4 py-6"}
            onClick={handleOpenModalCreateProduct}
          >
            Create a product
          </CustomButton>
        </div>
      </div>
      {bodyTable()}
      {/* create user */}
      <BaseModal2
        isOpen={!!openModalCreateProduct}
        onClose={() => {
          setOpenModalCreateProduct(false);
        }}
        onSubmit={() => {
          setOpenModalCreateProduct(false);
          if (isCreate) {
            handleCreateProduct();
          } else {
            handleSubmitEditProduct();
          }
        }}
        title={isCreate ? "Create a product" : "Edit a product"}
        nameConfirm="적용"
        // disableSubmitBtn={!isFormDataValid()}
      >
        <div className={classNames(" flex flex-col gap-4")}>
          <div className={classNames(" flex items-center justify-center")}>
            <input
              type="file"
              accept="image/*"
              id="avatarInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label
              htmlFor="avatarInput"
              className={classNames("relative inline-block")}
            >
              <div className="flex flex-col justify-center items-center rounded-xl bg-neutral-200 bg-opacity-50 max-w-[280px]">
                <div className="flex h-[184px]">
                  <input
                    id={`file-input`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    style={{ display: "none" }}
                    multiple
                  />
                  {imageCreateProduct && (
                    <div className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50">
                      <img
                        src={
                          typeof imageCreateProduct === "string"
                            ? imageCreateProduct || Images.exportIcon
                            : URL.createObjectURL(imageCreateProduct!)
                        }
                        className="w-full h-full rounded-lg"
                        alt="Image"
                      />
                    </div>
                  )}
                  {!imageCreateProduct && (
                    <div className="relative flex flex-col items-center px-20 py-12 justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50">
                      <img
                        src={Images.exportIcon}
                        className="w-8 h-8"
                        alt="Image"
                      />
                    </div>
                  )}
                </div>
              </div>
            </label>
          </div>
          <BaseInputSelect
            title="Type"
            required
            defaultValue={formDataCreateProduct.type || undefined}
            value={formDataCreateProduct.type}
            onChange={(value) => handleInputChange("type", value)}
            placeholder="Select type product"
            options={Object.entries(POINT_PRODUCT_TYPE_KR).map(
              ([key, value]) => {
                return {
                  value: key,
                  label: value,
                };
              }
            )}
          />
          <BaseInput
            title="Title"
            required
            value={formDataCreateProduct?.title}
            onChange={(value) => handleInputChange("title", value)}
            placeholder="Title"
          />
          <BaseInput
            title="Point"
            required
            value={formDataCreateProduct?.point}
            onChange={(value) => handleInputChange("point", value)}
            placeholder="Point"
          />
        </div>
      </BaseModal2>
    </div>
  );
}
