import React, { useEffect, useState, useRef } from "react";
import pacientPic from "../assets/pacient-placeholder1.png";
import tehnicianPic from "../assets/tehnicianPic.jpg";
import Contact from "./Contact";
import AboutUs from './AboutUs'

export default function ChoosePage(props) {
  const { handleChooseProfileMedStaff, handleChooseProfilePacient } = props;

  const [menu, setMenu] = useState(false);
  

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
    menuRef.current.style.display = "none"
    navRef.current.style.background = "none"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="text-white choose-page flex justify-center items-center flex-col bg-cover bg-center py-[100px]">
        <div className="flex-col navbar w-full h-[50px] flex justify-between items-center fixed top-0">
          <div
            ref={navRef}
            className="flex justify-between items-center navbar-phone w-full"
          >
            <div className="logo w-[50px] text-white text-4xl p-2">
              <i
                
                className="fa-solid fa-truck-medical"
              ></i>
            </div>
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
              <li
                className="p-3 rounded-md cursor-pointer w-[40%]"
              >
                <a href="#">Pocetna</a>
              </li>
              <li className="p-3 rounded-md cursor-pointer w-[40%]">
                <a href="#razlog-posjete" onClick={handleCloseDropdown}>
                  Razlog posjete
                </a>
              </li>
              <li className="p-3 rounded-md cursor-pointer w-[40%]">
                <a href="#o-nama" onClick={handleCloseDropdown}>
                  O nama
                </a>
              </li>
              <li className="p-3 rounded-md cursor-pointer w-[40%]">
                <a href="#kontakt" onClick={handleCloseDropdown}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex tracking-[-0.1rem] justify-center items-center flex-col h-full w-full p-5 text-justify gap-20">
          <h1 className="text-[40px] font-semibold text-[#f8b931] w-full text-center">
            Dobrodosli
          </h1>
          <p className="px-10 tracking-[-0.1rem] text-[20px] font-semibold">
            Ovo je aplikacija za pacijente u potrazi za odgovarajucom
            medicinskom uslugom i najkompatibilnije medicinsko osoblje koje ce
            tu uslugu da pruzi pacijentu.
          </p>
          <button className="bg-[#f8b931] hover:bg-orange-600 w-[100px] h-[50px] rounded-lg cursor-pointer">
            <p>
              <a href="#choose-option">NASTAVITE</a>
            </p>
          </button>
        </div>
      </section>
      <section
        id="choose-option"
        className="text-white bg-[#8c1919] flex justify-center items-center flex-col w-screen h-screen "
      >
        <p
          className="text-center font-semibold text-[30px] px-3
        "
        >
          IZABERITE RAZLOG VASE POSJETE
        </p>
        <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center rounded-md  p-4 w-[60%]">
          <div
            id="razlog-posjete"
            onClick={handleChooseProfilePacient}
            className="cursor-pointer pacient rounded-md bg-orange-400 hover:bg-orange-600 flex justify-center items-center flex-col py-[10px] m-2"
          >
            <img className="rounded-md p-4" src={pacientPic} alt="pacient" />
            <p>Pacient</p>
          </div>
          <div
            onClick={handleChooseProfileMedStaff}
            className="cursor-pointer tehnician rounded-md bg-orange-400 hover:bg-orange-600 flex justify-center items-center flex-col py-[10px] m-2"
          >
            <img
              className="rounded-md p-4"
              src={tehnicianPic}
              alt="tehnician"
            />
            <p>Medicinsko osoblje</p>
          </div>
        </div>
      </section>
      <AboutUs />
      <Contact />
    </>
  );
}
