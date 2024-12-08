import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrollments: [],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, {payload: enrollment}) => {
            const newEnrollment: any = {
                _id: enrollment._id,
                user: enrollment.user,
                course: enrollment.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },

        dropEnrollment: (state, {payload: enrollmentID}) => {
            state.enrollments = state.enrollments.filter((e: any) =>
            e._id !== enrollmentID) as any;
        },
    },
});

export const {addEnrollment, dropEnrollment} = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;