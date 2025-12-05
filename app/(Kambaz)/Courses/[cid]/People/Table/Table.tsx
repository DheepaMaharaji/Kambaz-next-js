// "use client";
// import { Table } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import { enrollments } from "../../../../Database";
// import { useParams } from "next/navigation";
// import { User } from "@/app/(Kambaz)/Account/reducer";
// import { useState } from "react";
// import PeopleDetails from "../Details";

// export default function PeopleTable( {users = [], fetchUsers }: { users?: User[]; fetchUsers: () => void; }) {
//     const [showDetails, setShowDetails] = useState(false);
//     const [showUserId, setShowUserId] = useState<string | null>(null);
//     const {cid} = useParams();
//     const courseEnrollments = enrollments.filter(e => e.course === cid);
//     console.log("courseEnrollments:", courseEnrollments);
//     const enrolledUsers = users;
//     //courseEnrollments
//       //  .map(e => users.find(u => u._id === e.user))
//        // .filter(u => u !== undefined);
//  return (
//   <div id="wd-people-table">
//    {showDetails && (
//        <PeopleDetails
//          uid={showUserId}
//          onClose={() => {
//            setShowDetails(false);
//            fetchUsers();
//          }}/>
//      )}
//    <Table striped>
//     <thead>
//      <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
//     </thead>
//     <tbody>
//      {enrolledUsers.map(u => (
//         <tr key={u._id}>
         
//             <td className="wd-full-name text-nowrap">
//               <span className="text-decoration-none"
//                  onClick={() => {
//                    setShowDetails(true);
//                    setShowUserId(u._id);
//                  }} >
               
//             <FaUserCircle className="me-2 fs-1 text-secondary" />
//             <span className="wd-first-name">{u.firstName}</span>{" "}
//             <span className="wd-last-name">{u.lastName}</span>
               
//             </span>
//          </td>
//          <td className="wd-login-id">{u._id}</td>
//          <td className="wd-section">{u.section}</td>
//          <td className="wd-role">{u.role}</td>
//          <td className="wd-last-activity">{u.lastActivity ? u.lastActivity.toLocaleString() : ""}</td>
//          <td className="wd-total-activity">{u.TotalActivity}</td>
//         </tr>
//      ))}   
     
//     </tbody>
//    </Table>
//   </div> );}

"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { enrollments } from "../../../../Database";
import { useParams } from "next/navigation";
import { User } from "@/app/(Kambaz)/Account/reducer";
import { useState } from "react";
import PeopleDetails from "../Details";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";

export default function PeopleTable({
  users = [],
  fetchUsers,
  filterByCourse = false,   // ✓ NEW PROP

}: {
  users?: User[];
  fetchUsers: () => void;
  filterByCourse?: boolean; // ✓ controls filtering
  
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { cid } = useParams();

  // If filterByCourse = true → filter users
  let finalUsers = users;

  if (filterByCourse && cid) {
    const courseEnrollments = enrollments.filter(e => e.course === cid);

    finalUsers = courseEnrollments
      .map(e => users.find(u => u._id === e.user))
      .filter(Boolean) as User[];
  }

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {currentUser?.role?.toLowerCase() === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {finalUsers.map(u => (
            <tr key={u._id}>
              <td>
                <span
                  style={{ cursor: currentUser?.role?.toLowerCase() === "admin" ? "pointer" : "default" }}
                  onClick={() => {
                    if (currentUser?.role?.toLowerCase() === "admin") {
                      setShowDetails(true);
                      setShowUserId(u._id);
                    }
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  {u.firstName} {u.lastName}
                </span>
              </td>

              <td>{u._id}</td>
              <td>{u.section}</td>
              <td>{u.role}</td>
              <td>{u.lastActivity ? new Date(u.lastActivity).toLocaleString() : ""}</td>
              <td>{u.TotalActivity}</td>

              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
