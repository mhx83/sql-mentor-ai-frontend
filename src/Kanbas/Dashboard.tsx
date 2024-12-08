import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard(

    { courses, course, enrolling, setEnrolling, updateEnrollment, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (course: any) => void;
            updateCourse: () => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
            updateEnrollment: (courseId: string, enrolled: boolean) => void
        }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const createClass = () => {
        const newCourse = addNewCourse();
    }

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {currentUser.role === "FACULTY" &&
                <div>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={createClass}> Add </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">Update</button>
                    </h5>
                    <br />
                    <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} /><hr />
                </div>
            }
            <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                {enrolling ? "My Courses" : "All Courses"}
            </button>
            {!enrolling ?
                <>
                    <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2><hr />
                </> :
                <>
                    <h2 id="wd-dashboard-published">Courses Available For Enrollment ({courses.length})</h2><hr />
                </>
            }

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {enrolling && courses.map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <img src={`/images/${course.name}.jpg`} width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        {course.name}
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                        {course.description}
                                    </p>
                                    <button onClick={(event) => {
                                        event.preventDefault();
                                        updateEnrollment(course._id, !course.enrolled);
                                    }}
                                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                        {course.enrolled ? "Unenroll" : "Enroll"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!enrolling && courses.map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <img src={`/images/${course.name}.jpg`} width="100%" height={160} />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description}
                                        </p>
                                        <button className="btn btn-primary"> Go </button>
                                        {currentUser.role == "FACULTY" &&
                                            <><button id="wd-delete-course-click"
                                                className="btn btn-danger me-2 float-end"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }} > Delete </button>
                                                <button id="wd-edit-course-click"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }} className="btn btn-warning me-2 float-end" >
                                                    Edit </button></>}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}