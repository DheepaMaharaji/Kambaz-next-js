import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// Define Lesson type
export type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
};

// Define Module type
export type Module = {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[]; // always an array
  editing: boolean;
};

// Define the slice state
interface ModulesState {
  modules: Module[];
}

// Initialize state, ensuring lessons is always an array
const initialState: ModulesState = {
  modules: initialModules.map((m) => ({
    ...m,
    editing: false,
    lessons: m.lessons ? m.lessons : [],
  })),
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {

    setModules: (state, action) => {
      state.modules = action.payload;
    },

    

    // Add a new module
    addModule: (state, action: PayloadAction<Omit<Module, "_id" | "editing" | "lessons">>) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        editing: false,
        ...action.payload,
      };
      state.modules.push(newModule);
    },

    // Delete a module by id
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    // Update a module
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },

    // Set module to editing mode
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

// Export actions and reducer
export const { setModules,addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;
