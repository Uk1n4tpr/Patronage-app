import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadPicture from "./UploadPicture"; 

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [uslugeShow, setUslugeShow] = useState(false);
  const [uploadWindow, setUploadWindow] = useState(false);
  const [imageBase64, setImageBase64] = useState("");

  const username = user.userName;

  const menuRef = useRef(null);
  const navRef = useRef(null);

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

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios
      .get("/logout")
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => console.log(error));
    console.log(user);
  };

  const handleUploadPicture = () => {
    setUploadWindow(!uploadWindow);
  };
  const handleCloseWindow = () => {
    setUploadWindow(!uploadWindow);
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
    <>
      {uploadWindow === true ? (
        <UploadPicture handleCloseWindow={handleCloseWindow} />
      ) : (
        <></>
      )}
      <div className="flex flex-col justify-center bg-red-700 items-center p-5 w-full text-white">
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
              <li className="p-3 rounded-md cursor-pointer w-[40%]">
                <Link to={"/profileSetLogged"}>Preuredite Profil</Link>
              </li>
              <li className="p-3 rounded-md cursor-pointer w-[40%]">
                <a onClick={handleLogout}>Odjavljivanje</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-[50%] w-[200px] h-[200px] mt-[100px]">
          {imageBase64 && (
            <img
              className="w-full h-full rounded-[50%] bg-white"
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt=""
            />
          )}
          <div
            onClick={handleUploadPicture}
            className="h-full flex justify-end items-end"
          >
            <i className="fa-solid fa-pen-to-square absolute cursor-pointer"></i>
          </div>
        </div>
        <div className="font-semibold text-2xl p-3">
          <h2 className="text-orange-400">{user.userName}</h2>
        </div>
        <div className="font-semibold text-2xl pb-3">
          <h2>{user.struka}</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          {uslugeShow ? (
            <div className="flex flex-col justify-center items-center p-3 bg-orange-400 font-semibold w-[70%] rounded-xl">
              <h1 className="text-2xl py-3">USLUGE</h1>
              {user.vrstaUsluga.map((vusluga, index) => {
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
              {user.name} {user.lastName}
            </h2>
          </div>
          <div className="pt-5 pb-5 font-semibold">
            <h2>{user.oKorisniku}</h2>
          </div>
          <div className="font-semibold">
            <h2>
              <span className="text-orange-400">Mjesto prebivališta:</span>{" "}
              {user.mjestoPrebivalista}
            </h2>
          </div>
          <div className="font-semibold py-10 w-full">
            <h2 className="text-xl underline">KONTAKT INFORMACIJE</h2>
            <div className="flex justify-start items-center">
              <i className="px-2 fa-solid fa-envelope"></i>
              <h1>
                <span className="text-orange-400">email:</span> {user.email}
              </h1>
            </div>
            <div className="flex justify-start items-center">
              <i className="px-2 fa-solid fa-phone"></i>
              <h2>
                <span className="text-orange-400">tel:</span> {user.phone}
              </h2>
            </div>
            <div className="flex justify-start items-center">
              <i className="px-2 fa-brands fa-square-facebook"></i>
              <h2>
                <span className="text-orange-400">facebook:</span>
                {user.facebook}
              </h2>
            </div>
            <div className="flex justify-start items-center">
              <i className="px-2 fa-brands fa-square-instagram"></i>
              <h2>
                <span className="text-orange-400">instagram:</span>
                {user.instagram}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
