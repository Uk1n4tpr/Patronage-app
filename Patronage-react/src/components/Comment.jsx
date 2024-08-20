import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

function Comment(props) {
  const { com } = props;
  const [replyInput, setReplyInput] = useState(false);
  const [replyContainer, setReplyContainer] = useState(false);
  const [reply, setReply] = useState("");
  const [replyes, setReplyes] = useState([]);
  const comment = com.comment;

  const replyInputRef = useRef(null);
  const replyIconRef = useRef(null);
  const eksIconRef = useRef(null);
  const replyContainerRef = useRef(null);

  const handleShowReplyInput = () => {
    setReplyInput(!replyInput);
    if (!replyInput) {
      replyInputRef.current.style.display = "flex";
      eksIconRef.current.style.display = "flex";
      replyIconRef.current.style.display = "none";
    }
  };

  const handleCloseReplyInput = () => {
    setReplyInput(false);
    if (replyInput === false) {
      replyInputRef.current.style.display = "none";
      eksIconRef.current.style.display = "none";
      replyIconRef.current.style.display = "flex";
    }
  };

  const handleReplyContainerShow = () => {
    setReplyContainer(!replyContainer);
    if (!replyContainer) {
      replyContainerRef.current.style.display = "flex";
    }
  };

  const handleCloseReplyContainer = () => {
    setReplyContainer(false);
    if (replyContainer === false) {
      replyContainerRef.current.style.display = "none";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reply);
    try {
      const result = await axios.post(`/comment-reply/${comment}`, { reply });
      console.log("REPLY STRING: ", reply);
      console.log(result);
      setReply("");
      handleCloseReplyContainer();
      handleCloseReplyInput();
    } catch (error) {
      console.log("problem puting reply");
      console.error({ message: error.message });
    }
    setReplyContainer(false);
  };

  useEffect(() => {
    const fetchReplyes = async () => {
      try {
        const response = await axios.get(`/fetch-replyes/${comment}`);
        setReplyes(response.data);
      } catch (error) {
        console.error("error fetching repyes: ", error);
      }
    };
    fetchReplyes();
  }, [replyContainer]);

  return (
    <div className="w-[90%] bg-gray-500/55 flex flex-col justify-center items-center rounded-xl">
      <div className="w-full px-3 text-center text-md font-semibold">
        <p>{com.name}</p>
      </div>
      <div className="w-full px-3 text-start text-sm">
        <p>{com.comment}</p>
      </div>
      <div className="w-full px-3 text-[10px] text-end">
        <p>{com.created}</p>
      </div>
      <div className="w-full flex flex-col justify-start items-center px-3 gap-3 text-sm">
        <div
          ref={replyIconRef}
          onClick={handleShowReplyInput}
          className="flex cursor-pointer"
        >
          <i className="fa-solid fa-reply"></i>
        </div>
        <div
          onClick={handleCloseReplyInput}
          ref={eksIconRef}
          className="hidden text-[10px] cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </div>
        <form
          onSubmit={handleSubmit}
          className="hidden flex-col justify-center items-center gap-2"
          ref={replyInputRef}
        >
          <input
            className="rounded-xl border-black border-[3px] h-[50px] text-black px-3"
            type="text"
            name="reply"
            id="reply"
            onChange={(e) => {
              setReply(e.target.value);
            }}
          />
          <button type="submit">Odgovori</button>
        </form>
      </div>
      <div
        onClick={handleReplyContainerShow}
        className="w-full text-[10px] flex justify-center items-center underline cursor-pointer py-3"
      >
        <p>Prikaži sve odgovore</p>
      </div>
      <div
        ref={replyContainerRef}
        className="hidden w-[90%] flex-col justify-center items-end"
      >
        <div
          onClick={handleCloseReplyContainer}
          className="flex justify-center items-center text-md cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </div>
        <div className="flex flex-col justify-center items-end text-[12px]">
          {replyes.replies === undefined ? (
            <></>
          ) : (
            <>
              {replyes.replies.map((reply, index) => {
                if (reply !== "") {
                  return <p key={index}>{reply}</p>;
                }
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
