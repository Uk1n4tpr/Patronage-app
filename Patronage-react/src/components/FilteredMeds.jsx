import React from "react";
import { useState, useRef } from "react";
import userImg from "../assets/placeholder-200x200.jpg";

export default function FilteredMeds(props) {
  const {
    setFilteredMedStaff,
    setMjestoPrebivalistaMed,
    setStrukaMed,
    setVrstaUslugeMed,
    filteredMedStaff,
  } = props;

  const [user, setUser] = useState(false);

  const userRef = useRef(null);

  const handleShowUser = (props) => {
    const {} = props;

    setUser(!user);
    if (!user) {
      userRef.current.style.display = "flex";
    } else {
      userRef.current.style.display = "none";
    }
  };
  const handleCloseUser = () => {
    setUser(user);
    if (user) {
      userRef.current.style.display = "none";
    }
  };

  return (
    <div className="flex w-full  py-10">
      <div className="flex justify-center items-center flex-wrap ">
        {filteredMedStaff.map((filteredMeds, indexFilMed) => {
          return (
            <div className="flex justify-center items-center flex-col max-w-[120px] h-[270px] bg-orange-400 m-3 rounded-xl text-white font-semibold">
              <div className="flex justify-between items-center flex-col p-2 text-[15px]">
                <div className="w-[100px] h-[100px]">
                  <img
                    src={userImg}
                    alt=""
                    className="w-full h-full rounded-[50%]"
                  />
                </div>
                <p>{filteredMeds.ime}</p>
                <p>{filteredMeds.struka}</p>
                <div
                  ref={userRef}
                  className="hidden justify-center items-center w-screen h-screen fixed top-1 left-1 right-1 bottom-1 bg-black/75"
                >
                  <div className="flex flex-col justify-center items-center text-white text-sm text-center bg-orange-400 rounded-xl">
                    <div
                      onClick={handleCloseUser}
                      className="flex justify-start items-center p-3 w-full font-semibold cursor-pointer text-[25px]"
                    >
                      <i className="fa-solid fa-x"></i>
                    </div>
                    <div className="flex justify-center items-center w-[100px] h-[100px] my-2">
                      <img
                        className="rounded-[50%] w-full h-full"
                        src={userImg}
                        alt="user image"
                      />
                    </div>
                    <p className="p-2">
                      Ime: {filteredMedStaff[indexFilMed].ime}
                    </p>
                    <p className="p-2">
                      Prezime: {filteredMedStaff[indexFilMed].prezime}
                    </p>
                    <p className="p-2">
                      Struka: {filteredMedStaff[indexFilMed].struka}
                    </p>
                    <p className="p-2">
                      Mjesto prebivalista:{" "}
                      {filteredMedStaff[indexFilMed].mjestoPrebivalista}
                    </p>
                    <div className="p-2  flex-col">
                      Usluge:{" "}
                      {filteredMedStaff[indexFilMed].usluge.map(
                        (usluga, indexUsluga) => {
                          return (
                            <p key={indexUsluga} className="text-[10px]">
                              {usluga}
                            </p>
                          );
                        }
                      )}
                    </div>
                    <div className="flex justify-center items-center w-[150px] h-[50px] bg-orange-700 rounded-xl m-2 cursor-pointer">
                      <button>Posjetite profil</button>
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleShowUser}
                  className="flex justify-center items-center bg-orange-700 rounded-xl"
                >
                  <button>
                    <p className="text-[15px] p-2">O korisniku</p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
