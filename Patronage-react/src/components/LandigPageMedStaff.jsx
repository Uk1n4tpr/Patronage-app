import React from "react";
import { Link } from "react-router-dom";
import RegisterBtn from "./RegisterBtn";
import LoginBtn from "./LoginBtn";

export default function LandigPageMedStaff(props) {
  const { handleBackToChoosePage } = props;
  return (
    <header className="flex justify-start text-white items-center flex-col text-center h-screen bg-[#8c1919] gap-[80px] py-5">
      <div
        onClick={handleBackToChoosePage}
        className="w-full flex justify-start items-center py-5 px-5 text-2xl text-white cursor-pointer"
      >
        <i className="fa-solid fa-house"></i>
      </div>
      <div className="font-semibold text-justify p-5 text-[25px]">
        <p className="tracking-[-0.1rem]">
          Dobro dosli, ukoliko nemate napravljen nalog na aplikaciji pritisnite
          <span className="text-[30px] text-orange-400">
            {" "}
            Registracija
          </span>{" "}
          dugme u suprotnom pritisnite{" "}
          <span className="text-[30px] text-orange-400">Prijava</span> dugme.
        </p>
      </div>
      <div className="flex justify-center items-center w-full gap-5">
        <Link to="/registration">
          <RegisterBtn />
        </Link>
        <Link to="/login">
          <LoginBtn />
        </Link>
      </div>
    </header>
  );
}
