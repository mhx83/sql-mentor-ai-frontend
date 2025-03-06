// import { useLocation, useNavigate, useParams } from "react-router";
// import QuestionsNavigation from "./Navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import * as quizzesClient from "../client";
// import { setQuestions, setAnswer } from "./reducer";

// export default function QuestionView() {

//     const location = useLocation();
//     const currentPath = location.pathname;
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { qid, qaid } = useParams();
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const [questionType, setQuestionType] = useState<any>("multiple choice");
//     const { questions } = useSelector((state: any) => state.questionsReducer);
//     const question = questions.find((question: any) => question._id === qaid);
//     const questionTypes = ["multiple choice", "fill in the blank", "true or false"];

//     const [description, setDescription] = useState(question && question.description);
//     const [points, setPoints] = useState(question && question.points);
//     const [possibleAnswers, setPossibleAnswers] = useState<string[]>(question && question.possible_answers);
//     const [correctAnswer, setCorrectAnswer] = useState<any>();

//     const fetchQuestions = async () => {
//         if (!qid) return;
//         const questions = await quizzesClient.getQuestions(qid);
//         dispatch(setQuestions(questions));
//     }; useEffect(() => {
//         fetchQuestions();
//     }, [qid]);

//     const setQuestion = () => {
//         if (!question) return;
//         setQuestionType(question.type);
//         setDescription(question.description);
//         setPossibleAnswers(question.possible_answers);
//         setPoints(question.points);
//         setCorrectAnswer(question.correct_answer);
//     }; useEffect(() => {
//         setQuestion()
//     }, [question]);

//     const goToNextQuestion = () => {
//         let index = questions.findIndex((q: any) => q._id === question._id);
//         if (index < questions.length - 1) {
//             index += 1;
//         }
//         navigate(`${currentPath.replace(`/${qaid}`, `/${questions[index]._id}`)}`);
//     }

//     const goToPreviousQuestion = () => {
//         let index = questions.findIndex((q: any) => q._id === question._id);
//         if (index > 0) {
//             index -= 1;
//         }
//         navigate(`${currentPath.replace(`/${qaid}`, `/${questions[index]._id}`)}`);
//     }

//     // const [answers, setAnswers] = useState<Record<string, any>>({}); // 存储所有答案
//     const submitQuiz = async () => {
//         if (!qid || !Object.keys(answers).length) {
//             alert("Please complete at least one question before submitting.");
//             return;
//         }

//         try {
//             await quizzesClient.submitQuiz(qid, answers); // 提交答案
//             alert("Quiz submitted successfully!");
//         } catch (e) {
//             alert("Failed to submit the quiz. Please try again.");
//         }
//     };

    
//     const { answers } = useSelector((state: any) => state.questionsReducer); // 获取 Redux 中的答案

//     const handleAnswerChange = (questionId: string, answer: any) => {
//         dispatch(setAnswer({ questionId, answer })); // 将答案存入 Redux
//     };

//     return (
//         <div id="wd-questions-view">

//             <div className="d-flex justify-content-between">
//                 <form className="flex-grow-1 d-flex justify-content-center">
//                     <div className="position-relative">

//                         {currentUser.role === "FACULTY" &&
//                             <label className="bg-danger bg-opacity-10 text-danger ms-5 mt-4 
//                 d-flex justify-content-center align-items-center rounded py-3">
//                                 <strong>Note: This is a preview of the published version of the quiz</strong></label>
//                         }

//                         <div className="card ms-5 mb-4 mt-5">
//                             <div className="card-header fw-bold">
//                                 Question {questions.findIndex((q: any) => q._id === question._id) + 1}
//                                 <span className="float-end">{points} Points</span>
//                             </div>

//                             <div className="card-body">
//                                 <div className="form-group row mb-1 mt-5 border-bottom">
//                                     <div>
//                                         <div dangerouslySetInnerHTML={{ __html: description }}></div><br /><br />
//                                     </div>
//                                 </div>

//                                 {question && questionType === "multiple choice" &&
//                                     <>

//                                         <div className="form-group row mb-2">
//                                             <label htmlFor="wd-description" className="col-form-label"><strong>Choices</strong> &nbsp;
//                                                 (Please select <strong>one</strong> that best describes the answer)</label>
//                                             {possibleAnswers && possibleAnswers.map((choice: string, index: number) => (
//                                                 <div className="d-flex align-items-center mt-1 border-bottom">
//                                                     <input type="radio" name="multiple-choice" value={choice}
//                                                         onChange={(e) => setCorrectAnswer(e.target.value)} />
//                                                     <label htmlFor={`choice-${index}`} className="ms-4">{choice}</label><hr />
//                                                 </div>
//                                             ))}
//                                         </div>

