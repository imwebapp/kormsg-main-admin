import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import "./index.css";
type BaseEditorProps = {
  value?: string;
  defaultValue?: string;
  onChange?: any;
};

export default function BaseEditor(props: BaseEditorProps) {
  const editorRef = useRef<any>(null);
  const config = {
    readonly: false,
    events: {
      afterInit: (instance: any) => {
        editorRef.current = instance;
      },
    },
    uploader: {
      insertImageAsBase64URI: false,
      url: `${BASE_URL}/image/upload_multiple/300/1920`,
      filesVariableName(i: number): string {
        return `images`;
      },
      isSuccess: function (resp: any) {
        return !resp.error;
      },
      getMessage: function (resp: any) {
        return resp.msg;
      },
      process: function (resp: any) {
        return resp;
      },
      defaultHandlerSuccess: function (data: any, resp: any) {
        try {
          const imgs = data.results.object.high_quality_images;
          for (let img of imgs) {
            editorRef.current.selection.insertImage(img.url);
          }
        } catch (error) {}
      },
      error: function (e: any) {},
    },
  };

  return (
    <>
      {useMemo(
        () => (
          <JoditEditor
            ref={editorRef}
            value={props.value || props.defaultValue || ""}
            config={config}
            onChange={(newContent) =>
              props.onChange && props.onChange(newContent)
            }
          />
        ),
        [props.defaultValue]
      )}
    </>
  );
}
