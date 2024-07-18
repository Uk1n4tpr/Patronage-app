import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export default function UploadPicture(props) {
  const { handleCloseWindow } = props;
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload");
    }

    const formData = new FormData();

    formData.append("profilePicture", file);
    formData.append("userName", user.userName);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("File uploaded succesfully");
      console.log("File uploaded successfully: ", response.data);
    } catch (error) {
      setMessage("Error uploading file");
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white flex flex-col justify-start gap-20 items-center fixed w-screen h-screen bg-black/65 z-10"
    >
      <div onClick={handleCloseWindow} className="">
        <i className="text-white cursor-pointer font-semibold text-3xl fa-solid fa-xmark"></i>
      </div>
      <div className="flex flex-col gap-3 text-white bg-gray-500/95 rounded-xl p-4 justify-center items-center">
        <div className="w-[200px] h-[200px] border-[3px] border-black rounded-[50%] flex justify-center text-center items-center text-black cursor-pointer">
          <div className="flex flex-col justify-center items-center gap-3">
            <input
              type="file"
              id="userImgUpl"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              className="flex flex-col justify-center items-center cursor-pointer"
              htmlFor="userImgUpl"
            >
              <i className="fa-solid fa-file-arrow-up text-4xl"></i>
              <h2 className="font-semibold text-lg">Postavite sliku profila</h2>
            </label>
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-xl cursor-pointer">
          <button type="submit">Postavite</button>
        </div>
      </div>
    </form>
  );
}
