import axiosClient from "./axiosClient";
import { ANSWER_QUESTION, APP_VERSION, QUESTION } from "./urlConfig";

export const QuestionApi = {
  getQuestions: async (params: any) => {
    const res: any = await axiosClient.get(`${QUESTION}`, { params });
    return res?.results?.objects
  },
  getAnswers: async (questionId?: string) => {
    const res: any = await axiosClient.get(`${ANSWER_QUESTION}?fields=["$all",{"user":["nickname","avatar"]},{"answer_child":["$all",{"user":["nickname","avatar"]}]}]&filter={"question_id":"${questionId}"}&order=[["answer_child","created_at_unix_timestamp","ASC"]]`);
    return res?.results?.objects
  },
  createAnswer: async (questionId: string, data: any) => {
    return await axiosClient.post(`${QUESTION}/${ANSWER_QUESTION}/${questionId}`, data);
  },
};
