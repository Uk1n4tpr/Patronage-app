import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import userImg from "../assets/placeholder-200x200.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CardFilMed from "./CardFilMed";
import UserProfileView from "./UserProfileView";
import { UserContext } from "../../context/UserContext";

export default function FilteredMeds(props) {
  const { userFound, setUserFound } = useContext(UserContext);
  const navigate = useNavigate();
  const { filteredUsers } = props;

  const handleProfileView = (userId) => {
    setUserFound(userId);
  };

  if(userFound !== null){
    navigate('/UserProfileView')
  }

  return (
    <>
      <div className="flex w-full  py-10">
        <div className="flex justify-center items-center flex-wrap ">
          {filteredUsers.map((teh, indexFilMed) => {
            return (
              <CardFilMed
                key={indexFilMed}
                indexFilMed={indexFilMed}
                filteredUsers={filteredUsers}
                handleProfileView={handleProfileView}
              >
                {teh}
              </CardFilMed>
            );
          })}
        </div>
      </div>
    </>
  );
}
