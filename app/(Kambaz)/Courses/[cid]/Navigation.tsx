"use client";
import Link from "next/link";
import "../../styles.css";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  
  const links = ["Home", "Modules", "Pazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  // Helper to check if a link is active

 const pathname = usePathname();

  // Extract course ID dynamically from pathname (e.g. /Courses/1234/Home)
  const parts = pathname.split("/");
  const courseId = parts[2] || "1234";
  interface LinkItem {
    name: string;
  }

  type BuildHref = (name: string) => string;

  const buildHref: BuildHref = (name) => {
   
    if (name === "Zoom") return "https://www.zoom.com/";
    if (name === "People") return `/Courses/${courseId}/People`;
    return `/Courses/${courseId}/${name}`;
  };

  // Helper: check if the link is active
  interface IsActive {
    (name: string): boolean;
  }

  const isActive: IsActive = (name: string): boolean => pathname.includes(name);
  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0 wd-courses-navigation"
    >
      {links.map((name) => {
        const href = buildHref(name);
        return (
          <Link
            key={name}
            href={href}
            id={`wd-course-${name.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive(name)
                ? "wd-active-course-link"
                : "wd-inactive-course-link"
            }`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}

