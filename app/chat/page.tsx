"use client";

import { Context } from "@/context";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Server } from "socket.io";

let socket: any;

type response = { username: string; message: string };

const Chat = () => {
  const { username, secret } = useContext(Context);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    socket = io("http://localhost:8080", {
      reconnectionDelay: 1000,
      reconnection: true,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });
    socket.on("recieve-message", (data: response) => {
      console.log(data);
      setMessages((pre: response[]) => [...pre, data]);
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setMessages((pre: response[]) => [
      ...pre,
      { username: username, message: message },
    ]);
    socket.emit("send-message", { username, message });
  };

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-center h-[100vh]">
        <div className="w-[70%] h-[80%] rounded-[20px] bg-slate-700 border-4 border-white flex flex-col justify-end">
          {username && (
            <div className="flex flex-col">
              {messages.map(
                (
                  each: { username: string; message: string },
                  index: number
                ) => (
                  <span key={index} className={`h-[fit-content] text-black bg-white max-w-[40%] rounded-[1.11vw] ${each.username === username? 'self-end rounded-tr-0' : 'self-start rounded-tl-0'}`}>
                    {each.message}
                  </span>
                )
              )}
            </div>
          )}
          <form className="flex w-full px-[3vw]" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-[1.38vw] bg-white px-[1vw]"
            ></input>
            <button
              type="submit"
              className="rounded-[50%] bg-white text-black"
            >{`->`}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
