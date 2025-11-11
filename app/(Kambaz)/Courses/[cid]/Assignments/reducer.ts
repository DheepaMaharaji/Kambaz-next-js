import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { assignments as initialAssignments } from "../../../Database";


export type Assignment = {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  course: string;
};


interface AssignmentsState {
  assignments: Assignment[];
}


const initialState: AssignmentsState = {
  assignments: initialAssignments.map((a) => ({
    _id: a._id ?? uuidv4(),
    title: a.title ?? "",
    description: a.description ?? "",
    points: a.points ?? 100,
    dueDate: a.dueDate ?? "",
    availableDate: a.availableDate ?? "",
    untilDate: a.untilDate ?? "",
    course: a.course ?? "",
  })),
};


const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<Omit<Assignment, "_id">>
    ) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        ...action.payload,
      };
      state.assignments.push(newAssignment);
    },

    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },

    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
