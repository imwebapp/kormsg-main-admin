import { useEffect, useState } from "react";
import { BaseEditor } from "../../components";
import BaseButton from "../../components/baseButton";
const ToolBoxPage = () => {
  const [content, setContent] = useState("");
  const [defaultContent, setDefaultContent] = useState("");

  const handleMessage = (event: any) => {
    const message = event;
    if (message.data.type !== "webpackWarnings") {
      setDefaultContent(message.data.html || message.data);
    } else {
      setDefaultContent("<>");
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const toHtml = () => {
    window.postMessage(content, "*");
    window.parent.postMessage(content, "*");
  };

  return (
    <>
      <BaseEditor
        defaultValue={defaultContent}
        value={content}
        onChange={(value: string) => setContent(value)}
        height={"500px"}
      />
      <div className="w-full flex justify-center items-center flex-row">
        <div>
          <BaseButton onClick={toHtml}> 입력하기 </BaseButton>
        </div>
      </div>
    </>
  );
};

export default ToolBoxPage;
