import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "../client";
import * as questionsClient from "./client";
import { setQuestions } from "./reducer";
import { useEffect } from "react";
import {current} from "@reduxjs/toolkit";

export default function Questions() {

    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { qid } = useParams();
    const { questions } = useSelector((state: any) => state.questionsReducer);

    const updateQuiz = async (questions: any[]) => {

        if (!qid) return;

        const quiz = await quizzesClient.getQuiz(qid);

        let sum = 0
        for (let i=0; i < questions.length; i++) {
            sum += questions[i].points;
        }

        const currentQuiz = {
            _id: qid,
            name: quiz.name,
            instruction: quiz.instruction,
            course: quiz.course,
            num_of_questions: questions.length,
            points: sum,
            quiz_type: quiz.quiz_type,
            assignment_group: quiz.assignment_group,
            difficulty: quiz.difficulty
          };
          await quizzesClient.updateQuiz(currentQuiz);
    }

    const fetchQuestions = async () => {
        if (!qid) return;
        const questions = await quizzesClient.getQuestions(qid);
        dispatch(setQuestions(questions));
        await updateQuiz(questions);
    }; useEffect(() => {
        fetchQuestions();
    }, [qid]);

    const addNewQuestion = async () => {

        if (!qid) return;

        const quiz = await quizzesClient.getQuiz(qid);

        const newQuestion = {
            type: "multiple choice",
            description: "New description",
            points: 1,
            possible_answers: [],
            correct_answer: null,
        }
        const createdQuestion = await quizzesClient.createQuestion(quiz, newQuestion);
        fetchQuestions();

        navigate(`${currentPath}/${createdQuestion._id}`);

    }

    return (
        <div className="wd-quizzes-editor">

            <div id="wd-css-navigating-with-tabs" className="ms-5 mt-2">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <Link to={`${currentPath.replace(`/Questions`, "")}`} className="nav-link text-danger"> Details </Link>
                    </li>
                    <li className="nav-item">
                    <Link to={`${currentPath}`} className="nav-link active"> Questions </Link>
                    </li>
                </ul>
            </div>
            <br />

            <button className="btn btn-danger float-end" onClick={addNewQuestion} >Add A Question</button>
        </div>

    );
}