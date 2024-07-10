import React, { useEffect, useState, useRef } from "react";
import { struka } from "../API_MINE/struka";
import { gradovi } from "../API_MINE/gradovi";
import { vrsteUsluga } from "../API_MINE/vrsteUsluga";
import Contact from "./Contact";
import { Link } from "react-router-dom";

function ProfileSetUp() {
  const [menu, setMenu] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(vrsteUsluga.length).fill(false)
  )
  const [profile, setProfile] = useState({
    mjestoPrebivalista: "",
    struka: "",
    vrsteUsluga: [],
    godineStaza: 0,
    oKorisniku: "",
  });

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

  const handleVUSet = (position) => {
    const updatedCheckedState = checkedState.map((vuCheck, index) => { 
        index === position ? !vu : vu
     })
     setCheckedState(updatedCheckedState)
     console.log(updatedCheckedState)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mjestoPrebivalista, struka, vrsteUsluga, godineStaza, oKorisniku } =
      data;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile-set flex justify-center items-center flex-col text-white font-semibold bg-center bg-cover">
      <div className="flex-col navbar w-full h-[50px] flex justify-between items-center fixed top-0">
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
              <Link to={"/"}>Pocetna</Link>
            </li>
            <li className="p-3 rounded-md cursor-pointer w-[40%]">
              <a href="#kontakt" onClick={handleCloseDropdown}>
                Kontakt
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-5 mt-[100px]">
        <div className="p-3 text-2xl bg-[#d54848] rounded-lg">
          <h1>
            Popunite sto vise podataka o sebi za vecu mogucnost da pacijent
            izabere vas za uslugu!
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full text-center flex flex-col justify-center items-center"
          >
            <div className="bg-gray-400/35 mt-3 p-3 flex flex-col justify-between items-center text-center text-xl rounded-lg w-full">
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>MJESTO PREBIVALISTA</label>
                <select
                  value={profile.mjestoPrebivalista}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      mjestoPrebivalista: e.target.value,
                    });
                  }}
                  className="w-full h-[50px] text-center text-semibold text-black border-b-orange-400 border-b-4 rounded-lg bg-white/0"
                >
                  {gradovi.map((gr, indexGr) => {
                    return (
                      <option key={indexGr} value={gr.city}>
                        {gr.city}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>STRUKA</label>
                <select
                  value={profile.struka}
                  onChange={(e) => {
                    setProfile({ ...profile, struka: e.target.value });
                  }}
                  className="w-full h-[50px] text-center text-semibold text-black border-b-orange-400 border-b-4 rounded-lg bg-white/0"
                >
                  {struka.map((st, indexSt) => {
                    return (
                      <option className="p-2" key={indexSt} value={st.struka}>
                        {st.struka}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label className="py-2">VRSTA USLUGE</label>
                <div className="flex flex-col w-full">
                  <div className="flex flex-wrap w-full justify-evenly items-center">
                    {vrsteUsluga.map((vu, indexVu) => {
                      return (
                        <div
                          key={indexVu}
                          className="flex flex-col justify-center items-center w-[30%] py-3"
                        >
                          <input
                            className="w-[30%]"
                            type="checkbox"
                            value={vu.usluga}
                            checked={checkedState[indexVu]}
                            onChange={() => {
                              handleVUSet(indexVu)
                            }}
                          />{" "}
                          <div className="text-[12px]">{vu.usluga}</div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleVUSet}
                    className="bg-orange-400 rounded-xl text-md"
                  >
                    PRILOZITE VRSTE USLUGA
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>GODINE STAZA</label>
                <input
                  value={profile.godineStaza}
                  onChange={(e) => {
                    setProfile({ ...profile, godineStaza: e.target.value });
                  }}
                  className="w-full h-[50px] text-center text-semibold text-black border-b-orange-400 border-b-4 rounded-lg bg-white/0"
                  type="number"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>NESTO O SEBI</label>
                <textarea
                  value={profile.oKorisniku}
                  onChange={(e) => {
                    setProfile({ ...profile, oKorisniku: e.target.value });
                  }}
                  className="text-start p-2 w-full h-[128px] text-semibold text-black text-sm border border-orange-400 border-b-4 rounded-lg bg-white/0"
                  placeholder="Upisite nesto o svome skolovanju, staziranju, ranim mjestima i iskustvu."
                ></textarea>
              </div>
              <div className="flex justify-center items-center text-center bg-orange-400 rounded-2xl">
                <button className="p-5" type="submit">
                  NASTAVITE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default ProfileSetUp;
