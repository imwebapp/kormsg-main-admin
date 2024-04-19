import { useEffect, useState } from "react";
import { BaseEditor } from "../../../components";
import { useTranslation } from "react-i18next";
import { settingApi } from "../../../apis/settingApi";
import { showSuccess } from "../../../utils/showToast";

export default function BranchIntroduction() {
  const { t } = useTranslation();

  const [defaultContent, setDefaultContent] = useState("");
  const [content, setContent] = useState("");
  const [settingBrand, setSettingBrand] = useState<any>();
  const getSettingPage = async () => {
    try {
      const params = {
        fields: '["$all"]',
        filter: JSON.stringify({ field: "BRAND_INTRODUCTION" }),
      };
      let result: any = await settingApi.getList(params);
      if (result.code === 200) {
        setSettingBrand(result?.results?.objects?.rows[0]);
        setDefaultContent(result?.results?.objects?.rows[0].value);
      }
    } catch (error) {}
  };
  const submitSettingBrand = async () => {
    try {
      const data = {
        value: content,
      };
      let result: any = await settingApi.updateSetting(settingBrand.id, data);
      if (result.code === 200) {
        showSuccess("Update Brand Introduction Success");
      }
    } catch (error) {}
  };
  useEffect(() => {
    getSettingPage();
    return () => {};
  }, []);
  return (
    <div className="py-10 px-72">
      <div className="flex gap-5 justify-between font-bold whitespace-nowrap max-md:flex-wrap mb-4">
        <p className="my-auto text-lg leading-7 text-zinc-600">
          {t("Content")}
        </p>
        <button
          className="justify-center px-5 py-3 text-base leading-6 text-white bg-blue-600 rounded-xl"
          onClick={() => {
            submitSettingBrand();
          }}
        >
          {t("Update")}
        </button>
      </div>
      <BaseEditor
        defaultValue={defaultContent}
        value={content}
        onChange={(value: string) => setContent(value)}
        height={"2000px"}
      />
    </div>
  );
}
