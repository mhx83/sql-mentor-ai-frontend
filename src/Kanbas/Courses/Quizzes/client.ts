import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quiz._id}`, quiz);
    return data;
};

export const setPublishStatus = async (quizId: string, newStatus: string) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}/status`, {newStatus});
    return data;
};

export const getQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}`);
    return data;
};

export const getQuestions = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/questions`);
    return data;
};

export const createQuestion = async (quiz: any, question: any) => {
    const { data } = await axiosWithCredentials.post(`${QUIZ_API}/${quiz._id}/questions`, question);
    return data;
};

export const getPublishedQuiz = async () => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/published`);
    return data;
}

export const submitQuiz = async (quizId: string, answers: Record<string, any>) => {
    const { data } = await axiosWithCredentials.post(`${QUIZ_API}/${quizId}/submit`, { answers });
    return data;
};

export const lastAttempt = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/lastAttempt`);
    return data;
};

export const getPoints = async (quizId: string) => {
    const { data: questions } = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}/questions`);
    const totalPoints = questions.reduce((sum: number, question: any) => sum + (question.points || 0), 0);
    return totalPoints;
};
