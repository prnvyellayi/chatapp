"use client";

import Link from "next/link";
import { Context } from "@/context";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { username, secret, setUsername, setSecret } = useContext(Context);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const checkUser = await fetch(`${process.env.CHAT_SERVER}/addUser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: username })
    });
    console.log(checkUser);
    if (checkUser.status === 200) {
      router.push("/chat");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-center h-[100vh]">
        <form
          className="w-[27%] h-1/2 flex flex-col items-center justify-evenly shadow-2xl bg-slate-700 rounded-2xl p-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <span className="text-[28px] text-white font-bold flex flex-col items-center">
            NextJs Chat-App
            {error ? (
              <span className="text-[14px] text-red-600 font-medium">
                Username already exists.
              </span>
            ) : (
              <></>
            )}
          </span>
          <div className="flex flex-col w-full items-center">
            <input
              placeholder="Email"
              className="w-4/5 text-[14px] text-white px-2 border-b-2 border-sky-500 bg-transparent focus:outline-0	mb-6"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="w-4/5 text-[14px] text-white px-2 border-b-2 border-sky-500 bg-transparent focus:outline-0"
              onChange={(e) => setSecret(e.target.value)}
            ></input>
          </div>
          <button
            type="submit"
            className="h-[50px] bg-sky-500 text-white w-4/5 rounded-lg"
          >
            Login / Sign up
          </button>
        </form>
      </div>
    </>
  );
}
