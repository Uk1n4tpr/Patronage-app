import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardFilMed from "./CardFilMed";
import { UserContext } from "../../context/UserContext";

export default function FilteredMeds(props) {
  const { userFound, setUserFound } = useContext(UserContext);
  const navigate = useNavigate();
  const { filteredUsers } = props;

  const handleProfileView = (userId) => {
    setUserFound(userId);
  };

  if (userFound !== null) {
    navigate("/UserProfileView");
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
