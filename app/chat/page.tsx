"use client"

import { Context } from "@/context";
import { useContext, useState } from "react";

const Chat = () => {
  const { username, secret, setUsername, setSecret } = useContext(Context);

  const handleSubmit = () => {
    
  }
  return (
    <>
      <div className="bg-slate-300 flex items-center justify-center h-[100vh]">
        <div className="w-[70%] h-[80%] rounded-[20px] bg-slate-700 border-4 border-white">
          <input type='text'></input>
          <button onClick={() => handleSubmit()}></button>
        </div>
      </div>
    </>
  );
};

export default Chat;