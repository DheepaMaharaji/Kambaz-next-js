import { ReactNode } from "react";
import CourseNavigation from "./Navigation";



export default function CoursesLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-courses">
      <h2>Courses 1234</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200"><CourseNavigation /></td>
            <td valign="top" width="100%">{children}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}