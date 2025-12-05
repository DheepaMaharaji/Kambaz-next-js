"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

type User = {
  _id: string;
  username: string;
  password: string;
  dob?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  section?: string;
  lastActivity?: string;
  TotalActivity?: string;
  loginId?: string;
};

function normalizeUser(u: User): User {
  return {
     ...u,
    // dob: u.dob ? u.dob.substring(0, 10) : "",
    // lastActivity: u.lastActivity ? u.lastActivity.substring(0, 10) : "",
    username: u.username || "",
    password: u.password || "",
    firstName: u.firstName || "",
    lastName: u.lastName || "",
    dob: u.dob ? u.dob.substring(0, 10) : "",
    role: u.role || "STUDENT",
    email: u.email || "",
    section: u.section || "",
    lastActivity: u.lastActivity ? u.lastActivity.substring(0, 10) : "",
    TotalActivity: u.TotalActivity || "00:00:00",
    loginId: u.loginId || "",
  };
}

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

  const [profile, setProfile] = useState<User>({
    _id: "",
    username: "",
    password: "",
    dob: "",
    role: "STUDENT",
    firstName: "",
    lastName: "",
    email: "",
    section: "",
    lastActivity: "",
    TotalActivity: "00:00:00",
    loginId: "",
  });

  // Load Redux user into form on mount
  useEffect(() => {
    if (currentUser) {
      setProfile(normalizeUser(currentUser));
    }
  }, [currentUser]);

  // Update profile locally and propagate to backend
  const updateProfile = async () => {
    if (!currentUser) return;

    const updated = await client.updateUser(profile); // backend handles full update
    const normalized = normalizeUser(updated);

    dispatch(setCurrentUser(normalized));
    setProfile(normalized);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
  };

  return (
    <div id="wd-profile-screen" className="profile-container">
      <h3 className="profile-title">Profile</h3>

      <div>
        <FormControl
          value={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          className="mb-2"
          placeholder="Username"
        />
        <FormControl
          value={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          className="mb-2"
          type="password"
          placeholder="Password"
        />
        <FormControl
          value={profile.firstName}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          className="mb-2"
          placeholder="First Name"
        />
        <FormControl
          value={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          className="mb-2"
          placeholder="Last Name"
        />
        <FormControl
          value={profile.dob}
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          className="mb-2"
          type="date"
        />
        <FormControl
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="mb-2"
          placeholder="Email"
        />
        <select
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          className="form-control mb-2"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>

        <Button onClick={updateProfile} className="w-100 mb-2">
          Update
        </Button>
        <Button onClick={signout} className="w-100 mb-2">
          Sign out
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h5>Profile JSON</h5>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

        <h5>Redux Current User</h5>
        <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      </div>
    </div>
  );
}
