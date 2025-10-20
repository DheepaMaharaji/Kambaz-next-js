"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { users, enrollments } from "../../../../Database";
import { useParams } from "next/navigation";

export default function PeopleTable() {
    const {cid} = useParams();
    const courseEnrollments = enrollments.filter(e => e.course === cid);
    console.log("courseEnrollments:", courseEnrollments);
    const enrolledUsers = courseEnrollments
        .map(e => users.find(u => u._id === e.user))
        .filter(u => u !== undefined);
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
     {enrolledUsers.map(u => (
        <tr key={u.loginId}>
         <td className="wd-full-name text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">{u.firstName}</span>{" "}
            <span className="wd-last-name">{u.lastName}</span>
         </td>
         <td className="wd-login-id">{u.loginId}</td>
         <td className="wd-section">{u.section}</td>
         <td className="wd-role">{u.role}</td>
         <td className="wd-last-activity">{u.lastActivity}</td>
         <td className="wd-total-activity">{u.totalActivity}</td>
        </tr>
     ))}   
     
    </tbody>
   </Table>
  </div> );}