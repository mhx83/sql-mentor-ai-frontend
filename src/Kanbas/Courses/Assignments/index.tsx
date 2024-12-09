import AssignmentControls from "./AssignmentControls"
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { BsGripVertical } from 'react-icons/bs'
import { GoTriangleDown } from "react-icons/go";
import { PiNotePencil } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as courseClient from "../client";
import { setAssignment } from "./reducer";
import { useEffect } from "react";

export default function Assignments() {

    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    const fetchAssignemnts = async () => {
        const assignments = await courseClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignment(assignments));
    };
    useEffect(() => {
        fetchAssignemnts();
    }, [cid]);

    const formatDate = (date: any) => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div id="wd-assignments">
            {currentUser.role === "FACULTY" &&
                <div>
                    <AssignmentControls /><br /><br />
                </div>
            }
            <ul id="wd-assignments" className="list-group rounded-0 ms-4 me-3 mt-4">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="fs-3" />
                    <GoTriangleDown className="me-1 fs-4" />
                    <strong>ASSIGNMENTS</strong>
                    {currentUser.role === "FACULTY" &&
                        <>
                            <AssignmentsControlButtons />
                        </>
                    }
                </div>

                {assignments.map((assignment: any) => (
                    <ul className="wd-assignments list-group rounded-0">
                        <li className="wd-assignments list-group-item ps-1 fs-5 border-gray">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-2" />
                                <PiNotePencil className="fs-2" />
                                <div className="mt-2 mb-2 flex-grow-1">
                                    <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="text-black text-decoration-none">
                                        <ul><strong>{assignment.title}</strong></ul></Link>
                                    <ul className="wd-assignment-description"><span className="text-danger">Multiple Modules </span>
                                        | <strong> Not Available until</strong> {formatDate(assignment.available_from)} at 12:00am | </ul>
                                    <ul className="wd-assignment-description"> <strong>Due </strong> {formatDate(assignment.due_date)} at 11:59pm |&nbsp;
                                        {assignment.points} pts </ul>
                                </div>
                                {currentUser.role === "FACULTY" &&
                                    <>
                                        <AssignmentControlButtons assignmentID={assignment._id} />
                                    </>
                                }
                            </div></li>
                    </ul>
                ))}
            </ul>
        </div>
    );
}