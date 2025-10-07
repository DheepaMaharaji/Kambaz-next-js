// import Link from "next/link";
// export default function Profile() {
//   return (
//     <div id="wd-profile-screen">
//       <h3>Profile</h3>
//       <input defaultValue="alice" placeholder="username" className="wd-username"/><br/>
//       <input defaultValue="123"   placeholder="password" type="password"
//              className="wd-password" /><br/>
//       <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br/>
//       <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br/>
//       <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
//       <input defaultValue="alice@wonderland" type="email" id="wd-email" /><br/>
//       <select defaultValue="FACULTY" id="wd-role">
//         <option value="USER">User</option>       <option value="ADMIN">Admin</option>
//         <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
//       </select><br/>
//       <Link href="Signin" > Sign out </Link>
//     </div>
// );}
import Link from "next/link";
import "../../styles.css"; // create this CSS file for custom styles if needed

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="profile-container">
      <h3 className="profile-title">Profile</h3>

      <input
        defaultValue="alice"
        placeholder="Username"
        className="form-control mb-2 wd-username"
      />
      <input
        defaultValue="123"
        placeholder="Password"
        type="password"
        className="form-control mb-2 wd-password"
      />
      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="form-control mb-2"
      />
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="form-control mb-2"
      />
      <input
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="form-control mb-2"
      />
      <input
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="form-control mb-2"
      />
      <select
        defaultValue="FACULTY"
        id="wd-role"
        className="form-select mb-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Link href="./Signin" className="btn btn-danger w-100 mt-2 btn-sm text-center">
        Sign out
      </Link>
    </div>
  );
}