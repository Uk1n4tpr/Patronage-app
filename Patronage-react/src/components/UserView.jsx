import React from "react";
import { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

function UserView() {
  const { users, userFound } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const [uslugeShow, setUslugeShow] = useState(false);
  const [displayUser, setDisplayUser] = useState({});
  const [imageBase64, setImageBase64] = useState("");

  const username = displayUser.userName;

  const menuRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    users.filter((user) => {
      if (user._id === userFound) {
        setDisplayUser(user);
      }
      console.log("user not found");
    });
  }, [userFound]);

  const handleDropdowMenu = (e) => {
    setMenu(!menu);
    if (!menu) {
      menuRef.current.style.display = "flex";
    } else {
      menuRef.current.style.display = "none";
    }
    if (!menu) {
      navRef.current.style.background = "rgba(257, 146, 60)";
    } else {
      navRef.current.style.background = "none";
    }
  };

  const handleCloseDropdown = () => {
    menuRef.current.style.display = "none";
    navRef.current.style.background = "none";
  };

  const showUsluge = () => {
    if (!uslugeShow) {
      setUslugeShow(false);
    }
    setUslugeShow(true);
    console.log(uslugeShow);
  };

  const hideUsluge = () => {
    setUslugeShow(false);
  };

  useEffect(() => {
    axios
      .get(`/user/${username}/image`)
      .then((response) => setImageBase64(response.data.imageBase64))
      .catch((error) => {
        console.error("error fetching image: ", error);
      });
  }, [username]);

  return (
    <div className="flex flex-col justify-center bg-red-700 items-center p-5 text-white">
      <div className="flex-col navbar w-screen h-[50px] flex justify-between items-center fixed top-0">
        <div
          ref={navRef}
          className="flex justify-between items-center navbar-phone w-full"
        >
          <Link to={"/"}>
            <div className="logo w-[50px] text-white text-4xl p-2">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
          </Link>
          <div
            className="flex flex-col cursor-pointer justify-around items-center hamburger w-[40px] h-[80%] p-1"
            onClick={handleDropdowMenu}
          >
            <span className="bar h-[3px] bg-white w-full"></span>
            <span className="bar h-[3px] bg-white w-full"></span>
            <span className="bar h-[3px] bg-white w-full"></span>
          </div>
        </div>
        <div
          ref={menuRef}
          className="navbar-ul z-10 flex-col justify-center items-center hidden w-full"
        >
          <ul className="flex flex-col justify-evenly text-center items-center text-white bg-orange-400 w-full rounded-b-md">
            <li className="p-3 rounded-md cursor-pointer w-[40%]">
              <Link to={"/"}>Početna</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center rounded-[50%] w-[200px] h-[200px] mt-[100px]">
        <img
          className="w-full h-full rounded-[50%] bg-white"
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt=""
        />
      </div>
      <div className="font-semibold text-2xl p-3">
        <h2 className="text-orange-400">{displayUser.userName}</h2>
      </div>
      <div className="font-semibold text-2xl pb-3">
        <h2>{displayUser.struka}</h2>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        {uslugeShow ? (
          <div className="flex flex-col justify-center items-center p-3 bg-orange-400 font-semibold w-[70%] rounded-xl">
            <h1 className="text-2xl py-3">USLUGE</h1>
            {displayUser.vrstaUsluga.map((vusluga, index) => {
              return (
                <div key={index} className="py-3" value={index}>
                  <h2>{vusluga}</h2>
                </div>
              );
            })}
            <div className="flex justify-center items-center bg-red-800 p-3 rounded-xl text-xl cursor-pointer">
              <button onClick={hideUsluge}>SAKRIJ USLUGE</button>
            </div>
          </div>
        ) : (
          <div className="font-semibold bg-orange-400 p-4 rounded-3xl cursor-pointer ">
            <button onClick={showUsluge}>PRIKAŽI USLUGE</button>
          </div>
        )}
      </div>
      <div className="bg-gray-500 h-1 w-screen my-5"></div>
      <div className="w-full flex flex-col justify-center items-start py-5">
        <div className="text-3xl font-semibold">
          <h2 className="underline">O KORISNIKU</h2>
        </div>
        <div className="font-semibold py3">
          <h2>
            <span className="text-orange-400">Ime i Prezime:</span>{" "}
            {displayUser.name} {displayUser.lastName}
          </h2>
        </div>
        <div className="pt-5 pb-5 font-semibold">
          <h2>{displayUser.oKorisniku}</h2>
        </div>
        <div className="font-semibold">
          <h2>
            <span className="text-orange-400">Mjesto prebivališta:</span>{" "}
            {displayUser.mjestoPrebivalista}
          </h2>
        </div>
        <div className="font-semibold py-10 w-full">
          <h2 className="text-xl underline">KONTAKT INFORMACIJE</h2>
          <div className="flex justify-start items-center">
            <i className="px-2 fa-solid fa-envelope"></i>
            <h1>
              <span className="text-orange-400">email:</span>{" "}
              {displayUser.email}
            </h1>
          </div>
          <div className="flex justify-start items-center">
            <i className="px-2 fa-solid fa-phone"></i>
            <h2>
              <span className="text-orange-400">tel:</span> {displayUser.phone}
            </h2>
          </div>
          <div className="flex justify-start items-center">
            <i className="px-2 fa-brands fa-square-facebook"></i>
            <h2>
              <span className="text-orange-400">facebook:</span>
              {displayUser.facebook}
            </h2>
          </div>
          <div className="flex justify-start items-center">
            <i className="px-2 fa-brands fa-square-instagram"></i>
            <h2>
              <span className="text-orange-400">instagram:</span>
              {displayUser.instagram}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
