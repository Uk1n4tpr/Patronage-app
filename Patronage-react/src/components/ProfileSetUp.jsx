import React, { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { struka } from "../API_MINE/struka";
import { gradovi } from "../API_MINE/gradovi";
import { vrsteUsluga } from "../API_MINE/vrsteUsluga";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileSetUp() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const [checkedState, setCheckedState] = useState([]);
  const [profile, setProfile] = useState({
    email: user.email,
    phone: "",
    facebook: "",
    instagram: "",
    mjestoPrebivalistaCheck: "",
    strukaCheck: "",
    vrsteUslugaCheck: [],
    godineStazaCheck: 0,
    oKorisnikuCheck: "",
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

  const handleVUSet = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCheckedState([...checkedState, value]);
    } else {
      setCheckedState(checkedState.filter((item) => item !== value));
    }
  };

  const handleCheckboxSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...profile, vrsteUslugaCheck: checkedState });
  };
  console.log(profile.vrsteUslugaCheck);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      phone,
      facebook,
      instagram,
      mjestoPrebivalistaCheck,
      strukaCheck,
      vrsteUslugaCheck,
      godineStazaCheck,
      oKorisnikuCheck,
    } = profile;
    console.log(profile.vrsteUslugaCheck);
    try {
      const { profile } = await axios.post("/profileSetUp", {
        email,
        phone,
        facebook,
        instagram,
        mjestoPrebivalistaCheck,
        strukaCheck,
        vrsteUslugaCheck,
        godineStazaCheck,
        oKorisnikuCheck,
      });
      console.log(profile);
      setProfile({});
      navigate("/userProfile");
    } catch (error) {
      console.log(error);
    }
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
              <Link to={"/"}>Početna</Link>
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
            Popunite sto više podataka o sebi za veću mogućnost da pacijent
            izabere vas za uslugu
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full text-center flex flex-col justify-center items-center"
          >
            <div className="bg-gray-400/35 mt-3 p-3 flex flex-col justify-between items-center text-center text-xl rounded-lg w-full">
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>TELEFON</label>
                <input
                  value={profile.phone}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    });
                  }}
                  className="w-full h-[50px] text-center font-semibold text-black border-b-orange-400 border-b-4 rounded-lg bg-white/0"
                  type="text"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>FACEBOOK</label>
                <input
                  value={profile.facebook}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      facebook: e.target.value,
                    });
                  }}
                  className="w-full h-[50px] text-center font-semibold text-black border-b-orange-400 border-b-4 rounded-lg bg-white/0"
                  type="text"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>INSTAGRAM</label>
                <input
                  value={profile.instagram}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      instagram: e.target.value,
                    });
                  }}
                  className="w-full h-[50px] text-center font-semibold text-black border-b-orange-400 border-b-4 rounded-lg bg-white/0"
                  type="text"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>MJESTO PREBIVALIŠTA</label>
                <select
                  value={profile.mjestoPrebivalistaCheck}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      mjestoPrebivalistaCheck: e.target.value,
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
                  value={profile.strukaCheck}
                  onChange={(e) => {
                    setProfile({ ...profile, strukaCheck: e.target.value });
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
                            onChange={handleVUSet}
                          />{" "}
                          <div className="text-[12px]">{vu.usluga}</div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleCheckboxSubmit}
                    className="bg-orange-400 rounded-xl text-md"
                  >
                    PRILOŽITE VRSTE USLUGA
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>GODINE STAŽA</label>
                <input
                  value={profile.godineStazaCheck}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      godineStazaCheck: e.target.value,
                    });
                  }}
                  className="w-full h-[50px] text-center text-semibold text-black border-b-orange-400 border-b-4 rounded-lg bg-white/0"
                  type="number"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full py-5">
                <label>NEŠTO O SEBI</label>
                <textarea
                  value={profile.oKorisnikuCheck}
                  onChange={(e) => {
                    setProfile({ ...profile, oKorisnikuCheck: e.target.value });
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
