

"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch} from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

type user = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};
type Credentials = {
  username: string;
  password: string;
};
export default function Signin() {
   const [credentials, setCredentials] = useState<Credentials>({ username: "",
  password: "",});
 const dispatch = useDispatch();
 const router = useRouter();
 const signin = () => {
   const user = db.users.find(
     (u: user) =>
       u.username === credentials.username &&
       u.password === credentials.password
   );
   if (!user) return;
   dispatch(setCurrentUser(user));
   router.push("/Dashboard");
 };

  return (
    <div id="wd-signin-screen" className="signin-container">
      <h3 className="signin-title">Sign in</h3>

      <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
             className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" href="/Account/Signup"> Sign up </Link>

    </div>
  );
}