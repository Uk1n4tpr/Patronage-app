import React from "react";
import { useEffect, useState } from "react";
import RegisterBtn from "./RegisterBtn";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const { userName, email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        userName,
        email,
        password,
      });
      if(data.error){
        toast.error(data.error)
      }else{
        setData({});
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login-container text-white flex flex-col justify-start items-center w-screen h-screen bg-center bg-cover">
      <Link to="/">
        <div className="w-full flex justify-start items-center py-5 px-5 text-2xl text-white">
          <i className="fa-solid fa-house"></i>
        </div>
      </Link>
      <div className="flex justify-evenly items-center flex-col w-[80%] py-5 bg-orange-400/65 rounded-xl mt-5">
        <div className="flex justify-center items-center py-4 text-[25px] font-semibold h-[10%]">
          <h1>PRIJAVA</h1>
        </div>
        <div className="flex justify-center items-center flex-col w-[90%]">
          <form
            className="flex justify-evenly items-center w-full h-full flex-col py-5"
            action=""
            onSubmit={handleLoginUser}
          >
            <div className="flex flex-col justify-center items-center py-3 w-full text-[20px] font-semibold">
              <label>KORISNICKO IME</label>
              <input
                className="text-center rounded-xl w-[90%] h-[45px] bg-[#ac0909a9]"
                type="text"
                name="korisnickoIme"
                id=""
                value={data.userName}
                onChange={(e) => {
                  setData({ ...data, userName: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center py-3 w-full text-[20px] font-semibold">
              <label>EMAIL</label>
              <input
                className="text-center rounded-xl w-[90%] h-[45px] bg-[#ac0909a9]"
                type="email"
                name="email"
                id=""
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center py-3 w-full text-[20px] font-semibold">
              <label>LOZINKA</label>
              <input
                className="text-center rounded-xl w-[90%] h-[45px] bg-[#ac0909a9]"
                type="password"
                name="lozinka"
                id=""
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-center items-center text-[20px] font-semibold w-[150px] h-[50px] bg-[#ac0909] rounded-xl cursor-pointer">
              <button type="submit">PRIJAVI SE</button>
            </div>
          </form>
          <Link to="/registration">
            <RegisterBtn />
          </Link>
        </div>
      </div>
    </div>
  );
}
