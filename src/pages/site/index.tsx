import React, { useEffect, useRef, useState } from "react";
import { BaseTable, BaseText, CustomButton } from "../../components";
import { PlusOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { siteLinkApi } from "../../apis/siteLinkApi";
import Images from "../../assets/gen";
import { classNames } from "../../utils/common";
import { TableColumnsType, message, notification } from "antd";
import { useTranslation } from "react-i18next";
import { BaseModal2 } from "../../components/modal/BaseModal2";
import { BaseInputSelect } from "../../components/input/BaseInputSelect";
import { BaseInput } from "../../components/input/BaseInput";
import { UploadApi } from "../../apis/uploadApi";
import { showError, showSuccess } from "../../utils/showToast";
import { BaseTableDnD } from "../../components/table/BaseTableDnD";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const SiteLinkPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>();
  const [isCreate, setIsCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueKeywordFilter, setValueKeywordFilter] = useState("");
  const [nameSiteCategory, setNameSiteCategory] = useState("");
  const [openModalCategoryList, setOpenModalCategoryList] = useState(false);
  const [openModalDeleteSiteCategory, setOpenModalDeleteSiteCategory] =
    useState(false);
  const [openModalCreateCategory, setOpenModalCreateCategory] = useState(false);

  const [openModalCreateSite, setOpenModalCreateSite] = useState(false);
  const [openModalDeleteMultiSite, setOpenModalDeleteMultiSite] =
    useState(false);

  const [selectedButton, setSelectedButton] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [listSiteCategory, setListSiteCategory] = useState<any>([]);
  const [tempSiteCategories, setTempSiteCategories] = useState<any>([]);
  const [listRowSelected, setListRowSelected] = useState<string[]>([]);
  const [selectSiteCategory, setSelectSiteCategory] = useState<any>();
  const [imageCreateSite, setImageCreateSite] = useState<File>();

  // form create
  const [formDataCreateSite, setFormDataCreateSite] = useState({
    image: "",
    site_category_id: "",
    title: "",
    content: "",
    link: "",
    id: "",
  });
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setListRowSelected(newSelectedRowKeys as string[]);
  };
  const getListSiteCategory = async () => {
    try {
      const params = {
        fields: '["$all"]',
        limit: 50,
      };
      let result: any = await siteLinkApi.getListCategory(params);

      if (result.code === 200) {
        setListSiteCategory(result?.results?.objects?.rows);
        setTempSiteCategories(result.results.objects.rows);
        setSelectedButton(result.results.objects.rows[0].id);
      }
    } catch (error) {}
  };
  const getListSite = async (id: string) => {
    try {
      const params = {
        fields: '["$all"]',
        filter: JSON.stringify({
          site_category_id: id,
          $or: [
            { title: { $iLike: `%${valueKeywordFilter}%` } },
            { content: { $iLike: `%${valueKeywordFilter}%` } },
            { link: { $iLike: `%${valueKeywordFilter}%` } },
          ],
        }),
        limit: 50,
      };
      let result: any = await siteLinkApi.getListSite(params);
      if (result.code === 200) {
        setData(result.results.objects.rows);
      }
    } catch (error) {}
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
  const getButtonStyleCategory = (buttonKey: any) => {
    const isSelected = buttonKey === selectedCategory;
    return {
      backgroundColor: isSelected ? "blue" : "white",
      color: isSelected ? "white" : "black",
    };
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleInputChange = (name: string, value: any) => {
    setFormDataCreateSite({ ...formDataCreateSite, [name]: value });
  };
  const handleInputChangeTemp = (index: any, value: any) => {
    const deepCopyArray = (arr: any) => JSON.parse(JSON.stringify(arr));
    const updatedCategories = deepCopyArray(tempSiteCategories); // Sao chép mảng một cách sâu
    updatedCategories[index].name = value;
    setTempSiteCategories(updatedCategories);
  };
  const handleEditSite = (record: any) => {
    setIsCreate(false);
    setOpenModalCreateSite(true);
    setFormDataCreateSite({
      image: record.image || "",
      title: record.title || "",
      site_category_id: record.site_category_id || "",
      content: record.content || "",
      link: record.link || "",
      id: record.id || "",
    });
    setImageCreateSite(record.image);
  };
  const deleteSite = async (id: string) => {
    try {
      const params = {
        items: [`${id}`],
      };

      await siteLinkApi.deleteSite([`${id}`]);
      notification.success({
        message: "Delete Success",
      });
      getListSite(selectedButton);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };
  const handleOpenModalCreateSite = () => {
    setIsCreate(true);
    setFormDataCreateSite({
      image: "",
      site_category_id: "",
      title: "",
      content: "",
      link: "",
      id: "",
    });
    setImageCreateSite(undefined);
    setOpenModalCreateSite(true);
  };
  const handleDeleteMultiSite = async () => {
    try {
      let result: any = await siteLinkApi.deleteMultiSite(listRowSelected);
      if (result.code === 200) {
        setListRowSelected([]);
        getListSite(selectedButton);
        getListSiteCategory();
        showSuccess("Delete Site Links Success");
      }
    } catch (error) {}
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageCreateSite(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormDataCreateSite({
            ...formDataCreateSite,
            image: reader.result,
          });
        } else {
          console.error("Invalid data type for avatar.");
        }
      };
    }
  };
  const handleChangeTextKeyword = (value: string) => {
    setValueKeywordFilter(value);
  };
  const handleSubmitEditCategory = async (temp: any) => {
    try {
      const params = {
        list_data: [],
      };
      const mappedData = temp.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      params.list_data = mappedData;

      let result: any = await siteLinkApi.editSiteCategory(params);
      if (result.code === 200) {
        getListSiteCategory();
      }
    } catch (error) {}
  };
  const handleCreateSite = async () => {
    try {
      //Upload Image

      let resUploadImg: string = "";
      if (imageCreateSite !== undefined) {
        const ResUploadImg = await UploadApi.uploadImage(imageCreateSite);
        resUploadImg = ResUploadImg?.url;
      }

      const dataCreateConvert = {
        image: resUploadImg || null,
        title: formDataCreateSite?.title,
        content: formDataCreateSite?.content,
        site_category_id: formDataCreateSite?.site_category_id,
        link: formDataCreateSite?.link,
      };
      //create product

      const resCreateSite: any = await siteLinkApi.createSite(
        dataCreateConvert
      );
      if (resCreateSite.code === 200) {
        message.success("Create Site successfully");
        setFormDataCreateSite({
          image: "",
          site_category_id: "",
          title: "",
          content: "",
          link: "",
          id: "",
        });
        setImageCreateSite(undefined);
        getListSite(selectedButton);
        getListSiteCategory();
      }
    } catch (error: any) {
      showError(error);
    }
  };
  const handleSubmitEditSite = async () => {
    try {
      //Upload Image
      let resUploadImg: string = "";
      if (
        imageCreateSite !== undefined &&
        typeof imageCreateSite === "object"
      ) {
        const ResUploadImg = await UploadApi.uploadImage(imageCreateSite);
        resUploadImg = ResUploadImg?.url;
      }

      const dataCreateConvert = {
        image: (resUploadImg && resUploadImg) || null || imageCreateSite,
        title: formDataCreateSite?.title,
        content: formDataCreateSite?.content,
        site_category_id: formDataCreateSite?.site_category_id,
        link: formDataCreateSite?.link,
      };
      //create product
      const resEditProduct: any = await siteLinkApi.editSite(
        dataCreateConvert,
        formDataCreateSite.id
      );
      if (resEditProduct.code === 200) {
        message.success("Edit site link successfully");

        setFormDataCreateSite({
          image: "",
          site_category_id: "",
          title: "",
          content: "",
          link: "",
          id: "",
        });
        setImageCreateSite(undefined);
        getListSite(selectedButton);
        getListSiteCategory();
      }
    } catch (error: any) {
      showError(error);
    }
  };
  const handleSubmitNewCategory = async () => {
    try {
      const params = {
        name: nameSiteCategory,
      };
      let result: any = await siteLinkApi.createSiteCategory(params);
      if (result.code === 200) {
        showSuccess("Create Site Link Category Success");
        setNameSiteCategory("");
        getListSiteCategory();
      }
    } catch (error) {}
  };
  const handleDeleteCategory = async (id: string) => {
    try {
      const params = {
        new_group: selectedCategory,
      };
      let result: any = await siteLinkApi.deleteSiteCategory(id, params);
      if (result.code === 200) {
        getListSiteCategory();
        getListSite(selectedButton);
        showSuccess("Delete Site Link Category Success");
      }
    } catch (error) {}
  };
  const handleUpdateSite = async (id: string, site_category_id: string) => {
    try {
      const params = {
        site_category_id: site_category_id,
      };
      const result: any = await siteLinkApi.editSite(params, id);
      if (result.code === 200) {
        getListSite(selectedButton);
        getListSiteCategory();
        showSuccess("Change Site Link Success");
      }
    } catch (error) {
      showError(error);
    }
  };
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === result.source.droppableId) return;
    handleUpdateSite(result.draggableId, result.destination.droppableId);

    // function update
  };
  const onDragStartCate = () => {
    // setLinkCateDragging(linkIndex);
    console.log("SiteIndex");
  };
  const listButton = () => {
    const handleButtonClick = (id: any) => {
      setSelectedButton(id);
    };

    return (
      <div
        id="faqContainer"
        className="flex flex-row gap-4 overflow-x-auto items-center"
      >
        {listSiteCategory.map((item: any) => (
          <Droppable droppableId={item?.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <CustomButton
                  key={item.id}
                  className="text-base h-11 font-medium rounded-full px-4"
                  style={getButtonStyle(item.id)}
                  onClick={() => handleButtonClick(item.id)}
                >
                  <BaseText color={getTextColor(item.id)} size={16}>
                    {item.name}
                  </BaseText>
                </CustomButton>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
            icon={
              <img src={Images.category2} className={classNames("w-6 h-6")} />
            }
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
            onClick={handleOpenModalCreateSite}
          >
            Create New
          </CustomButton>
        </div>
      </div>
    );
  };
  const searchKeyword = () => {
    return (
      <div className="flex gap-4 text-base font-medium leading-6 whitespace-nowrap max-w-[651px] max-md:flex-wrap w-full my-4">
        <BaseInput
          placeholder="Keyword"
          className="w-full"
          value={valueKeywordFilter}
          onChange={(value) => {
            handleChangeTextKeyword(value);
          }}
          iconLeft={
            <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
          }
        />
        <CustomButton
          primary
          bold
          locale
          className="flex items-center justify-center p-3 text-base text-white bg-blue-600 rounded-xl h-12"
          onClick={() => {
            getListSite(selectedButton);
          }}
        >
          Search
        </CustomButton>
      </div>
    );
  };
  const bodyTable = () => {
    let columns: TableColumnsType<any> = [
      {
        title: t("No"),
        render: (text, record, index) => (
          <div className="min-w-[40px]">
            <BaseText>{(currentPage - 1) * 50 + index + 1}</BaseText>
          </div>
        ),
      },
      {
        title: t("Logo"),
        dataIndex: ["image"],
        render: (value, record, index) => (
          <img
            src={value || "https://via.placeholder.com/150"}
            className=" w-20 h-20"
          />
        ),
      },
      {
        title: t("Title"),
        dataIndex: ["title"],
      },
      {
        title: t("Content"),
        dataIndex: ["content"],
      },
      {
        title: t("Link"),
        dataIndex: ["link"],
        render: (value, record, index) => (
          <a href={value} target="_blank" className="text-blue-500">
            {value}
          </a>
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
                handleEditSite(record);
              }}
            />
            <img
              src={Images.trash}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                deleteSite(record.id);
              }}
            />
          </div>
        ),
        width: "10%",
      },
    ];
    return (
      <BaseTableDnD
        maxContent
        sticky={{ offsetHeader: 0 }}
        onSelectChange={onSelectChange}
        selectedKeys={listRowSelected}
        pagination={{
          current: currentPage,
          pageSize: 50,
          onChange: handlePageChange,
        }}
        className="w-full"
        columns={columns}
        data={data?.map((item: any) => ({ ...item, key: item.id }))}
      />
    );
  };
  const modalCreateSite = () => {
    return (
      <BaseModal2
        isOpen={!!openModalCreateSite}
        onClose={() => {
          setOpenModalCreateSite(false);
        }}
        onSubmit={() => {
          setOpenModalCreateSite(false);
          if (isCreate) {
            handleCreateSite();
          } else {
            handleSubmitEditSite();
          }
        }}
        title={isCreate ? "Create a site" : "Edit a site"}
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
                  {imageCreateSite && (
                    <div className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50">
                      <img
                        src={
                          typeof imageCreateSite === "string"
                            ? imageCreateSite || Images.exportIcon
                            : URL.createObjectURL(imageCreateSite!)
                        }
                        className="w-full h-full rounded-lg"
                        alt="Image"
                      />
                    </div>
                  )}
                  {!imageCreateSite && (
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
            title="Category"
            required
            defaultValue={formDataCreateSite.site_category_id || undefined}
            value={formDataCreateSite.site_category_id}
            onChange={(value) => handleInputChange("site_category_id", value)}
            placeholder="Select type product"
            options={listSiteCategory.map(
              (category: { id: any; name: any }) => ({
                value: category.id,
                label: category.name,
              })
            )}
          />
          <BaseInput
            title="Title"
            required
            value={formDataCreateSite?.title}
            onChange={(value) => handleInputChange("title", value)}
            placeholder="Title"
          />
          <BaseInput
            title="Content"
            required
            value={formDataCreateSite?.content}
            onChange={(value) => handleInputChange("content", value)}
            placeholder="Please Input Content"
          />
          <BaseInput
            title="Link"
            required
            value={formDataCreateSite?.link}
            onChange={(value) => handleInputChange("link", value)}
            placeholder="Please Input Link"
          />
        </div>
      </BaseModal2>
    );
  };
  const modalCategoryList = () => {
    return (
      <BaseModal2
        isOpen={!!openModalCategoryList}
        onClose={() => {
          setOpenModalCategoryList(false);
          setTempSiteCategories(listSiteCategory);
        }}
        onSubmit={() => {
          handleSubmitEditCategory(tempSiteCategories);
          setOpenModalCategoryList(false);
        }}
        title={t("List Category")}
      >
        {tempSiteCategories.map((category: any, index: any) => (
          <div
            className="flex gap-2.5 px-6 py-4 text-base font-medium leading-6 text-black whitespace-nowrap justify-between"
            key={index}
          >
            <BaseInput
              className="w-full"
              value={category.name}
              onChange={(value) => handleInputChangeTemp(index, value)}
            />
            <img
              src={Images.trashred}
              alt="Notification icon"
              className="shrink-0 my-auto w-6 aspect-square cursor-pointer"
              onClick={() => {
                setSelectSiteCategory(category);
                setOpenModalDeleteSiteCategory(true);
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
  const modalDeleteSiteCategory = () => {
    const handleButtonClick = (id: string) => {
      setSelectedCategory(id);
    };
    return (
      <BaseModal2
        isOpen={!!openModalDeleteSiteCategory}
        title={t("Delete Category")}
        onSubmit={() => {
          handleDeleteCategory(selectSiteCategory.id);
          setOpenModalDeleteSiteCategory(false);
        }}
        onClose={() => {
          setOpenModalDeleteSiteCategory(false);
          setSelectedCategory("");
        }}
        isHideAction={true}
      >
        <div>
          {selectSiteCategory?.total_site +
            t("명의 회원이 이동할 게시판을 선택하십시오.")}
        </div>
        <section className="text-xl font-medium leading-7 max-w-[632px] text-neutral-600 max-md:pr-5 pr-6 py-3">
          <div className="grid gap-3 max-md:grid-cols-1 grid-cols-3">
            {selectSiteCategory?.total_site > 0 &&
              listSiteCategory
                .filter(
                  (item: { id: any }) => item.id !== selectSiteCategory.id
                )
                .map((item: any, index: any) => (
                  <CustomButton
                    key={index}
                    className="justify-center  px-6 pt-2.5 pb-3 bg-neutral-100 rounded-[100px] max-md:px-5"
                    style={getButtonStyleCategory(item.id)}
                    onClick={() => handleButtonClick(item.id)}
                  >
                    <BaseText color={getTextColor(item.id)} size={16}>
                      {item.name}
                    </BaseText>
                  </CustomButton>
                ))}
          </div>
        </section>
        <section className="flex gap-2.5 justify-between self-stretch px-6 py-4 text-base leading-6 bg-white border-t border-gray-200 border-solid max-w-[680px] max-md:flex-wrap max-md:px-5">
          <div
            className="flex gap-2  items-center text-base cursor-pointer"
            onClick={() => {
              handleDeleteCategory(selectSiteCategory.id);
              setOpenModalDeleteSiteCategory(false);
            }}
          >
            {selectSiteCategory?.total_site > 0 && (
              <>
                <img src={Images.trashred} className="w-6 h-6" />
                <div className="text-dustRed500 underline font-bold text-16px">
                  {selectSiteCategory?.total_site}명의 회원이
                </div>
              </>
            )}
          </div>
          <div className="flex gap-4 font-bold whitespace-nowrap">
            <button
              className="justify-center px-5 py-2.5 border border-gray-200 border-solid rounded-[100px] text-neutral-900 max-md:px-5"
              onClick={() => {
                setOpenModalDeleteSiteCategory(false);
                setSelectedCategory("");
              }}
            >
              {t("Cancel")}
            </button>
            <button
              className="justify-center px-5 py-2.5 text-white bg-blue-600 rounded-[100px] max-md:px-5"
              onClick={() => {
                handleDeleteCategory(selectSiteCategory.id);
                setOpenModalDeleteSiteCategory(false);
                setSelectedCategory("");
              }}
            >
              {t("Confirm")}
            </button>
          </div>
        </section>
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
          placeholder="Create new Site Link category"
          value={nameSiteCategory}
          onChange={setNameSiteCategory}
        />
      </BaseModal2>
    );
  };
  const modalDeleteMultiSite = () => {
    return (
      <BaseModal2
        isOpen={!!openModalDeleteMultiSite}
        onClose={() => {
          setOpenModalDeleteMultiSite(false);
        }}
        title="Delete Site Links"
        styleButtonConfirm={"bg-rose-500"}
        onSubmit={() => {
          handleDeleteMultiSite();
          setOpenModalDeleteMultiSite(false);
        }}
      >
        <div className="pt-2">
          <BaseText bold locale className="mt-30 mb-5">
            {`Are you sure you want to delete these ${listRowSelected.length} site links?`}
          </BaseText>
        </div>
      </BaseModal2>
    );
  };
  useEffect(() => {
    getListSiteCategory();
  }, []);
  useEffect(() => {
    if (selectedButton !== "") getListSite(selectedButton);
  }, [selectedButton]);

  return (
    <div className="p-4 py-5">
      <DragDropContext
        onDragStart={() => onDragStartCate()}
        onDragEnd={onDragEnd}
      >
        {headerTable()}
        {searchKeyword()}
        {bodyTable()}
      </DragDropContext>
      {listRowSelected.length > 0 && (
        <div className="fixed bottom-6 right-1/4 left-1/4">
          <div className="flex gap-6 px-6 py-4 bg-white rounded-lg shadow-xl justify-between">
            <div className="flex justify-center gap-2 px-3 py-3 rounded-full bg-darkNight50">
              <CloseOutlined className="text-xl text-black cursor-pointer" />
              <BaseText bold size={16}>
                {t("선택됨")}{" "}
                <span className="text-primary">{listRowSelected.length}</span>
              </BaseText>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                className="justify-center px-6 py-3 text-lg font-bold leading-7 text-white whitespace-nowrap bg-red-600 rounded-[100px] max-md:px-5"
                onClick={() => {
                  setOpenModalDeleteMultiSite(true);
                }}
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
      {modalCreateSite()}
      {modalCategoryList()}
      {modalCreateCategory()}
      {modalDeleteSiteCategory()}
      {modalDeleteMultiSite()}
    </div>
  );
};

export default SiteLinkPage;
