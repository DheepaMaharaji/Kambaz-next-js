//import { Module } from "@reduxjs/toolkit/query";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

interface Course {
  _id?: string;
  name: string;
  description: string;
}

interface Module {
  _id?: string;
  name: string;
  course?: string;
}
interface Assignment {
  _id?: string;
  title: string;
  description: string;
  points: number;
}
interface User {
  _id: string;
  username: string;
  password: string;
  // Add other fields as needed, e.g. email?: string;
} 

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}`);
  return data;
};

export const findMyCourses = async (user: User) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${user._id}/courses`);
  return data;
};


export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// export const findModulesForCourse = async (courseId: string) => {
//   const response = await axiosWithCredentials
//     .get(`${COURSES_API}/${courseId}/modules`);
//   return response.data;
// };

// export const createModuleForCourse = async (courseId: string, module: Module) => {
//   const response = await axiosWithCredentials.post(
//     `${COURSES_API}/${courseId}/modules`,
//     module
//   );
//   return response.data;
// };




// export const updateModule = async (courseId: string,module: Module) => {
//   const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/${MODULES_API}/${module._id}`, module);
//   return data;
// };
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: Module) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return data;
};

export const updateModule = async (courseId: string, module: Module) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return data;
};
export const fetchAllAssignments = async (courseId : ParamValue) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const addAssignmentToCourse = async (courseId: ParamValue, assignment: Assignment) => {
  const { data } = await axiosWithCredentials.post(
    `${ASSIGNMENTS_API}/${courseId}/assignments`,
    assignment
  );
  return data;
}

export const updateAssignmentInCourse = async (assignment: Assignment) => {
    const { data } = await axiosWithCredentials.put(
        `${ASSIGNMENTS_API}/${assignment._id}`,
        assignment
    );
    return data;
}

export const deleteAssignmentFromCourse = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${ASSIGNMENTS_API}/${assignmentId}`
    );
    return data;
}


export const enroll = async (user:User,courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${user._id}/courses/${courseId}`
  );
  return data;
}

export const unenroll = async (user:User,courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${user._id}/courses/${courseId}`
  );
  return data;
}

export const findEnrollmentsForUser = async (user: User) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/${user._id}/courses`
  );
  return data;
}

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

// export const deleteModule = async (courseId: string, moduleId: string) => {
//  const response = await axios.delete(
//    `${COURSES_API}/${courseId}/modules/${moduleId}`
//  );
//  return response.data;
// };

