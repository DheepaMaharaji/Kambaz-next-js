"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import "../../styles.css";
import * as db from "../../Database";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  //image: string;
  description: string;
  // Add other fields as needed
};
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: Course) => course._id === cid);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

   const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  return (
    <div id="wd-courses" >
      <h2 className="text-danger">
      <button
        onClick={toggleSidebar}
        className="btn btn-link p-0 border-0 text-danger me-3"
        aria-label="Toggle sidebar"
      >
        <FaAlignJustify className="fs-4" />
      </button>  
       {course?.name}</h2>
      
      <hr />
      <div className="d-flex">
        {isSidebarVisible && (
          <div className="me-3">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
