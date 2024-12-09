import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     questions: [],
//     answers: {}, // 新增，用于存储每个问题的答案，键为问题ID
// };

const initialState: {
    questions: any[]; // 问题列表
    answers: Record<string, any>; // 答案状态，以 questionId 为键
} = {
    questions: [],
    answers: {}, // 初始化为一个空对象
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {

        setQuestions: (state, action) => {
            state.questions = action.payload;
        },

        addQuestion: (state, { payload: question }) => {
            const newQuestion: any = {
                _id: question._id,
                type: question.type,
                quiz: question.quiz,
                description: question.description,
                points: question.number,
                possible_answers: question.possible_answers,
                correct_answer: question.correct_answer,
            };
            state.questions = [...state.questions, newQuestion] as any;
        },

        updateQuestion: (state, { payload: question }) => {
            state.questions = state.questions.map((a: any) =>
                a._id === question._id ? question : a) as any;
        },

        deleteQuestion: (state, { payload: questionID }) => {
            state.questions = state.questions.filter((a: any) =>
                a._id !== questionID) as any;
        },

        setAnswer: (state, { payload: { questionId, answer } }) => {
            state.answers[questionId] = answer; // 更新答案状态
        },

        clearAnswers: (state) => {
            state.answers = {}; // 清空答案状态
        },
    }
});

export const { addQuestion, updateQuestion, deleteQuestion, setQuestions, setAnswer, clearAnswers } = questionsSlice.actions;
export default questionsSlice.reducer;