import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addAssignment } from "./reducer";
import { useNavigate } from "react-router-dom";
import * as courseClient from "../client";

export default function AssignmentControls(){

  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewAssignment = async () => {
    if (!cid) return;

    const newAssignment = {
        title: "New Assignment",
        course: cid,
        description: "New Description",
        points: 100,
        due: "2025-05-01",
        availableFrom: "2025-05-09",
        until: "2025-05-10",
    }
    const assignment = await courseClient.createAssignmentForCourse(cid, newAssignment);

    navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`);
    dispatch(addAssignment(assignment));
  }

  return (
    <div id="wd-assignments-controls" className="text-nowrap me-2">

      <button id="wd-add-module-btn" onClick={addNewAssignment}
      className="btn btn-lg btn-danger me-1 float-end">
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      Assignment</button>

      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-2 float-end">
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      Group</button>

      <div className="input-group pt-2 d-flex align-items-center" style={{width: "300px"}}>
      <span className="input-group-text"><CiSearch className="fs-4"/></span>
      <input id="wd-search-assignment" className="form-control"  placeholder="Search..." />
      </div>

    </div>
    );
}