import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileSetUp from "./ProfileSetUp";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);

  if (user.joiningDate !== new Date()) {
    console.log(user.joiningDate);
  }

  return (
    <div>
     {user.firstLogin == 1 ? <UserProfile /> : <ProfileSetUp />}
    </div>
  );
}
