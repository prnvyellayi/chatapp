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
    socket.on(
      "recieve-message",
      (data: { username: string; message: string }) => {
        setMessages((pre : { username: string; message: string }[]) => [...pre, data])
      }
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setMessages((pre : { username: string; message: string }[]) => [...pre, {username:username, message: message}])
    socket.emit("send-message", { username, message });
  };

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-center h-[100vh]">
        <div className="w-[70%] h-[80%] rounded-[20px] bg-slate-700 border-4 border-white flex flex-col items-center justify-end">
          {!username && (
            <div className="flex flex-col">
              {messages.map(
                (
                  each: { username: string; message: string },
                  index: number
                ) => (
                  <span key={index} className="m-0 p-0">
                    {each.username} : {each.message}
                  </span>
                )
              )}
            </div>
          )}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={(e) => handleSubmit(e)}>submit</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
