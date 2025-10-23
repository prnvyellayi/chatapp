"use client";

import { CreateRoom } from "@/components/chat/createRoom";
import { Context } from "@/context";
import { Redis } from "@upstash/redis";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const redis = new Redis({
  url: "https://us1-gentle-oyster-38766.upstash.io",
  token:
    "AZduASQgYTBhZTBiMTQtYjQzMi00Zjc4LWEwZWQtZjgzYjQ1M2MzMTAwMTcxYzFjMzdiNzJlNDY5MWJmNWM2YmE1M2RkMzdmOGE=",
});

let socket: any;

type response = { username: string; message: string; room: string };

const Chat = () => {
  const { username, secret } = useContext(Context);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<string[]>(["room_1"]);
  const [activeRoom, setActiveRoom] = useState<any>("");

  useEffect(() => {
    const socketInitializer = async () => {
      socket = io(`https://chatappbe-2i2v.onrender.com`, {
        reconnectionDelay: 1000,
        reconnection: true,
        transports: ["websocket"],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
      });
      await socket.on("message", async (data: response) => {
        if (data?.message === "newRoom") {
          const rooms = await redis.keys("*");
          setRooms(rooms.splice(0, rooms.length - 1));
        } else {
          console.log("room", activeRoom, messages)
          setMessages((pre: response[]) => [
            ...pre,
            {
              username: data?.username,
              message: data?.message,
            },
          ]);

          let res: any = await redis.get(data?.room);

          res?.messages.push({
            username: data?.username,
            message: data?.message,
          });

          await redis.set(data?.room, {
            messages: res?.messages,
            users: [],
          });
        }
      });
    };

    socketInitializer();
  }, []);

  const getMessages = async (room: string) => {
    let res = await redis.get(room);
    return res;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await socket.emit("send-message", { username, activeRoom, message });

    setMessage("");
    const chatEle = document!.getElementById("chatDiv");
    chatEle!.scrollTo({
      left: 0,
      top: chatEle!.scrollHeight,
      behavior: "smooth",
    });
  };

  const joinRoom = async (name: string, room: string) => {
    if (activeRoom === room) return;

    let res: any = await redis.get(room);

    if (res) {
      setMessages(res?.messages);
      setUsers(res?.users);
    } else await redis.set(room, { messages: [], users: [] });
    setMessages([]);

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
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);
    await socket.emit("join", { name, room }, (error: any) => {
  }, [activeRoom]);

  }, [activeRoom]);
  useEffect(() => {
  }, [activeRoom]);
    const api = async () => {
  }, [activeRoom]);
      const res: any = await getMessages(activeRoom);
  }, [activeRoom]);
      setMessages(res?.messages);
  }, [activeRoom]);
      setUsers(res?.users);
  }, [activeRoom]);
    };
  }, [activeRoom]);
    api();
  }, [activeRoom]);
  }, [activeRoom]);
  }, [activeRoom]);
              <input

  }, [activeRoom]);
              <input
  useEffect(() => {
  }, [activeRoom]);
              <input
    const getRooms = async () => {
      const rooms = await redis.keys("*");
              <input
      if (rooms.length === 1) {
        await redis.set("room_1", { messages: [], users: [] });
              <input
        setRooms(["room_1"])
      } else setRooms(rooms.splice(0, rooms.length - 1));
              <input
    };

              <input
    getRooms();
  }, []);
              <input

  return (
              <input
    <>
      <div className="bg-gray-400 flex items-center justify-center h-[100vh]">
              <input
        <div className="flex flex-row w-[70%] h-[80%] rounded-[20px] bg-white border-2 border-gray-400 overflow-hidden">
          <div className="flex flex-col w-[30%] h-full border-r-2 border-gray-400 bg-white">
              <input
            <span className="bg-[#eae6df] flex items-center justify-center text-[32px] text-black h-[80px] border-b-[1px] border-gray-400">
              CHAT MATE
              <input
            </span>
            <CreateRoom setRooms={setRooms} activeRoom={activeRoom} />
              <input
            {rooms.map((each: string) => (
              <button
              <input
                key={each}
                className={`w-full border-b-[1px] pl-[10px] justify-center border-gray-400 h-[60px] flex flex-col text-left ${
              <input
                  activeRoom === each ? "bg-gray-600 text-white" : "text-black"
                }`}
              <input
                onClick={() => joinRoom(username, each)}
              >
              <input
                <span className="text-[20px]">
                  {each.toUpperCase()}
              <input
                </span>
                <span className="text-[14px] text-gray-400">
              <input
                  Join {each}
                </span>
              <input
              </button>
            ))}
              <input
          </div>
          <div className="flex flex-col justify-end w-[70%] h-full relative">
              <input
            {username && (
              <>
              <input
                <div className="w-full h-[80px] absolute top-0 bg-[#eae6df] text-[32px] text-[#030303] flex items-center justify-center">
                  {activeRoom.toUpperCase()}
              <input
                </div>
                <div
              <input
                  id="chatDiv"
                  className="flex flex-col p-[10px] overflow-scroll overflow-x-hidden gap-[10px] mt-[80px]"
              <input
                >
                  {messages?.length > 0 &&
                    messages.map(
                      (
                        each: { username: string; message: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className={`flex w-full ${
                            each.username === "admin"
                              ? "justify-center"
                              : each.username === username
                              ? "justify-end"
                              : "justify-start gap-1"
                          } `}
                        >
                          <span
                            className={`w-[30px] h-[30px] rounded-[50%] bg-gray-800 flex justify-center items-center text-white text-[18px] ${
                              each.username === "admin"
                                ? "hidden"
                                : each.username === username
                                ? "hidden"
                                : "self-start"
                            }`}
                          >
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
                className="rounded-[10px] w-[90%] bg-white px-[1vw] h-[50px] text-[17px] focus:outline-none text-black"
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
