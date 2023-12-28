"use client";

import { Context } from "@/context";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

type response = { username: string; message: string; room: string };

const Chat = () => {
  const { username, secret } = useContext(Context);
  const [message, setMessage] = useState("");
  const [messages1, setMessages1] = useState<any>([]);
  const [messages2, setMessages2] = useState<any>([]);
  const [messages3, setMessages3] = useState<any>([]);
  const [messages4, setMessages4] = useState<any>([]);
  const [messages5, setMessages5] = useState<any>([]);
  const [activeRoom, setActiveRoom] = useState<any>("");

  useEffect(() => {
    const socketInitializer = async () => {
      socket = io(`${process.env.NEXT_PUBLIC_CHAT_SERVER}`, {
        reconnectionDelay: 1000,
        reconnection: true,
        transports: ["websocket"],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
      });
      await socket.on("message", (data: response) => {
        console.log(data);
        switch (data.room) {
          case "room1":
            setMessages1((pre: response[]) => [...pre, data]);
            break;
          case "room2":
            setMessages2((pre: response[]) => [...pre, data]);
            break;
          case "room3":
            setMessages3((pre: response[]) => [...pre, data]);
            break;
          case "room4":
            setMessages4((pre: response[]) => [...pre, data]);
            break;
          case "room5":
            setMessages5((pre: response[]) => [...pre, data]);
            break;
          default:
            return [];
        }
      });
    };

    socketInitializer();
  }, []);

  const getMessages = (room: string) => {
    switch (room) {
      case "room1":
        return messages1;
      case "room2":
        return messages2;
      case "room3":
        return messages3;
      case "room4":
        return messages4;
      case "room5":
        return messages5;
      default:
        return [];
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // setMessages1((pre: response[]) => [
    //   ...pre,
    //   { username: username, message: message },
    // ]);
    await socket.emit("send-message", { username, activeRoom, message });
    setMessage("");
  };

  const joinRoom = async (name: string, room: string) => {
    if (activeRoom === room) return;
    if (activeRoom !== "") {
      await socket.emit("leaveRoom", { name, activeRoom }, (error: any) => {
        if (error) {
          alert(error);
        }
      });
    }
    setActiveRoom(room);
    await socket.emit("join", { name, room }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  };

  return (
    <>
      <div className="bg-gray-400 flex items-center justify-center h-[100vh]">
        <div className="flex flex-row w-[70%] h-[80%] rounded-[20px] bg-white border-2 border-gray-400 overflow-hidden">
          <div className="flex flex-col w-[30%] h-full border-r-2 border-gray-400 bg-white">
            <span className="bg-[#eae6df] flex items-center justify-center text-[32px] h-[80px] border-b-[1px] border-gray-400">
              CHAT MATE
            </span>
            <button
              className={`w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left ${
                activeRoom === "room1" ? "bg-gray-600 text-white" : "text-black"
              }`}
              onClick={() => joinRoom(username, "room1")}
            >
              <span className="text-[20px]">Room 1</span>
              <span className="text-[14px] text-gray-400">Join Room 1</span>
            </button>
            <button
              className={`w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left ${
                activeRoom === "room2" ? "bg-gray-600 text-white" : "text-black"
              }`}
              onClick={() => joinRoom(username, "room2")}
            >
              <span className="text-[20px]">Room 2</span>
              <span className="text-[14px] text-gray-400">Join Room 2</span>
            </button>
            <button
              className={`w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left ${
                activeRoom === "room3" ? "bg-gray-600 text-white" : "text-black"
              }`}
              onClick={() => joinRoom(username, "room3")}
            >
              <span className="text-[20px]">Room 3</span>
              <span className="text-[14px] text-gray-400">Join Room 3</span>
            </button>
            <button
              className={`w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left ${
                activeRoom === "room4" ? "bg-gray-600 text-white" : "text-black"
              }`}
              onClick={() => joinRoom(username, "room4")}
            >
              <span className="text-[20px]">Room 4</span>
              <span className="text-[14px] text-gray-400">Join Room 4</span>
            </button>
            <button
              className={`w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left ${
                activeRoom === "room5" ? "bg-gray-600 text-white" : "text-black"
              }`}
              onClick={() => joinRoom(username, "room5")}
            >
              <span className="text-[20px]">Room 5</span>
              <span className="text-[14px] text-gray-400">Join Room 5</span>
            </button>
          </div>
          <div className="flex flex-col justify-end w-[70%] h-full relative">
            {username && (
              <>
                <div className="w-full h-[80px] absolute top-0 bg-[#eae6df] text-[32px] text-[#030303] flex items-center justify-center">
                  {activeRoom.toUpperCase()}
                </div>
                <div className="flex flex-col p-[10px] overflow-scroll overflow-x-hidden gap-[10px] mt-[80px]">
                  {getMessages(activeRoom).map(
                    (
                      each: { username: string; message: string },
                      index: number
                    ) => (
                      <div key={index} className={`flex w-full ${each.username === 'admin' ? 'justify-center' : each.username === username ? 'justify-end' : 'justify-start gap-1'} `}>
                        <span className={`w-[30px] h-[30px] rounded-[50%] bg-gray-800 flex justify-center items-center text-white text-[18px] ${each.username === 'admin' ? 'hidden' : each.username === username ? 'hidden' : 'self-start'}`}>
                          {each.username.split("")[0].toUpperCase()}
                        </span>
                        <div
                          key={index}
                          className={`max-w-[50%] rounded-[10px] p-[10px] text-[14px] break-words	flex flex-col text-left ${
                            each.username === "admin"
                              ? "self-center text-[10px] text-center bg-gray-700 text-white flex items-center"
                              : each.username === username
                              ? "self-end rounded-tr-[0px] bg-gray-500 text-white"
                              : "self-start rounded-tl-[0px] text-[#030303] border-2 bg-gray-100"
                          }`}
                        >
                          <span
                            className={
                              each.username === "admin" ||
                              each.username === username
                                ? "hidden"
                                : "font-bold text-[13px]"
                            }
                          >
                            ~ {each.username}
                          </span>
                          <span>{each.message}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
            <form
              className="flex w-[100%] p-[10px] justify-evenly gap-[10px] bg-[#eae6df]"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-[10px] w-[90%] bg-white px-[1vw] h-[50px] text-[17px] focus:outline-none"
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
