import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import * as analyticsClient from "./client"
import {useSelector} from "react-redux";

export default function Grade({ courses }: { courses: any[]; }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [course, setCourse] = useState(courses[0]);
  const [grade, setGrade] = useState(0);
  const [courseData, setCourseData] = useState<{ name: string; grade: number; type: string }[]>([]);

  const fetchCourseData = async () => {
    if (!course) return;
    const gradeData = await analyticsClient.findCourseGrades(String(currentUser._id), String(currentUser.role), String(course._id), );
    const averageGrade = await analyticsClient.findCourseAverageGrades(String(currentUser._id), String(currentUser.role), String(course._id));
    setCourseData(gradeData);
    setGrade(averageGrade);
  };

  useEffect(() => {
    fetchCourseData()
  }, [course]);

  const submittedData = courseData.filter((d) => d.type === "submitted");
  const missingData = courseData.filter((d) => d.type === "missing");

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <label htmlFor="wd-course" className="mb-0 col-form-label"><strong>Select Course</strong></label>
        <div className="col-sm-10">
          <select className="form-select w-auto"
                  value={course.name} onChange={(e) => setCourse(courses.find(c => c.name === e.target.value))}>
            {courses.map((currentCourse) => (
              <option key={currentCourse.name} value={currentCourse.name}>
                {currentCourse.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br/>

      <div className="d-flex align-items-center">
        <div>
          <span
            className="fs-4 ms-1">{currentUser.role === "STUDENT" ? "Grade: " : "Average Grade of Registered Students: "}</span>
          <span className="fw-bold fs-3">{grade}%</span>
        </div>
      </div>

      <div style={{textAlign: "center"}} className="mt-3">
        <h3 className="me-5">{course.name}</h3>
        <ResponsiveContainer width="90%" height={450}>
          <ScatterChart margin={{top: 10, bottom: 20, left: 10, right: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
              dataKey="name"
              label={{
                value: currentUser.role === "STUDENT" ? "Quiz Name" : "Student Name",
                position: "insideBottom", offset: -10,
                style: {fill: "black", fontSize: 18, fontWeight: "bold"}
              }}
              type="category"
              allowDuplicatedCategory={false}/>
            <YAxis dataKey="grade" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`}
                   label={{
                     value: "Grade", angle: -90, position: "insideLeft",
                     style: {fill: "black", fontSize: 18, fontWeight: "bold"}
                   }}/>
            <Tooltip cursor={{strokeDasharray: "3 3"}}/>
            <Scatter name="Submitted" data={submittedData} fill="#007bff"/>
            <Scatter name="Missing" data={missingData} fill="white" stroke="#007bff"/>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
