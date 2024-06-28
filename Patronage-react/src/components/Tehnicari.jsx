import React from "react";
import Card from "./Card";

export default function Tehnicari(props) {
  const {tehnicari} = props  

  return (
    <div
      id="medicinsko-osoblje"
      className="tehnicar-container text-center flex flex-col justify-center items-center flex-wrap gap-10 h-auto w-full"
    >
      <div className="w-full text-white">
        <p className="font-semibold text-[25px]">Medicinsko osoblje sa najvise odradjenih usluga.</p>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {tehnicari.map((teh, indexTeh) => {
          return (
            <Card key={indexTeh} indexTeh={indexTeh} tehnicari={tehnicari}>
              {teh}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
