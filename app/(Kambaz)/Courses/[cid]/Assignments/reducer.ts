import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { assignments as assignments } from "../../../Database";


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
  assignments: assignments,
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

    setAssignments: (state, {payload:assignments}) => {
      state.assignments = assignments;
    }
  },
});

export const { addAssignment, updateAssignment, deleteAssignment ,setAssignments} =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
