import { useEffect, useRef, useState, useContext } from "react";
import FilterButton from "./FilterButton";
import Filter from "./Filter";
import Tehnicari from "./Tehnicari";
import { UserContext } from "../../context/UserContext";
import { gradovi } from "../API_MINE/gradovi";
import { struka } from "../API_MINE/struka";
import { vrsteUsluga } from "../API_MINE/vrsteUsluga";

function LandingPage(props) {
  const { handleBackToChoosePage } = props;
  const { users } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterResult, setFilterResult] = useState({
    mjestoPrebivalistaMed: gradovi[0].city,
    strukaMed: struka[0].struka,
    vrstaUslugeMed: vrsteUsluga[0].usluga,
  });

  const menuRef = useRef(null);
  const navRef = useRef(null);
  showFilter;
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
    menuRef.current.style.display = "none";
    navRef.current.style.background = "none";
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
    setFilterResult({
      mjestoPrebivalistaMed: gradovi[0].city,
      strukaMed: struka[0].struka,
      vrstaUslugeMed: vrsteUsluga[0].usluga,
    });
    setFilteredUsers([]);
  };

  const handleMPChange = (e) => {
    setFilterResult({ ...filterResult, mjestoPrebivalistaMed: e.target.value });
  };
  const handleSChange = (e) => {
    setFilterResult({ ...filterResult, strukaMed: e.target.value });
  };

  const handleVUChange = (e) => {
    setFilterResult({ ...filterResult, vrstaUslugeMed: e.target.value });
  };

  const handleFilterResults = () => {
    const newArray = [];
    users.filter((user) => {
      if (
        user.mjestoPrebivalista === filterResult.mjestoPrebivalistaMed &&
        user.struka === filterResult.strukaMed &&
        user.vrstaUsluga.includes(filterResult.vrstaUslugeMed)
      ) {
        newArray.push(user);
      }
    });
    setFilteredUsers(newArray);
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
            filterResult={filterResult}
            filteredUsers={filteredUsers}
            handleHideFilter={handleHideFilter}
            handleMPChange={handleMPChange}
            handleSChange={handleSChange}
            handleVUChange={handleVUChange}
            handleFilterResults={handleFilterResults}
            mjestoPrebivalistaMed={filterResult.mjestoPrebivalistaMed}
            strukaMed={filterResult.strukaMed}
            vrstaUslugeMed={filterResult.vrstaUslugeMed}
          />
        ) : (
          <FilterButton
            handleFilterButton={handleFilterButton}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
        )}
      </div>
      <Tehnicari users={users} />
    </div>
  );
}

export default LandingPage;
