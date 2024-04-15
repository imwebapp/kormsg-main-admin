import { useEffect, useState } from "react";
import { BaseEditor } from "../../../components";

export default function BranchIntroduction() {
  const [defaultContent, setDefaultContent] = useState("");
  const [content, setContent] = useState("");

  const callDetailContent = async () => {};

  useEffect(() => {
    console.log("content", content);

    callDetailContent();
  }, [content]);
  return (
    <BaseEditor
      defaultValue={defaultContent}
      value={content}
      onChange={(value: string) => setContent(value)}
    />
  );
}
