import { useEffect, useState } from "react";
import Images from "../../../assets/gen";
import { BaseText } from "../../../components";
import {
  classNames,
  convertParams,
  formatHour,
  formatTime,
  formatTimeFull,
} from "../../../utils/common";
import { useHelpCenterState } from "../store";
import { QuestionApi } from "../../../apis/questionApi";
import { AnswerInterface } from "../../../entities/answer.entity";
import { useLocalStorage } from "../../../stores/localStorage";
import { BaseInput } from "../../../components/input/BaseInput";
import BaseButton from "../../../components/baseButton";
import { UploadApi } from "../../../apis/uploadApi";
import { showError } from "../../../utils/showToast";
import { Modal, Spin } from "antd";
import '../index.css'
export const ViewRight = () => {
  const { questionSelected, setQuestionSelected } = useHelpCenterState(
    (state) => state
  );
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<AnswerInterface[]>([]);
  const [content, setContent] = useState("");
  const { locale } = useLocalStorage((state) => state);
  const [displayImg, setDisplayImg] = useState<string>("");

  const getAnswers = async () => {
    try {
      const { rows, count } = await QuestionApi.getAnswers(
        questionSelected?.id
      );
      setAnswers(rows[0].answer_child.reverse());
    } catch (error) {
      console.log("errr", error);
    }
  };

  useEffect(() => {
    if (questionSelected) getAnswers();
  }, [questionSelected]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const files = e.target.files;
      if (files && files[0]) {
        const img = await UploadApi.uploadMultipleImages(files);
        await QuestionApi.createAnswer(questionSelected?.id || "", {
          content: "",
          images: img.high_quality_images.map((item: any) => item.url),
          thumbnails: img.low_quality_images.map((item: any) => item.url),
        });
        getAnswers();
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    try {
      if (content.length === 0) return;
      await QuestionApi.createAnswer(questionSelected?.id || "", {
        content,
        images: [],
        thumbnails: [],
      });
      setContent("");
      getAnswers();
    } catch (error) {
      showError(error);
    }
  };

  const buildHeader = () => {
    return (
      <>
        <div className="p-4 border-b flex flex-col  justify-between items-start questionSelected?s-center px-6">
          <div className="flex flex-row h-[50px] ">
            <img
              onClick={() =>
                setDisplayImg(questionSelected?.user?.avatar ?? "")
              }
              className="w-11 h-11 rounded-full object-cover cursor-pointer"
              src={questionSelected?.user?.avatar || Images.userDefault}
            />
            <div className="flex flex-1 flex-col ml-4">
              <div className="flex flex-row questionSelected?s-center">
                <BaseText size={16} bold>
                  {questionSelected?.user?.nickname || ""}
                </BaseText>
              </div>
              <div className="flex flex-row questionSelected?s-center">
                <BaseText size={14} medium>
                  ({questionSelected?.user?.username || ""})
                </BaseText>
                <BaseText size={14} medium className="ml-1">
                  {questionSelected?.user?.phone || ""}
                </BaseText>
              </div>
            </div>
          </div>
          <BaseText>{questionSelected?.content || ""}</BaseText>
          {questionSelected?.images && questionSelected?.images[0] && (
            <div className="mt-2 flex flex-wrap flex-row gap-2">
              {questionSelected?.thumbnails?.map((item) => (
                <div>
                  <img
                    onClick={() => setDisplayImg(item)}
                    className="w-14 h-14 rounded object-cover"
                    src={item}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  const buildAdminMessage = (item: AnswerInterface) => {
    return (
      <div className="flex flex-row justify-end mt-4 ">
        <div className="flex flex-col buildStatus w-2/3 items-end">
          <div className="flex flex-row  gap-x-2">
            {item?.content && item?.content?.length > 0 && (
              <div className=" bg-[#DBE6FE] px-6 py-3 rounded-xl rounded-tr-none">
                <BaseText medium size={16}>
                  {item?.content || ""}
                </BaseText>
              </div>
            )}
            <img src={Images.logo} className="w-11 h-11 rounded-full" />
          </div>
          {item?.images && item?.images[0] && (
            <div className="mt-2 flex flex-wrap flex-row gap-2">
              {item?.images?.map((item: string) => (
                <div>
                  <img
                    onClick={() => setDisplayImg(item)}
                    className="w-14 h-14 rounded object-cover cursor-pointer"
                    src={item}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="rounded-full bg-[#F8FAFC] px-3 py-1 mt-1">
            <BaseText size={12} medium>
              {formatTimeFull(item.created_at || new Date(), locale)}
            </BaseText>
          </div>
        </div>
      </div>
    );
  };

  const buildCustomerMessage = (item: AnswerInterface) => {
    return (
      <div className="flex flex-row justify-start mt-4">
        <div className="flex flex-col buildStatus w-2/3 items-start">
          <div className="flex flex-row gap-x-2">
            <img
              src={item.user?.avatar || Images.userDefault}
              className="w-11 h-11 rounded-full"
            />
            {item?.content && item?.content?.length > 0 && (
              <div className="bg-[#EEF2F6] px-6 py-3 rounded-xl rounded-tl-none">
                <BaseText medium size={16}>
                  {item?.content || ""}
                </BaseText>
              </div>
            )}
          </div>
          {item?.images && item?.images[0] && (
            <div className="mt-2 flex flex-wrap flex-row gap-2">
              {item?.images?.map((item: string) => (
                <div>
                  <img
                    onClick={() => setDisplayImg(item)}
                    className="w-14 h-14 rounded object-cover cursor-pointer"
                    src={item}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="rounded-full bg-[#F8FAFC] px-3 py-1 mt-1">
            <BaseText size={12} medium>
              {formatTimeFull(item.created_at || new Date(), locale)}
            </BaseText>
          </div>
        </div>
      </div>
    );
  };

  const buildList = () => {
    return (
      <div className="overflow-auto h-full p-6 flex flex-col-reverse">
        {answers.map((item, index) => {
          if (item.user_id) return buildCustomerMessage(item);
          return buildAdminMessage(item);
        })}
      </div>
    );
  };

  const buildSendMessage = () => {
    return (
      <div className="h-[84px] border-t justify-between items-center flex flex-row px-4">
        <input
          multiple
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!!loading ? (
          <Spin />
        ) : (
          <label htmlFor="image-upload" className="cursor-pointer">
            <img src={Images.addFile} className="w-6 h-6" />
          </label>
        )}
        <BaseInput
          styleInputContainer="!py-1 pr-1"
          widgetRight={
            <div>
              <BaseButton onClick={sendMessage} className="!w-[80px] h-10">
                Send
              </BaseButton>
            </div>
          }
          value={content}
          placeholder="Write your feedback..."
          onChange={(value) => setContent(value)}
          className="flex-1 ml-4 "
        />
      </div>
    );
  };

  return (
    <div className="w-3/5 border-l min-w-[458px] h-[calc(100vh-72px)] flex flex-col">
      {questionSelected && (
        <>
          {buildHeader()}
          {buildList()}
          {buildSendMessage()}
        </>
      )}
      <Modal
        centered
        footer={false}
        closable={false}
        open={displayImg.length > 0}
        onCancel={() => setDisplayImg("")}
      >
        <div className="flex h-full w-full justify-center items-center">
          <img src={displayImg} className="h-full object-contain" />
        </div>
      </Modal>
    </div>
  );
};
