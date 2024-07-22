import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileSetUp from "./ProfileSetUp";
import UserProfile from "./UserProfile";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  if (user.joiningDate !== new Date()) {
    console.log(user.joiningDate);
  }

  return <div>{user.firstLogin == 1 ? <UserProfile /> : <ProfileSetUp />}</div>;
}
