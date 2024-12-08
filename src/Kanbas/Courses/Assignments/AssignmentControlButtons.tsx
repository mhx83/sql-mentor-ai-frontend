import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import * as assignmentsClient from "./client";

export default function AssignmentControlButtons({assignmentID} : {assignmentID: string}) {

  const dispatch = useDispatch();

  const deleteCurrentAssignment = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this assignment?");
    if (isConfirmed) {
      await assignmentsClient.deleteAssignment(assignmentID);
      dispatch(deleteAssignment(assignmentID));
    }
  }

  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={deleteCurrentAssignment}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
    );
}