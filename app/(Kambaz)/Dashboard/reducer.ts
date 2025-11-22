import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database";
interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: initialEnrollments || [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleEnrollment: (
      state,
      action: PayloadAction<{ userId: string; courseId: string }>
    ) => {
      const { userId, courseId } = action.payload;
      const existing = state.enrollments.find(
        (e) => e.user === userId && e.course === courseId
      );

      if (existing) {
        // Unenroll
        state.enrollments = state.enrollments.filter(
          (e) => !(e.user === userId && e.course === courseId)
        );
      } else {
        // Enroll
        state.enrollments.push({ user: userId, course: courseId });
      }
    },
    setEnrollments: (state, {payload:enrollments}) => {
      state.enrollments = enrollments;
    }
  },
});

export const { toggleEnrollment ,setEnrollments} = enrollmentSlice.actions;
export default enrollmentSlice.reducer;