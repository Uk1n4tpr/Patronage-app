import React from "react";

const AboutUs = () => {
  return (
    <div id="o-nama" className="about-us bg-[#8c1919] px-10 flex justify-center items-center w-full h-auto">
      <div className="about-us-text text-justify text-white py-[150px]">
        <div className="w-auto h-auto bg-orange-400/55 p-5 rounded-[20px]">
          <h1 className="text-lg font-semibold py-10">O Nama</h1>
          <p>
            Ova aplikacija je osnovana sa ciljem unapredjivanja njege pacijenata
            koji nisu u stanju da dodju u ambulantu radi neophodne terapije.
            Takodje da kolegama tehnicarima obezbjedi dodatan posao ili
            nezaposlenim kolegama da mogu zaraditi. Zasnovana je na nacinu
            bodovanja tehnicara i recenzija koje pacijenti mogu ostaviti na
            osnovu dobijene usluge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
