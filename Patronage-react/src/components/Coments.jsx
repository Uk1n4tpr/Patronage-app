import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

function Coments(props) {
  const navigate = useNavigate();
  const { user_id, username } = props;
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const userId = user_id;
  const userName = username;

  const commentsRef = useRef(null);
  const showCommentsRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { userId, comment, name, userName };
    try {
      const response = await axios.post("/commentPost", newComment);
      console.log("new comment :", newComment);
      console.log(response);
      setName("");
      setComment("");
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request made but no response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
    setShowComments(false);
  };

  const handleCommentsShow = () => {
    setShowComments(!showComments);
    if (!showComments) {
      commentsRef.current.style.display = "flex";
      showCommentsRef.current.style.display = "none";
    } else {
      commentsRef.current.style.display = "none";
      showCommentsRef.current.style.display = "flex";
    }
  };

  useEffect(() => {
    fetchComments();
  }, [showComments]);

  const fetchComments = async () => {
    try {
      console.log(userName);

      const response = await axios
        .get(`/comments/${userName}`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error("errorfetching comments", error);
        });
      console.log(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    console.log(comments);
  };

  return (
    <div className="w-screen bg-red-800 flex flex-col justify-center items-center gap-3 py-5">
      <div className="w-screen flex flex-col justify-center items-center">
        <div>
          <h2 className="font-semibold text-wrap text-2xl text-center px-3">
            Ovdje možete ostaviti utiske o korisniku
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full px-5 flex flex-col justify-center items-center gap-2"
        >
          <label className="pt-5 font-semibold text-xl" htmlFor="name">
            Vaše ime
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="text-center w-full rounded-xl text-black border-[3px] border-black"
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="comment" className="font-semibold text-xl">
            ostavite svoj komentar
          </label>
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="p-5 w-full rounded-xl text-black border-[3px] border-black"
            name="comment"
            id="comment"
            placeholder="Vaš komentar"
            rows={5}
            cols={15}
          ></textarea>
          <div className="bg-orange-400 p-5 rounded-3xl cursor-pointer">
            <button className="font-semibold" type="submit">
              POSTAVI
            </button>
          </div>
        </form>
      </div>
      <div className="w-full flex justify-center items-center flex-col py-5">
        <div className="flex flex-col justify-center items-center gap-3 w-full">
          <h2 className="font-semibold text-xl">Ostali komentari</h2>
          <div onClick={handleCommentsShow} ref={showCommentsRef}>
            <i className="fa-solid fa-caret-down text-4xl cursor-pointer"></i>
          </div>
        </div>
        <div
          ref={commentsRef}
          className="hidden flex-col justify-center items-center w-full cursor-pointer"
        >
          <i
            onClick={() => {
              setShowComments(false);
              commentsRef.current.style.display = "none";
              showCommentsRef.current.style.display = "flex";
            }}
            className="fa-solid fa-xmark text-4xl py-5"
          ></i>
          <div className="w-full flex flex-col justify-center items-center gap-3">
            {comments.map((com, indexCom) => {
              return <Comment com={com} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coments;
