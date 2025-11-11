// // import Link from "next/link";
// // export default function Signup() {
// //   return (
// //     <div id="wd-signup-screen">
// //       <h3>Sign up</h3>
// //       <input placeholder="username" className="wd-username" /><br/>
// //       <input placeholder="password" type="password" className="wd-password" /><br/>
// //       <input placeholder="verify password"
// //              type="password" className="wd-password-verify" /><br/>
// //       <Link  href="Profile" > Sign up </Link><br />
// //       <Link  href="Signin" > Sign in </Link>
// //     </div>
// // );}

import Link from "next/link";
import "../../styles.css"; // optional CSS file for custom styles

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="signup-container">
      <h3 className="signup-title">Sign up</h3>

      <input
        placeholder="Username"
        className="form-control mb-2 wd-username"
      />
      <input
        placeholder="Password"
        type="password"
        className="form-control mb-2 wd-password"
      />
      <input
        placeholder="Verify Password"
        type="password"
        className="form-control mb-2 wd-password-verify"
      />

      <Link href="Profile" className="btn btn-primary w-100 mb-2 btn-sm">
        Sign up
      </Link>

      <Link href="Signin" className="signin-link">
        Sign in
      </Link>
    </div>
  );
}

