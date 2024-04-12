import { useEffect, useState } from "react";
import Images from "../../../assets/gen";
import { BaseEditor, BaseText } from "../../../components";
import BaseButton from "../../../components/baseButton";
import { BaseInput } from "../../../components/input/BaseInput";
import { DatePicker } from "antd";
import { useLocalStorage } from "../../../stores/localStorage";
import { formatDate, formatHour } from "../../../utils/common";
import moment from "moment";
import { Jodit } from "jodit";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { CategoryInterface, ThemaInterface } from "../../../entities";
import { ThemaApi } from "../../../apis/themaApi";
import { CategoryApi } from "../../../apis/categoryApi";
import { useBlogState } from "../store";
import { BlogApi } from "../../../apis/blogApi";
import { showError, showSuccess } from "../../../utils/showToast";
import { ListSelectImageDrag } from "../../newStore/components/ListSelectImageDrag";
import { UploadApi } from "../../../apis/uploadApi";
import { BlogInterface } from "../../../entities/blog.entity";
import { Preview } from "./Preview";
import { useCommonState } from "../../../stores/commonStorage";

export default function BlogDetail() {
  return (
    <div className="w-full h-full flex flex-row">
      <CreateDetail />
      <Preview />
    </div>
  );
}

const CreateDetail = () => {
  const { setLoading } = useCommonState((state) => state);
  const [isToday, setIsToday] = useState(true);
  const [selectedDate, setSelectedDate] = useState<any>();
  const { locale } = useLocalStorage((state) => state);
  const [content, setContent] = useState("");
  const [defaultContent, setDefaultContent] = useState("");
  const [themas, setThemas] = useState<Array<ThemaInterface>>([]);
  const [categories, setCategories] = useState<Array<CategoryInterface>>([]);
  const [title, setTitle] = useState("");
  const [themaSelected, setThemaSelected] = useState<any>();
  const [cateSelected, setCateSelected] = useState<any>();
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const { blog, setBlog } = useBlogState((state) => state);

  useEffect(() => {
    setThemaSelected(blog?.category?.thema_id);
    setCateSelected(blog?.category_id);
    setHashTags(blog?.tags || []);
    setTitle(blog?.title || "");
    setContent(blog?.content || "");
    setDefaultContent(blog?.content || "");
    setSelectedDate(blog?.execute_at);
    setImages(blog?.images || []);
    if (blog?.execute_at) setIsToday(false);
    getCategories(blog?.category?.thema_id);
  }, []);

  useEffect(() => {
    setBlog({
      id: blog?.id,
      category_id: cateSelected,
      content,
      title,
      tags: hashTags,
      execute_at: selectedDate,
      images: images,
      thumbnails: images,
    });
  }, [
    themaSelected,
    images,
    cateSelected,
    title,
    content,
    hashTags,
    selectedDate,
  ]);

  useEffect(() => {
    if (!!selectedDate && !!isToday) {
      setSelectedDate(null);
    }
    if (!selectedDate && !isToday) {
      setSelectedDate(new Date());
    }
  }, [isToday, selectedDate]);

  const getThema = async () => {
    try {
      const data: Array<ThemaInterface> = await ThemaApi.getList();
      setThemas(data);
    } catch (error) {}
  };

  useEffect(() => {
    getThema();
  }, []);

  const getCategories = async (thema_id: string) => {
    try {
      setCategories([]);
      const data = await CategoryApi.getList({
        filter: `{"thema_id":"${thema_id}"}`,
      });
      setCategories(data);
    } catch (error) {}
  };

  const buildPublicationTime = () => {
    return (
      <div className="mt-6">
        <BaseText locale bold>
          Publication time
        </BaseText>
        <div className="h-[18px]"></div>

        <div className="flex flex-row gap-x-8">
          <div
            onClick={() => setIsToday(true)}
            className="cursor-pointer flex flex-row gap-x-2"
          >
            <img
              src={isToday ? Images.radioActive : Images.radioInactive}
              className="w-6 h-6"
            />
            <BaseText locale bold>
              Today
            </BaseText>
          </div>
          <div
            onClick={() => setIsToday(false)}
            className="cursor-pointer flex flex-row gap-x-2"
          >
            <img
              src={!isToday ? Images.radioActive : Images.radioInactive}
              className="w-6 h-6"
            />
            <BaseText locale bold>
              Reservation
            </BaseText>
          </div>
        </div>
        <div className="h-[18px]"></div>
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {!isToday && (
          <div className="flex flex-row gap-x-6">
            <label
              htmlFor="select-date"
              className=" cursor-pointer flex-1  flex flex-row border rounded-xl px-6 py-4 gap-x-3 relative"
            >
              <img src={Images.calendar} className="w-6 h-6" />
              <div className="gap-y-2 flex flex-col">
                <BaseText locale medium>
                  Date
                </BaseText>
                <BaseText bold size={16}>
                  {formatDate(selectedDate, locale)}
                </BaseText>
              </div>
              <DatePicker
                onChange={(date: any, dateString: any) => {
                  const newDate = moment(date.$d);
                  newDate.hour(moment(selectedDate).hour());
                  newDate.minute(moment(selectedDate).minute());
                  newDate.second(moment(selectedDate).second());
                  setSelectedDate(newDate.toDate());
                }}
                id="select-date"
                className="absolute opacity-0 top-0 left-0"
              />
            </label>
            <label
              htmlFor="select-time"
              className=" cursor-pointer flex-1  flex flex-row border rounded-xl px-6 py-4 gap-x-3 relative"
            >
              <img src={Images.clock} className="w-6 h-6" />
              <div className="gap-y-2 flex flex-col">
                <BaseText locale medium>
                  Time
                </BaseText>
                <BaseText bold size={16}>
                  {formatHour(selectedDate, locale)}
                </BaseText>
              </div>
              <DatePicker
                id="select-time"
                picker="time"
                onChange={(date: any, dateString: any) => {
                  const newDate = moment(date.$d);
                  newDate.year(moment(selectedDate).year());
                  newDate.month(moment(selectedDate).month());
                  newDate.date(moment(selectedDate).date());
                  setSelectedDate(newDate.toDate());
                }}
                className="absolute opacity-0 top-0 left-0"
              />
            </label>
          </div>
        )}
      </div>
    );
  };

  const uploadImg = async () => {
    let newImgs = await Promise.all(
      await (blog?.images || []).map(async (item: any, index: number) => {
        if (typeof item === "string") {
          return item;
        } else {
          try {
            if (!item) return;
            const img = await UploadApi.uploadMultipleImages([item]);
            return img.high_quality_images[0].url;
          } catch (error) {
            return item;
          }
        }
      })
    );
    setImages(newImgs);
    return newImgs;
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const imgs = await uploadImg();
      if (!blog?.id) {
        const respon = await BlogApi.create({
          ...blog,
          images: imgs,
          thumbnails: imgs,
        });
        setBlog(respon);
        showSuccess("Created successfully");
      } else {
        await BlogApi.update(blog?.id, {
          ...blog,
          images: imgs,
          thumbnails: imgs,
        });
        showSuccess("Updated successfully");
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImagesChange = async (data: any) => {
    setImages(data.filter((item: any) => !!item));
  };

  return (
    <div className="flex-1 justify-center flex border-r p-6 overflow-auto no-scrollbar">
      <div className="max-w-[600px]">
        <BaseText bold size={16} locale>
          Representative image
        </BaseText>
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* <BaseButton className="mt-6 w-full !bg-darkNight50 justify-between">
          <BaseText locale className="text-primary" medium>
            Theme/Category
          </BaseText>
          <img src={Images.chevronRightTiny} className="w-6 h-6" />
        </BaseButton> */}
        <div className="mt-4"></div>
        <div className=" w-[420px]">
          <ListSelectImageDrag
            size="small"
            onImagesChange={handleImagesChange}
            listImages={images}
          />
        </div>
        <BaseInputSelect
          title="Thema"
          onChange={(value: any) => {
            getCategories(value);
            setCateSelected(null);
            setThemaSelected(value);
          }}
          defaultValue={themas[0] ? themaSelected : null}
          value={0}
          allowClear={false}
          textInputSize={12}
          className="mt-6"
          styleInputContainer="!h-[48px]"
          placeholder="Select"
          options={themas.map((item, index) => {
            return {
              label: item.name || "",
              value: item.id || "",
            };
          })}
        />
        {/* ///////////////////////////////////// */}
        {/* ///////////////   Category  ////////////////////// */}
        {themaSelected && (
          <BaseInputSelect
            title="Category"
            onChange={(value: any) => {
              setCateSelected(value);
            }}
            defaultValue={categories[0] ? cateSelected : null}
            allowClear={false}
            textInputSize={12}
            className="mt-6"
            styleInputContainer="!h-[48px]"
            placeholder="Select"
            options={categories.map((item, index) => {
              return {
                label: item.name || "",
                value: item.id || "",
              };
            })}
          />
        )}
        {/* ///////////////////////////////////// */}
        {/* /////////////////  Title   //////////////////// */}
        <BaseInput
          title="Title"
          className="mt-6"
          defaultValue={title}
          value={title}
          onChange={(value) => setTitle(value)}
          placeholder="Please enter a title"
        />
        {/* ///////////////////////////////////// */}
        {/* ////////////////   Content  ///////////////////// */}
        <div className="h-6"></div>
        <BaseText locale bold>
          Content
        </BaseText>
        <div className="h-[18px]"></div>
        <BaseEditor
          defaultValue={defaultContent}
          value={content}
          onChange={(value: string) => setContent(value)}
        />
        {/* ///////////////////////////////////// */}
        {/* /////////////////   Hashtag  //////////////////// */}
        <BaseInput
          title="Hashtag"
          className="mt-6"
          clearOnSave
          onSave={(value) => {
            setHashTags([...hashTags, value]);
          }}
          placeholder="#Hashtags (maximum 30)"
        />
        <div className="flex flex-wrap flex-row gap-x-3">
          {[
            hashTags.map((item, index) => (
              <div
                key={index}
                className="relative  mt-3 px-4 py-1 bg-darkNight100 rounded-full flex justify-center items-center"
              >
                <BaseText medium>#{item}</BaseText>
                <div
                  onClick={() =>
                    setHashTags(hashTags.filter((item, i) => index !== i))
                  }
                  className="cursor-pointer absolute p-1 bg-white rounded-full  border-[2px] top-[-4px] right-[-4px]"
                >
                  <img src={Images.cancel} className="w-2 h-2" />
                </div>
              </div>
            )),
          ]}
        </div>
        {buildPublicationTime()}
        {/* ///////////////////////////////////// */}
        {/* /////////////////   Submit  //////////////////// */}
        <BaseButton onClick={onSubmit} className="w-full mt-6">
          Blog post
        </BaseButton>
        <div className="h-10"></div>
      </div>
    </div>
  );
};
