// import Link from "next/link";
// export default function Signin() {
//  return (
//    <div id="wd-signin-screen">
//      <h3>Sign in</h3>
//      <input placeholder="username" className="wd-username" /> <br />
//      <input placeholder="password" type="password" className="wd-password" /> <br />
//      <Link href="/Dashboard" id="wd-signin-btn"> Sign in </Link> <br />
//      <Link href="Signup" id="wd-signup-link"> Sign up </Link>
//    </div>
// );}
 
import Link from "next/link";
import "../../styles.css"; // optional CSS file for custom styles

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="signin-container">
      <h3 className="signin-title">Sign in</h3>

      <input
        placeholder="Username"
        className="form-control mb-2 wd-username"
      />
      <input
        placeholder="Password"
        type="password"
        className="form-control mb-2 wd-password"
      />

      <Link
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2 btn-sm"
      >
        Sign in
      </Link>

      <Link href="/Account/Signup" className="signup-link">
        Sign up
      </Link>
    </div>
  );
}