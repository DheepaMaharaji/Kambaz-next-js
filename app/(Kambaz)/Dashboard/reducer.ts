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
    },
    addEnrollment(state, action: PayloadAction<Enrollment>) {
      // Only add if not already enrolled
      const exists = state.enrollments.some(
        (e) =>
          e.user === action.payload.user && e.course === action.payload.course
      );
      if (!exists) {
        state.enrollments.push(action.payload);
      }
    },
    removeEnrollment(state, action: PayloadAction<{ user: string; course: string }>) {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.user && e.course=== action.payload.course)
      );
    },
  },
});

export const { toggleEnrollment ,setEnrollments,addEnrollment,removeEnrollment} = enrollmentSlice.actions;
export default enrollmentSlice.reducer;