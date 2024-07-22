import React from "react";
import FilteredMeds from "./FilteredMeds";
import EmptyFilter from "./EmptyFilter";
import { gradovi } from "../API_MINE/gradovi";
import { struka } from "../API_MINE/struka";
import { vrsteUsluga } from "../API_MINE/vrsteUsluga";

const Filter = (props) => {
  const {
    filteredUsers,
    mjestoPrebivalistaMed,
    strukaMed,
    vrstaUslugeMed,
    handleMPChange,
    handleSChange,
    handleVUChange,
    handleFilterResults,
    handleHideFilter,
  } = props;
  console.log(filteredUsers);
  return (
    <div className="filter flex flex-col items-center justify-center w-full h-auto text-center bg-gray-400/35">
      <h1 className="text-white text-1xl font-semibold py-2">
        Pretražite najbližu i najbolju uslugu za Vas
      </h1>
      <div className="filter-container flex flex-col justify-center items-center text-white font-semibold text-[13px] py-4">
        <form
          className="filter-form flex flex-col justify-center items-center"
          action=""
        >
          <div className="filter-input flex flex-col px-4 text-center py-2">
            <label className="py-2">Mjesto prebivališta</label>
            <select
              onChange={handleMPChange}
              className="w-[200px] h-[25px] text-center text-semibold text-black rounded-xl bg-orange-400"
              value={mjestoPrebivalistaMed}
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
          <div className="filter-input flex flex-col px-4 text-center py-2">
            <label className="py-2">Struka</label>
            <select
              onChange={handleSChange}
              className="w-[200px] h-[25px] text-center text-semibold text-black rounded-xl bg-orange-400"
              value={strukaMed}
            >
              {struka.map((st, indexSt) => {
                return (
                  <option key={indexSt} value={st.struka}>
                    {st.struka}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="filter-input flex flex-col px-4 text-center py-2">
            <label className="py-2">Vrsta usluge</label>
            <select
              onChange={handleVUChange}
              className="w-[200px] h-[25px] text-center text-semibold text-black rounded-xl bg-orange-400"
              value={vrstaUslugeMed}
            >
              {vrsteUsluga.map((vu, indexVu) => {
                return (
                  <option key={indexVu} value={vu.usluga}>
                    {vu.usluga}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div
          onClick={handleFilterResults}
          className="filter-butto cursor-pointer flex justify-center items-center text-center py-n mx-3 bg-orange-600 w-[100px] h-[30px] rounded-xl"
        >
          <button className="">Pretraži</button>
          <i className="fa-solid fa-magnifying-glass px-2"></i>
        </div>
      </div>
      <div
        onClick={handleHideFilter}
        className="flex items-center justify-center cursor-pointer w-[50px] h-[50px]"
      >
        <i className="text-white text-[30px] fa-solid fa-hand-point-left"></i>
      </div>
      {filteredUsers.length === 0 ? (
        <EmptyFilter />
      ) : (
        <FilteredMeds filteredUsers={filteredUsers} />
      )}
    </div>
  );
};

export default Filter;
