import { useEffect, useRef, useState } from "react";
import FilterButton from "./FilterButton";
import Filter from "./Filter";
import Tehnicari from "./Tehnicari";
import EmptyFilter from "./EmptyFilter";
import FilteredMeds from "./FilteredMeds";
import { struka } from "../API_MINE/struka";

function LandingPage(props) {
  const { handleBackToChoosePage } = props;
  const tehnicari = [
    {
      id: 1,
      ime: "Uros",
      prezime: "Kljecanin",
      struka: "tehnicar",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["injekcija", "infuzije", "previjanja", "vadjenje krvi"],
      img: "userImg",
    },
    {
      id: 2,
      ime: "Andrea",
      prezime: "Kljecanin-Lazic",
      struka: "dipl. med. lab. ing.",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["injekcija", "infuzije", "vadjenje krvi"],
      img: "userImg",
    },
    {
      id: 3,
      ime: "Uros",
      prezime: "Kljecanin",
      struka: "tehnicar",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["injekcija", "infuzije", "previjanja", "vadjenje krvi"],
      img: "userImg",
    },
    {
      id: 2,
      ime: "Andrea",
      prezime: "Kljecanin-Lazic",
      struka: "dipl. med. lab. ing.",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["injekcija", "infuzije", "vadjenje krvi"],
      img: "userImg",
    },
    {
      id: 4,
      ime: "Uros",
      prezime: "Kljecanin",
      struka: "tehnicar",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["injekcija", "infuzije", "previjanja", "vadjenje krvi"],
      img: "userImg",
    },
    {
      id: 5,
      ime: "Uros",
      prezime: "Kljecanin",
      struka: "tehnicar",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["injekcija", "infuzije", "previjanja", "vadjenje krvi"],
      img: "userImg",
    },
    {
      id: 2,
      ime: "Andrea",
      prezime: "Kljecanin-Lazic",
      struka: "dipl. med. lab. ing.",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["injekcija", "infuzije", "vadjenje krvi"],
      img: "userImg",
    },
    {
      id: 6,
      ime: "Uros",
      prezime: "Kljecanin",
      struka: "tehnicar",
      mjestoPrebivalista: "Banja Luka",
      usluge: ["infuzije", "previjanja", "vadjenje krvi"],
      img: "userImg",
    },
  ];

  const [menu, setMenu] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [mjestoPrebivalistaMed, setMjestoPrebivalistaMed] = useState("");
  const [strukaMed, setStrukaMed] = useState("");
  const [vrstaUslugeMed, setVrstaUslugeMed] = useState("");
  const [filteredMedStaff, setFilteredMedStaff] = useState([]);

  const menuRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleFilterButton = () => {
    if (showFilter === false) {
      setShowFilter(true);
    }
  };

  const handleHideFilter = () => {
    if (showFilter === true) {
      setShowFilter(false);
    }
    setMjestoPrebivalistaMed("");
    setStrukaMed("");
    setVrstaUslugeMed("");
  };

  const handleMPChange = (e) => {
    setMjestoPrebivalistaMed(e.target.value);
  };

  const handleSChange = (e) => {
    setStrukaMed(e.target.value);
  };

  const handleVUChange = (e) => {
    setVrstaUslugeMed(e.target.value);
  };

  const handleFilterResults = () => {
    if (
      mjestoPrebivalistaMed === "" &&
      strukaMed === "" &&
      vrstaUslugeMed === ""
    ) {
      setFilteredMedStaff([]);
    } else if (
      mjestoPrebivalistaMed !== "" &&
      strukaMed === "" &&
      vrstaUslugeMed === ""
    ) {
      let filterArray = [];
      tehnicari.map((medStf, indexMed) => {
        if (tehnicari[indexMed].mjestoPrebivalista === mjestoPrebivalistaMed) {
          filterArray.push(medStf);
          setFilteredMedStaff([...filterArray, tehnicari[indexMed]]);
        }
      });
    } else if (
      mjestoPrebivalistaMed !== "" &&
      strukaMed !== "" &&
      vrstaUslugeMed === ""
    ) {
      let filterArray = [];
      tehnicari.map((medStf, indexMed) => {
        if (
          tehnicari[indexMed].mjestoPrebivalista === mjestoPrebivalistaMed &&
          tehnicari[indexMed].struka == strukaMed
        ) {
          filterArray.push(medStf);
          setFilteredMedStaff([...filterArray, tehnicari[indexMed]]);
        }
      });
    } else if (
      mjestoPrebivalistaMed !== "" &&
      strukaMed === "" &&
      vrstaUslugeMed !== ""
    ) {
      let filterArray = [];
      tehnicari.map((medStf, indexMed) => {
        if (
          tehnicari[indexMed].mjestoPrebivalista === mjestoPrebivalistaMed &&
          tehnicari[indexMed].usluge.includes(vrstaUslugeMed)
        ) {
          filterArray.push(medStf);
          setFilteredMedStaff([...filterArray, tehnicari[indexMed]]);
        }
      });
    } else if (
      mjestoPrebivalistaMed !== "" &&
      strukaMed !== "" &&
      vrstaUslugeMed !== ""
    ) {
      let filterArray = [];
      tehnicari.map((medStf, indexMed) => {
        if (
          tehnicari[indexMed].mjestoPrebivalista === mjestoPrebivalistaMed &&
          tehnicari[indexMed].struka === strukaMed &&
          tehnicari[indexMed].usluge.includes(vrstaUslugeMed)
        ) {
          filterArray.push(medStf);
          setFilteredMedStaff([...filterArray, tehnicari[indexMed]]);
        }
      });
    } else if (
      mjestoPrebivalistaMed === "" &&
      strukaMed !== "" &&
      vrstaUslugeMed === ""
    ) {
      let filterArray = [];
      tehnicari.map((medStf, indexMed) => {
        if (tehnicari[indexMed].struka === strukaMed) {
          filterArray.push(medStf);
          setFilteredMedStaff([...filterArray, tehnicari[indexMed]]);
        }
      });
    } else if (
      mjestoPrebivalistaMed === "" &&
      strukaMed !== "" &&
      vrstaUslugeMed !== ""
    ) {
      let filterArray = [];
      tehnicari.map((medStf, indexMed) => {
        if (
          tehnicari[indexMed].struka === strukaMed &&
          tehnicari[indexMed].usluge.includes(vrstaUslugeMed)
        ) {
          filterArray.push(medStf);
          setFilteredMedStaff([...filterArray, tehnicari[indexMed]]);
        }
      });
    } else {
      let filterArray = [];
      tehnicari.map((medStf, indexMed) => {
        if (tehnicari[indexMed].usluge.includes(vrstaUslugeMed)) {
          filterArray.push(medStf);
          setFilteredMedStaff([...filterArray, tehnicari[indexMed]]);
        }
      });
    }
    console.log(filteredMedStaff);
  };

  return (
    <div className="flex flex-col justify-center items-center landing-page bg-cover bg-center bg-no-repeat gap-[50px]">
      <div className="flex-col navbar w-full h-[50px] flex justify-between items-center fixed top-0">
        <div
          ref={navRef}
          className="flex justify-between items-center navbar-phone w-full"
        >
          <div className="logo w-[50px] text-white text-4xl p-2">
            <i
              onClick={handleBackToChoosePage}
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
              onClick={handleBackToChoosePage}
              className="p-3 rounded-md cursor-pointer w-[40%]"
            >
              <a href="#">Pocetna</a>
            </li>
            <li className="p-3 rounded-md cursor-pointer w-[40%]">
              <a href="#medicinsko-osoblje" onClick={handleCloseDropdown}>
                Med. osoblje
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
      <div className="flex flex-1 justify-center items-center w-full pt-[100px]">
        {showFilter ? (
          <Filter
            tehnicari={tehnicari}
            handleHideFilter={handleHideFilter}
            handleMPChange={handleMPChange}
            handleSChange={handleSChange}
            handleVUChange={handleVUChange}
            handleFilterResults={handleFilterResults}
            mjestoPrebivalistaMed={mjestoPrebivalistaMed}
            strukaMed={strukaMed}
            vrstaUslugeMed={vrstaUslugeMed}
            filteredMedStaff={filteredMedStaff}
            setFilteredMedStaff={setFilteredMedStaff}
          />
        ) : (
          <FilterButton
            handleFilterButton={handleFilterButton}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
        )}
      </div>
      <Tehnicari tehnicari={tehnicari} />
    </div>
  );
}

export default LandingPage;
