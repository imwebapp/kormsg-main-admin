import { useEffect, useRef, useState } from "react";
import {
  BaseEditor,
  BaseTable,
  BaseText,
  CustomButton,
} from "../../../components";
import { useTranslation } from "react-i18next";
import { settingApi } from "../../../apis/settingApi";
import { Popover, TableColumnsType } from "antd";
import Images from "../../../assets/gen";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { BaseModal2 } from "../../../components/modal/BaseModal2";
import { BaseInput } from "../../../components/input/BaseInput";
import { showSuccess } from "../../../utils/showToast";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
export default function QASetting() {
  const { t } = useTranslation();
  const [data, setData] = useState<any>();
  const [selectedButton, setSelectedButton] = useState("");
  const [listFAQCategory, setListFAQCategory] = useState<any>([]);
  const [tempFAQCategories, setTempFAQCategories] = useState<any>([]);
  const [openModalCreateCategory, setOpenModalCreateCategory] = useState(false);
  const [openModalCategoryList, setOpenModalCategoryList] = useState(false);
  const [openModalCreateFAQ, setOpenModalCreateFAQ] = useState(false);
  const [openModalDeleteFAQCategory, setOpenModalDeleteFAQCategory] =
    useState(false);
  const [openModalModifyCategory, setOpenModalModifyCategory] = useState(false);
  const [openModalDeleteCategory, setOpenModalDeleteCategory] = useState(false);
  const [nameFAQCategory, setNameFAQCategory] = useState("");
  const [contentFAQ, setContentFAQ] = useState("");
  const [titleFAQ, setTitleFAQ] = useState("");
  const [faqCategoryId, setFaqCategoryId] = useState("");
  const [defaultContent, setDefaultContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [itemFaqCategory, setItemFaqCategory] = useState<any>();
  const idFAQ = useRef("");
  const idFAQCategory = useRef("");
  const getListFaqCategory = async () => {
    try {
      const params = {
        fields: '["$all"]',
        limit: 50,
        order: JSON.stringify([["created_at", "DESC"]]),
      };
      let result: any = await settingApi.getListFaqCategory(params);
      if (result.code === 200) {
        setListFAQCategory(result.results.objects.rows);
        setTempFAQCategories(result.results.objects.rows);
        setSelectedButton(result.results.objects.rows[0].id);
      }
    } catch (error) {}
  };
  const getListFaq = async (id: string) => {
    try {
      const params = {
        fields: '["$all"]',
        filter: JSON.stringify({ faq_category_id: id }),
        limit: 50,
      };
      let result: any = await settingApi.getListFaq(params);
      if (result.code === 200) {
        setData(result.results.objects.rows);
      }
    } catch (error) {}
  };

  const renderEventAction = (text: string) => {
    // Loại bỏ các tag HTML từ chuỗi HTML
    const textOnly = text.replace(/<[^>]+>/g, "");

    return (
      <div>
        {textOnly.length > 80
          ? textOnly.slice(0, 80) + "..."
          : textOnly.slice(0, 80)}
      </div>
    );
  };
  const getTextColor = (buttonStatus: any) => {
    return buttonStatus === selectedButton ? "white" : "black";
  };
  const getButtonStyle = (buttonKey: any) => {
    const isSelected = buttonKey === selectedButton;
    return {
      backgroundColor: isSelected ? "black" : "white",
      color: isSelected ? "white" : "black",
    };
  };

  let columns: TableColumnsType<any> = [
    {
      title: t("Date"),
      dataIndex: ["updated_at"],
      render: (text) => <div>{dayjs(text).format("YYYY-MM-DD")}</div>,
      width: "10%",
    },
    {
      title: t("Title"),
      dataIndex: ["name"],
      width: "15%",
    },
    {
      title: t("Content"),
      dataIndex: ["content"],
      width: "65%",
      render: (text) => renderEventAction(text),
    },
    {
      title: t("Management"),
      render: (text, record) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img
            src={Images.edit2}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              handleViewFAQ(record);
            }}
          />
          <img
            src={Images.trash}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              handleDeleteFaq(record.id, record.faq_category_id);
            }}
          />
        </div>
      ),
      width: "10%",
    },
  ];

  const handleSubmitNewCategory = async () => {
    try {
      const params = {
        name: nameFAQCategory,
      };
      let result: any = await settingApi.createFaqCategory(params);
      if (result.code === 200) {
        showSuccess("Create FAQ Category Success");
        setNameFAQCategory("");
        getListFaqCategory();
      }
    } catch (error) {}
  };
  const resetModalCreateFAQ = () => {
    setTitleFAQ("");
    setContentFAQ("");
    setFaqCategoryId("");
    setDefaultContent("");
  };
  const handleEditFAQSubmit = async () => {
    try {
      const params = {
        content: contentFAQ,
        name: titleFAQ,
      };
      if (faqCategoryId !== "") {
        let result: any = await settingApi.editFaq(params, idFAQ.current);
        if (result.code === 200) {
          showSuccess("Create FAQ Success");
          getListFaq(faqCategoryId);
          resetModalCreateFAQ();
        }
      }
    } catch (error) {}
  };
  const handleSubmitNewFAQ = async () => {
    const resetModalCreateFAQ = () => {
      setTitleFAQ("");
      setContentFAQ("");
      setFaqCategoryId("");
      setDefaultContent("");
    };
    try {
      const params = {
        content: contentFAQ,
        faq_category_id: faqCategoryId,
        name: titleFAQ,
      };
      if (faqCategoryId !== "") {
        let result: any = await settingApi.createFaq(params);
        if (result.code === 200) {
          showSuccess("Create FAQ Success");
          getListFaq(faqCategoryId);
          resetModalCreateFAQ();
        }
      }
    } catch (error) {}
  };
  const handleSubmitEditCategory = async (temp: any) => {
    console.log("temp", temp);

    try {
      const params = {
        list_data: [],
      };
      const mappedData = temp.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      params.list_data = mappedData;
      console.log("mappedData", params);

      let result: any = await settingApi.editFaqCategory(params);
      if (result.code === 200) {
        getListFaqCategory();
      }
      console.log("result", result);
    } catch (error) {}
  };
  const handleSubmitSingleEditCategory = async () => {
    try {
      const params = {
        name: itemFaqCategory.name,
      };

      let result: any = await settingApi.editSingleFaqCategory(
        params,
        itemFaqCategory.id
      );
      if (result.code === 200) {
        getListFaqCategory();
      }
      console.log("result", result);
    } catch (error) {}
  };
  const handleDeleteCategory = async (id: string) => {
    try {
      let result: any = await settingApi.deleteFaqCategory(id);
      if (result.code === 200) {
        getListFaqCategory();
        showSuccess("Delete FAQ Category Success");
      }
    } catch (error) {}
  };
  const handleDeleteFaq = async (id: string, faq_category_id: string) => {
    try {
      let result: any = await settingApi.deleteFaq(id);
      if (result.code === 200) {
        getListFaq(faq_category_id);
        showSuccess("Delete FAQ Success");
      }
    } catch (error) {}
  };
  const handleInputChange = (index: any, value: any) => {
    const deepCopyArray = (arr: any) => JSON.parse(JSON.stringify(arr));
    const updatedCategories = deepCopyArray(tempFAQCategories); // Sao chép mảng một cách sâu
    updatedCategories[index].name = value;
    setTempFAQCategories(updatedCategories);
  };
  const handleViewFAQ = (record: any) => {
    setTitleFAQ(record.name);
    setDefaultContent(record.content);
    setContentFAQ(record.content);
    setFaqCategoryId(record.faq_category_id);
    setIsEditing(true);
    idFAQ.current = record.id;
    setOpenModalCreateFAQ(true);
  };
  const listButton = () => {
    const handleButtonClick = (id: any) => {
      setSelectedButton(id);
    };

    return (
      <div id="faqContainer" className="flex flex-row gap-4 overflow-x-auto">
        {listFAQCategory.map((item: any) => (
          <CustomButton
            key={item.id}
            className="text-base h-11 font-medium rounded-full px-4"
            style={getButtonStyle(item.id)}
            onClick={() => handleButtonClick(item.id)}
          >
            <BaseText color={getTextColor(item.id)} size={16}>
              {item.name}
            </BaseText>
            {selectedButton === item.id && (
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col gap-2">
                    <div
                      className="flex items-center gap-1 p-2 rounded-lg cursor-pointer hover:bg-darkNight100"
                      onClick={() => {
                        setOpenModalModifyCategory(true);
                        setOpenModify(false);
                        setItemFaqCategory(item);
                      }}
                    >
                      <img
                        src={Images.edit2}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <BaseText locale size={16}>
                        수정
                      </BaseText>
                    </div>
                    <div
                      className="flex items-center gap-1 p-2 rounded-lg cursor-pointer hover:bg-darkNight100"
                      onClick={() => {
                        setOpenModify(false);
                        setOpenModalDeleteCategory(true);
                        setItemFaqCategory(item);
                      }}
                    >
                      <img
                        src={Images.trashred}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <BaseText locale size={16} className="text-red-500">
                        삭제
                      </BaseText>
                    </div>
                  </div>
                }
                trigger="click"
                open={openModify}
                onOpenChange={(newOpen) => {
                  setOpenModify(true);
                }}
              >
                <div className="flex justify-center items-center w-6 h-6 bg-white rounded-[40px]">
                  <img
                    loading="lazy"
                    src={Images.filled}
                    alt=""
                    className="w-full aspect-square"
                  />
                </div>
              </Popover>
            )}
          </CustomButton>
        ))}
      </div>
    );
  };
  const headerTable = () => {
    return (
      <div className="flex flex-row justify-between">
        {listButton()}
        <div className="flex flex-row align-center gap-3 ml-8">
          <CustomButton
            bold
            locale
            className="flex items-center justify-center p-3 text-blue-600 rounded-xl border border-blue-600 border-solid h-11"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalCategoryList(true);
            }}
          >
            Category
          </CustomButton>
          <CustomButton
            primary
            bold
            locale
            className="flex items-center justify-center p-3 text-base text-white bg-blue-600 rounded-xl h-11"
            icon={<PlusOutlined />}
            onClick={() => {
              // setOpenModalCategoryList(true);
              setDefaultContent("Default Create");
              setIsEditing(false);
              resetModalCreateFAQ();
              setOpenModalCreateFAQ(true);
            }}
          >
            FAQ 만들기
          </CustomButton>
        </div>
      </div>
    );
  };
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
  const modalCategoryList = () => {
    return (
      <BaseModal2
        isOpen={!!openModalCategoryList}
        onClose={() => {
          setOpenModalCategoryList(false);
          setTempFAQCategories(listFAQCategory);
        }}
        onSubmit={() => {
          handleSubmitEditCategory(tempFAQCategories);
          setOpenModalCategoryList(false);
        }}
        title={t("List Category")}
      >
        {tempFAQCategories.map((category: any, index: any) => (
          <div
            className="flex gap-2.5 px-6 py-4 text-base font-medium leading-6 text-black whitespace-nowrap justify-between"
            key={index}
          >
            <BaseInput
              className="w-full"
              value={category.name}
              onChange={(value) => handleInputChange(index, value)}
            />
            <img
              src={Images.trashred}
              alt="Notification icon"
              className="shrink-0 my-auto w-6 aspect-square cursor-pointer"
              onClick={() => {
                idFAQCategory.current = category.id;
                setOpenModalDeleteFAQCategory(true);
              }}
            />
          </div>
        ))}
        <a
          className="flex px-6 py-4 gap-3 text-base font-medium leading-6 text-blue-600"
          onClick={() => {
            setOpenModalCreateCategory(true);
          }}
        >
          <PlusOutlined />
          <span>{t("Create new category")}</span>
        </a>
      </BaseModal2>
    );
  };
  const modalCreateCategory = () => {
    return (
      <BaseModal2
        isOpen={!!openModalCreateCategory}
        onClose={() => {
          setOpenModalCreateCategory(false);
        }}
        onSubmit={() => {
          handleSubmitNewCategory();
          setOpenModalCreateCategory(false);
        }}
        title={t("New Category")}
      >
        <BaseInput
          className="w-full"
          title={t("Name")}
          placeholder="Create new FAQ category"
          value={nameFAQCategory}
          onChange={setNameFAQCategory}
        />
      </BaseModal2>
    );
  };
  const modalDeleteFaqCategory = () => {
    return (
      <BaseModal2
        isOpen={!!openModalDeleteFAQCategory}
        styleButtonConfirm={"bg-rose-500"}
        title={t("Delete Category")}
        onSubmit={() => {
          handleDeleteCategory(idFAQCategory.current);
          setOpenModalDeleteFAQCategory(false);
        }}
        onClose={() => {
          setOpenModalDeleteFAQCategory(false);
        }}
      >
        <div>
          {t("이 카테고리와 해당 카테고리에 속한 FAQ를 삭제하시겠습니까?")}
        </div>
      </BaseModal2>
    );
  };
  const modalModifyCategory = () => {
    return (
      <BaseModal2
        isOpen={!!openModalModifyCategory}
        styleButtonConfirm={"bg-rose-500"}
        title={t("Edit Category")}
        onSubmit={() => {
          handleSubmitSingleEditCategory();
          setOpenModalModifyCategory(false);
        }}
        onClose={() => {
          setOpenModalModifyCategory(false);
        }}
      >
        <BaseInput
          className="w-full"
          value={itemFaqCategory?.name}
          onChange={(value) => {
            setItemFaqCategory((prevItemFaqCategory: any) => ({
              ...prevItemFaqCategory,
              name: value,
            }));
          }}
        />
      </BaseModal2>
    );
  };
  const modalDeleteCategory = () => {
    return (
      <BaseModal2
        isOpen={!!openModalDeleteCategory}
        onSubmit={() => {
          // handleSubmitSingleEditCategory();
          setOpenModalDeleteCategory(false);
        }}
        onClose={() => {
          setOpenModalDeleteCategory(false);
        }}
        title="Delete group"
      >
        <BaseText size={16}>
          {itemFaqCategory?.total_faq}
          명의 회원이 이동할 게시판을 선택하십시오.
        </BaseText>
        {/* <div className="flex flex-col flex-wrap content-start pr-6 text-xl font-medium leading-7 max-w-[632px] text-neutral-600 max-md:pr-5">
          <div className="flex gap-3 max-md:flex-wrap">
            {listFAQCategory
              // .filter((item:any, index:any) => {
              //   return index !== 0 && String(item.id) !== idGroupDelete;
              // })
              .map((item: any, index: any) => (
                <CustomButton
                  key={index}
                  className="text-base h-11 font-medium rounded-full px-4 py-2.5"
                  style={getButtonStyle(item.id)}
                  // onClick={() => handleButtonClick(item.id)}
                >
                  <BaseText color={getTextColor(item.id)} size={16}>
                    {item.name}
                  </BaseText>
                </CustomButton>
              ))}
          </div>
        </div> */}
        {/* <div
          role="button"
          className="justify-center px-6 pt-2.5 pb-3 bg-neutral-100 rounded-[100px] max-md:px-5"
        >
          Group 1
        </div> */}
        <section className="text-xl font-medium leading-7 max-w-[632px] text-neutral-600 max-md:pr-5 pr-6">
          <div className="grid gap-3 max-md:grid-cols-1 grid-cols-3">
            {itemFaqCategory?.total_faq > 0 &&
              listFAQCategory
                // .filter((item:any, index:any) => {
                //   return index !== 0 && String(item.id) !== idGroupDelete;
                // })
                .map((item: any, index: any) => (
                  <CustomButton
                    key={index}
                    className="justify-center px-6 pt-2.5 pb-3 bg-neutral-100 rounded-[100px] max-md:px-5"
                    style={getButtonStyle(item.id)}
                    // onClick={() => handleButtonClick(item.id)}
                  >
                    <BaseText color={getTextColor(item.id)} size={16}>
                      {item.name}
                    </BaseText>
                  </CustomButton>
                ))}
          </div>
        </section>
      </BaseModal2>
    );
  };
  const modalCreateFAQ = () => {
    return (
      <BaseModal2
        isOpen={!!openModalCreateFAQ}
        onClose={() => {
          setOpenModalCreateFAQ(false);
        }}
        onSubmit={() => {
          if (isEditing) {
            handleEditFAQSubmit();
          } else {
            handleSubmitNewFAQ();
          }
          setOpenModalCreateFAQ(false);
        }}
        title={isEditing ? t("Edit FAQ") : t("FAQ 만들기")}
      >
        <BaseInputSelect
          title={t("Group")}
          value={faqCategoryId}
          onChange={setFaqCategoryId}
          defaultValue={faqCategoryId !== "" ? faqCategoryId : null}
          placeholder="Select a group"
          options={listFAQCategory.map((item: any) => ({
            value: item.id,
            label: item.name,
          }))}
        />
        <BaseInput
          title={t("Title")}
          placeholder="제목을 입력하세요"
          value={titleFAQ}
          onChange={setTitleFAQ}
        />
        <div className="pt-2">
          <BaseText bold locale className="mt-30 mb-5">
            Content
          </BaseText>
          <BaseEditor
            defaultValue={defaultContent}
            value={contentFAQ}
            onChange={(value: string) => {
              setContentFAQ(value);
            }}
            height={"1000px"}
          />
        </div>
      </BaseModal2>
    );
  };

  useEffect(() => {
    getListFaqCategory();
    return () => {};
  }, []);

  useEffect(() => {
    if (selectedButton !== "") getListFaq(selectedButton);
  }, [selectedButton]);
  return (
    <div className="p-4 py-0">
      {headerTable()}
      {bodyTable()}
      {modalCategoryList()}
      {modalCreateCategory()}
      {modalDeleteFaqCategory()}
      {modalModifyCategory()}
      {modalDeleteCategory()}
      {modalCreateFAQ()}
    </div>
  );
}
