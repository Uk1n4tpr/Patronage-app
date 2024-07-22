import React from "react";

export default function FilterButton(props) {
  const { handleFilterButton } = props;

  return (
    <div>
      <button onClick={handleFilterButton} className="bg-orange-400 cursor-pointer rounded-[25px]">
        <p className="p-4 text-white">Potražite Uslugu</p>
      </button>
    </div>
  );
}
