import { useEffect, useState } from "react";
import { BaseEditor } from "../../../components";
import { useTranslation } from "react-i18next";

export default function CompanyInformation() {
  const { t } = useTranslation();

  const [defaultContent, setDefaultContent] = useState("");
  const [content, setContent] = useState("");

  const callDetailContent = async () => {};

  useEffect(() => {
    callDetailContent();
  }, [content]);
  return (
    <div className="py-10 px-72">
      <div className="flex gap-5 justify-between font-bold whitespace-nowrap max-md:flex-wrap mb-4">
        <p className="my-auto text-lg leading-7 text-zinc-600">Content</p>
        <button className="justify-center px-5 py-3 text-base leading-6 text-white bg-blue-600 rounded-xl">
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