//                                     </>
//                                 }

//                                 {question && questionType === "fill in the blank" &&
//                                     <>

//                                         <div className="form-group row mb-2">
//                                             <label htmlFor="wd-description" className="col-form-label"><strong>Your Answer</strong> &nbsp;
//                                                 (Please enter the correct answer in the blank)</label>
//                                             <input type="text" className="form-control ms-2 mt-3 w-50" />
//                                         </div>

//                                     </>
//                                 }


//                                 {question && questionType === "true or false" &&
//                                     <>
//                                         <div className="form-group row mb-2">

//                                             <label htmlFor="wd-description" className="col-form-label "><strong>True or False</strong>&nbsp;
//                                                 (Please select <strong>one</strong> that best describes the answer)</label>

//                                             <div className="d-flex align-items-center mt-4 border-bottom">
//                                                 <input id="true" type="radio" name="true-or-false" value="true" />
//                                                 <label className="ms-2" htmlFor="true">True</label>
//                                             </div>

//                                             <div className="d-flex align-items-center mt-4 border-bottom">
//                                                 <input id="false" type="radio" name="true-or-false" value="false" />
//                                                 <label className="ms-2" htmlFor="false">False</label>
//                                             </div>

//                                         </div>

//                                     </>
//                                 }

//                             </div>
//                         </div>

//                         {questions.findIndex((q: any) => q._id === question._id) !== 0 &&
//                             <button className="btn btn-secondary ms-5" onClick={goToPreviousQuestion}>Previous</button>
//                         }

//                         {questions.findIndex((q: any) => q._id === question._id) + 1 !== questions.length &&
//                             <button className="btn btn-secondary float-end" onClick={goToNextQuestion}>Next</button>
//                         }

//                     </div>
//                 </form>

//                 <div>
//                     <QuestionsNavigation questions={questions} />
//                 </div>

//             </div>
//             <hr />
//             {/* <button className="btn btn-danger float-end">Submit Quiz</button> */}
//             <button className="btn btn-danger float-end" onClick={submitQuiz}>
//                 Submit Quiz
//             </button>
//         </div>
//     );
// }

import { useLocation, useNavigate, useParams } from "react-router";
import QuestionsNavigation from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizzesClient from "../client";
import { setQuestions, setAnswer, clearAnswers } from "./reducer";
import { Link } from "react-router-dom";

