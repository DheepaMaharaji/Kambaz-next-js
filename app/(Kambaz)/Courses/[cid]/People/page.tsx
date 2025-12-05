"use client";
import Table from "./Table/Table";
import * as client from "../../../Account/client";
import { useEffect, useState } from "react";
import { User } from "@/app/(Kambaz)/Account/reducer";
export default function PeoplePage() {
     const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Table users={users} fetchUsers={fetchUsers} filterByCourse={true}/>
    </div>
  );
}   