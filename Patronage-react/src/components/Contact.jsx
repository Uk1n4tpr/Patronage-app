import React from "react";

export default function Contact() {
  return (
    <div
      id="kontakt"
      className="contact-container flex flex-col text-white justify-evenly items-center bg-[#751212] w-full h-auto py-[200px]"
    >
      <p className="py-5 text-[25px]">Kontakt Informacije</p>
      <div className="flex justify-evenly items-center p-3 w-full h-full">
        <div className="flex flex-col rounded-md justify-evenly items-center h-[250px] bg-[#4a0505] w-[15%] text-white ">
          <i className="text-[30px] fa-solid fa-phone"></i>
          <i className="text-[30px] fa-solid fa-envelope"></i>
          <i className="text-[30px] fa-brands fa-square-instagram"></i>
          <i className="text-[30px] fa-brands fa-square-facebook"></i>
        </div>
        <div className="contact-info-text flex flex-col rounded-md justify-evenly items-center h-[250px] bg-[#4a0505]  w-[75%] text-white">
          <p className="w-full px-1 text-left text-sm">
            <span className="text-[20px]">Korisnička podrška:</span>{" "}
            0038765294798
          </p>
          <p className="w-full px-2 text-left text-sm">
            <span className="text-[20px]">email:</span> ukinatpr124@gmail.com
          </p>
          <p className="w-full px-2 text-left text-sm">
            <span className="text-[20px]">instagram:</span>
          </p>
          <p className="w-full px-2 text-left text-sm">
            <span className="text-[20px]">facebook:</span>
          </p>
        </div>
      </div>
    </div>
  );
}
