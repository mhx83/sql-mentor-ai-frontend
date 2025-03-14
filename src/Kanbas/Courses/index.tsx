import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Questions from "./Quizzes/Questions";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import QuestionEditor from "./Quizzes/Questions/Editor";
import QuestionView from "./Quizzes/Questions/QuestionView";
import ResultPage from "./Quizzes/ResultPage";

import { useEffect, useState } from "react";
import * as courseClient from "./client";

export default function Courses({ courses }: { courses: any[]; }) {

    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const course = courses.find((course) => course._id === Number(cid));
    const { pathname } = useLocation();

    const fetchUsers = async () => {
        if (!cid) return
        const users = await courseClient.findUsersForCourse(cid);
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger"><FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]} </h2><hr />

            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>

                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        {/*屏蔽掉Assignment和Modules模块*/}
                        {/*<Route path="Modules" element={<Modules />} />*/}
                        {/*<Route path="Assignments" element={<Assignments />} />*/}
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={<QuizEditor />} />
                        <Route path="Quizzes/:qid/Questions" element={<Questions />} />
                        <Route path="Quizzes/:qid/Questions/:qaid" element={<QuestionEditor />} />
                        <Route path="Quizzes/:qid/Questions/View/:qaid" element={<QuestionView />} />
                        <Route path="Quizzes/:qid/Result" element={<ResultPage />} />
                        <Route path="/Kanbas/Courses/:cid/Quizzes/:qid/Result" element={<ResultPage />} />
                        {/* <Route path="/Kanbas/Courses/:cid/Quizzes/:qid/Result" element={<ResultPage />}/> */}
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable users={users} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}