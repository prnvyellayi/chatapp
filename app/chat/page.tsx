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
    setMessage("")
  };

  return (
    <>
      <div className="bg-gray-400 flex items-center justify-center h-[100vh]">
        <div className="flex flex-row w-[70%] h-[80%] rounded-[20px] bg-white border-2 border-gray-400 overflow-hidden">
          <div className="flex flex-col w-[30%] h-full border-r-2 border-gray-400 bg-white">
            <span className="bg-[#eae6df] flex items-center justify-center text-[32px] h-[80px] border-b-[1px] border-gray-400">
              CHAT MATE
            </span>
            <button className="w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left">
              <span className="text-[20px]">Room 1</span>
              <span className="text-[14px] text-gray-400">Join Room 1</span>
            </button>
            <button className="w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left">
              <span className="text-[20px]">Room 2</span>
              <span className="text-[14px] text-gray-400">Join Room 2</span>
            </button>
            <button className="w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left">
              <span className="text-[20px]">Room 3</span>
              <span className="text-[14px] text-gray-400">Join Room 3</span>
            </button>
            <button className="w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left">
              <span className="text-[20px]">Room 4</span>
              <span className="text-[14px] text-gray-400">Join Room 4</span>
            </button>
            <button className="w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left">
              <span className="text-[20px]">Room 5</span>
              <span className="text-[14px] text-gray-400">Join Room 5</span>
            </button>
          </div>
          <div className="flex flex-col justify-end w-[70%] h-full">
            {username && (
              <div className="flex flex-col p-[10px] overflow-scroll gap-[10px]">
                {messages.map(
                  (
                    each: { username: string; message: string },
                    index: number
                  ) => (
                    <span
                      key={index}
                      className={`max-w-[50%] rounded-[10px] p-[10px] text-[17px] break-words	${
                        each.username === username
                          ? "self-end rounded-tr-[0px] bg-gray-400 text-white"
                          : "self-start rounded-tl-[0px] text-[#030303] border-2 bg-gray-100"
                      }`}
                    >
                      {each.message}
                    </span>
                  )
                )}
              </div>
            )}
            <form className="flex w-[100%] p-[10px] justify-evenly gap-[10px] bg-[#eae6df]" onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-[10px] w-[90%] bg-white px-[1vw] h-[50px] text-[17px]"
              ></input>
              <button
                type="submit"
                className="rounded-[50%] bg-white text-black w-[50px] text-[20px] h-[50px]"
              >{`->`}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
