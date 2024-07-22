import React, { useContext } from "react";
import Card from "./Card";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Tehnicari() {
  const { users, userFound, setUserFound } = useContext(UserContext);

  const navigate = useNavigate();

  const handleProfileView = (userId) => {
    setUserFound(userId);
  };

  if (userFound !== null) {
    navigate("/UserProfileView");
  }

  return (
    <div
      id="medicinsko-osoblje"
      className="tehnicar-container text-center flex flex-col justify-center items-center flex-wrap gap-10 h-auto w-full py-10"
    >
      <div className="w-full text-white">
        <p className="font-semibold text-[25px]">
          Medicinsko osoblje sa najvise odradjenih usluga.
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {users.map((teh, indexTeh) => {
          return (
            <Card
              handleProfileView={handleProfileView}
              key={indexTeh}
              indexTeh={indexTeh}
              users={users}
            >
              {teh}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