export default function QuestionView() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cid, qid, qaid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { questions, answers } = useSelector((state: any) => state.questionsReducer);
    const question = questions.find((q: any) => q._id === Number(qaid));

    // Local state for question-specific details
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);
    const [questionType, setQuestionType] = useState<string>("");

    // Fetch questions for the quiz
    const fetchQuestions = async () => {
        if (!qid) return;
        const questions = await quizzesClient.getQuestions(qid);
        dispatch(setQuestions(questions));
    };
    useEffect(() => {
        fetchQuestions();
    }, [qid]);

    // Update local state whenever the question changes
    const setQuestion = () => {
        if (!question) return;
        setQuestionType(question.type);
        setDescription(question.description);
        setPossibleAnswers(question.possible_answers);
        setPoints(question.points);
    };
    useEffect(() => {
        setQuestion();
    }, [question]);

    // Navigation between questions
    const goToNextQuestion = () => {
        let index = questions.findIndex((q: any) => q._id === question._id);
        if (index < questions.length - 1) {
            index += 1;
        }
        navigate(currentPath.replace(/\/View\/\d+$/, `/View/${questions[index]._id}`));
    };

    const goToPreviousQuestion = () => {
        let index = questions.findIndex((q: any) => q._id === question._id);
        if (index > 0) {
            index -= 1;
        }
        navigate(`${currentPath.replace(`/${qaid}`, `/${questions[index]._id}`)}`);
    };

    // Handle answer changes
    const handleAnswerChange = (questionId: string, answer: any) => {
        dispatch(setAnswer({ questionId, answer })); // Update Redux state
    };

    // Submit the quiz
    const submitQuiz = async () => {
        if (!qid || !Object.keys(answers).length) {
            alert("Please complete at least one question before submitting.");
            return;
        }

        try {
            // await quizzesClient.submitQuiz(qid, answers); // Submit answers to the backend
            // alert("Quiz submitted successfully!");
            const data = await quizzesClient.submitQuiz(qid, answers);
            console.log("cid:", cid);
            console.log("qid:", qid);
            console.log("data:", data);
            // navigate(`/Kanbas/Courses/${qid}/Result`, { state: data });
            dispatch(clearAnswers());
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Result`, { state: data });
        } catch (e) {
            console.error("Error details:", e);
            alert("Failed to submit the quiz. Please try again.");
        }
    };

    return (
        <div id="wd-questions-view">
            <div className="d-flex justify-content-between">
                <form className="flex-grow-1 d-flex justify-content-center">
                    <div className="position-relative">
                        {currentUser.role === "FACULTY" && (
                            <label className="bg-danger bg-opacity-10 text-danger ms-5 mt-4 d-flex justify-content-center align-items-center rounded py-3">
                                <strong>Note: This is a preview of the published version of the quiz</strong>
                            </label>
                        )}

                        <div className="card ms-5 mb-4 mt-5">
                            <div className="card-header fw-bold">
                                Question {questions.findIndex((q: any) => q._id === question._id) + 1}
                                <span className="float-end">{points} Points</span>
                            </div>

                            <div className="card-body">
                                <div className="form-group row mb-1 mt-5 border-bottom">
                                    <div dangerouslySetInnerHTML={{ __html: description }}></div>
                                </div>

                                {/* Multiple Choice */}
                                {question && questionType === "multiple choice" && (
                                    <>
                                        <label htmlFor="wd-description" className="col-form-label">
                                            <strong>Choices</strong> &nbsp;(Please select <strong>one</strong>)
                                        </label>
                                        {possibleAnswers.map((choice, index) => (
                                            <div className="d-flex align-items-center mt-1 border-bottom" key={index}>
                                                <input
                                                    type="radio"
                                                    name={`multiple-choice-${question._id}`}
                                                    value={choice}
                                                    checked={answers[question._id] === choice}
                                                    onChange={() => handleAnswerChange(question._id, choice)}
                                                />
                                                <label className="ms-4">{choice}</label>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* Fill in the Blank */}
                                {question && questionType === "fill in the blank" && (
                                    <>
                                        <label htmlFor="wd-description" className="col-form-label">
                                            <strong>Your Answer</strong> &nbsp;(Please enter the correct answer)
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control ms-2 mt-3 w-50"
                                            value={answers[question._id] || ""}
                                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                        />
                                    </>
                                )}

                                {/* True or False */}
                                {question && questionType === "true or false" && (
                                    <>
                                        <label htmlFor="wd-description" className="col-form-label">
                                            <strong>True or False</strong>&nbsp;(Please select <strong>one</strong>)
                                        </label>
                                        <div className="d-flex align-items-center mt-4 border-bottom">
                                            <input
                                                type="radio"
                                                name={`true-or-false-${question._id}`}
                                                value="true"
                                                checked={answers[question._id] === "true"}
                                                onChange={() => handleAnswerChange(question._id, "true")}
                                            />
                                            <label className="ms-2">True</label>
                                        </div>
                                        <div className="d-flex align-items-center mt-4 border-bottom">
                                            <input
                                                type="radio"
                                                name={`true-or-false-${question._id}`}
                                                value="false"
                                                checked={answers[question._id] === "false"}
                                                onChange={() => handleAnswerChange(question._id, "false")}
                                            />
                                            <label className="ms-2">False</label>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        {questions.findIndex((q: any) => q._id === question._id) !== 0 && (
                            <button
                                type="button"
                                className="btn btn-secondary ms-5"
                                onClick={goToPreviousQuestion}
                            >
                                Previous
                            </button>
                        )}
                        {questions.findIndex((q: any) => q._id === question._id) + 1 !== questions.length && (
                            <button
                                type="button"
                                className="btn btn-secondary float-end"
                                onClick={goToNextQuestion}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </form>

                <div>
                    <QuestionsNavigation questions={questions} />
                </div>
            </div>
            <hr />
            <div className="float-end d-flex justify-content-end">

            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`} className="btn btn-light border me-2">Go Back</Link>
            <button className="btn btn-danger float-end" onClick={submitQuiz}>
                Submit Quiz
            </button>
            </div>

        </div>
    );
}
