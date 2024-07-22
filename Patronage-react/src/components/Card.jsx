import React, { useContext, useEffect, useRef, useState } from "react";
import userImg from "../assets/placeholder-200x200.jpg";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function Card(props) {
  const { indexTeh } = props;
  const { users } = useContext(UserContext);
  const [imageBase64, setImageBase64] = useState("");

  const username = users[indexTeh].userName;

  const userRef = useRef(null);

  const [user, setUser] = useState(false);

  const handleShowUser = () => {
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

  useEffect(() => {
    axios
      .get(`/user/${username}/image`)
      .then((response) => setImageBase64(response.data.imageBase64))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Server responded with status:', error.response.status);
          console.log('Error message:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message:', error.message);
        }
        console.log('Error config:', error.config);
      });
  }, [username]);

  return (
    <div className="flex flex-col justify-between items-center rounded-lg p-2 text-white text-sm text-center bg-orange-400 max-w-[120px] h-[270px]">
      <div className="flex justify-center items-center w-[100px] h-[100px] my-2">
        <img
          className="rounded-[50%] w-full h-full"
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt="user image"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center py-2">
        <p className="max-w-full text-wrap">{users[indexTeh].name}</p>
        <p className="max-w-full">{users[indexTeh].struka}</p>
      </div>
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
          <p className="p-2">Ime: {users[indexTeh].name}</p>
          <p className="p-2">Prezime: {users[indexTeh].lastName}</p>
          <p className="p-2">Struka: {users[indexTeh].struka}</p>
          <p className="p-2">
            Mjesto prebivališta: {users[indexTeh].mjestoPrebivalista}
          </p>
          <div className="p-2  flex-col">
            Usluge:{" "}
            {users[indexTeh].vrstaUsluga.map((usluga, indexUsluga) => {
              return (
                <p key={indexUsluga} className="text-[10px]">
                  {usluga}
                </p>
              );
            })}
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
  );
}
