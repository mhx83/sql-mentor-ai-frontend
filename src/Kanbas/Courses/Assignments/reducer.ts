import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: [],
    new_assignment_created: false,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {

        setAssignment: (state, action) => {
            state.assignments = action.payload;
        },

        addAssignment: (state, { payload: assignment }) => {
        const newAssignment: any = {
            _id: assignment._id,
            title: assignment.title,
            course: assignment.course,
            description: assignment.description,
            points: assignment.points,
            due: assignment.due,
            availableFrom: assignment.availableFrom,
            until: assignment.until,
        };
        state.assignments = [...state.assignments, newAssignment] as any;
        state.new_assignment_created = true;
        },

        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
            a._id === assignment._id ? assignment : a) as any;
        },

        deleteAssignment: (state, {payload: assignmentID}) => {
            state.assignments = state.assignments.filter((a: any) =>
            a._id !== assignmentID) as any;
        },

        switchCreationStatus: (state) => {
            if (state.new_assignment_created === true) {
                state.new_assignment_created = false;
            } else {
                state.new_assignment_created = true;
            }
        },
    }
});

export const {addAssignment, updateAssignment, deleteAssignment, switchCreationStatus, setAssignment} 
    = assignmentsSlice.actions;
export default assignmentsSlice.reducer;