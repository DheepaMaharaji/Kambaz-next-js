"use client";
import Link from "next/link";
import "../../styles.css";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 wd-courses-navigation">
      <Link
        href="/Courses/1234/Home"
        id="wd-course-home-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Home") ? "wd-active-course-link" : "wd-inactive-course-link"
        }`}
      >
        Home
      </Link>

      <Link
        href="/Courses/1234/Modules"
        id="wd-course-modules-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Modules") ? "wd-active-course-link" : "wd-inactive-course-link"
        }`}
      >
        Modules
      </Link>

      <Link
        href="https://piazza.com/northeastern"
        id="wd-course-piazza-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Piazza") ? "wd-active-course-link" : "wd-inactive-course-link"
        }`}
      >
        Piazza
      </Link>

      <Link
        href="https://www.zoom.com/"
        id="wd-course-zoom-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Zoom") ? "wd-active-course-link" : "wd-inactive-course-link"
        }`}
      >
        Zoom
      </Link>

      <Link
        href="/Courses/1234/Assignments"
        id="wd-course-assignments-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Assignments") ? "wd-active-course-link" : "wd-inactive-course-link"
        }`}
      >
        Assignments
      </Link>

      <Link
        href="/Courses/1234/Quizzes"
        id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/Quizzes") ? "wd-active-course-link" : "wd-inactive-course-link"
        }`}
      >
        Quizzes
      </Link>

      <Link
        href="/Courses/1234/People/Table"
        id="wd-course-people-link"
        className={`list-group-item border-0 ${
          isActive("/Courses/1234/People") ? "wd-active-course-link" : "wd-inactive-course-link"
        }`}
      >
        People
      </Link>
    </div>
  );
}

