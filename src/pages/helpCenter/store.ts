import { create } from 'zustand';
import { QuestionInterface } from '../../entities/question.entity';

interface HelpCenterStateInterface {
    questionSelected?: QuestionInterface
    setQuestionSelected: (questionSelected: HelpCenterStateInterface['questionSelected']) => void;
}

export const useHelpCenterState = create<HelpCenterStateInterface>()(
    (set) => ({
        questionSelected: undefined,
        setQuestionSelected: (questionSelected) => set({ questionSelected }),
    })
);
