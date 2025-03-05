import Modules from "../Modules";
import Quizzes from "../Quizzes"
import CourseStatus from "./Status";
import { useSelector } from "react-redux";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaBell } from "react-icons/fa";

export default function Home() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Quizzes />
      </div>

      <div className="d-flex d-md-block">


        {currentUser.role === "FACULTY" ?

        <div>
          <CourseStatus />
        </div> :

        <div id="wd-course-status" style={{ width: "300px", marginLeft: "30px"}}>

          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <BiSolidBarChartAlt2 className="me-2 fs-5" /> View Course Screen </button>

          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <BiSolidBarChartAlt2 className="me-2 fs-5" /> New Analytics </button>

          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <FaBell className="me-2 fs-5" /> View Course Notifications </button>
        </div>}

      </div>
    </div>
  );
}