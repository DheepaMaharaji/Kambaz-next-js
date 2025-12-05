// // // import Link from "next/link";
// // // export default function Signup() {
// // //   return (
// // //     <div id="wd-signup-screen">
// // //       <h3>Sign up</h3>
// // //       <input placeholder="username" className="wd-username" /><br/>
// // //       <input placeholder="password" type="password" className="wd-password" /><br/>
// // //       <input placeholder="verify password"
// // //              type="password" className="wd-password-verify" /><br/>
// // //       <Link  href="Profile" > Sign up </Link><br />
// // //       <Link  href="Signin" > Sign in </Link>
// // //     </div>
// // // );}

// import Link from "next/link";
// import "../../styles.css"; // optional CSS file for custom styles

// export default function Signup() {
//   return (
//     <div id="wd-signup-screen" className="signup-container">
//       <h3 className="signup-title">Sign up</h3>

//       <input
//         placeholder="Username"
//         className="form-control mb-2 wd-username"
//       />
//       <input
//         placeholder="Password"
//         type="password"
//         className="form-control mb-2 wd-password"
//       />
//       <input
//         placeholder="Verify Password"
//         type="password"
//         className="form-control mb-2 wd-password-verify"
//       />

//       <Link href="Profile" className="btn btn-primary w-100 mb-2 btn-sm">
//         Sign up
//       </Link>

//       <Link href="Signin" className="signin-link">
//         Sign in
//       </Link>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

interface NewUser {

  username: string;
  password: string;
  
};

export default function Signup() {
  const [user, setUser] = useState<NewUser>({ username: "", password: "" });
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
             className="wd-username b-2" placeholder="username" />
      <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
             className="wd-password mb-2" placeholder="password" type="password"/>
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
      <Link href="/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
);}
