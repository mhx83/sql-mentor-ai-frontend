import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";
import { useNavigate } from "react-router-dom";
import * as coursesClient from "../client";
import * as quizClient from "./client";

export default function QuizControls() {

    const { cid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addNewQuiz = async () => {

        if (!cid) return;

        const newQuiz = {
            name: "New Quiz",
            course: cid,
            num_of_questions: 10,
            quiz_type: "Graded Quiz",
            points: 100,
            assignment_group: "QUIZZES",
            publish_status: "unpublished"
        };

        const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
        dispatch(addQuiz(quiz));
    }

    return (
        <div id="wd-assignments-controls" className="text-nowrap me-3">

            <button id="wd-add-module-btn" onClick={addNewQuiz}
                className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz</button>

            <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-2 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group</button>

            <div className="input-group pt-2 d-flex align-items-center ms-4" style={{ width: "300px" }}>
                <span className="input-group-text"><CiSearch className="fs-4" /></span>
                <input id="wd-search-assignment" className="form-control" placeholder="Search..." />
            </div>

        </div>
    );
}