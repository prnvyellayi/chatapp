"use client";

import { useRouter } from "next/router";
import { Context } from "@/context";
import { useContext } from "react";
import axios from "axios";

export default function Home() {
  const { setUsername, setSecret } = useContext(Context);

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-center h-[100vh]">
        <form
          className="w-[27%] h-1/2 flex flex-col items-center justify-evenly shadow-2xl bg-slate-700 rounded-2xl p-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="text-[28px] text-white font-bold">
            NextJs Chat-App
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
            className="h-[50px] text-white bg-sky-500 w-4/5 rounded-lg"
          >
            Login / Sign up
          </button>
        </form>
      </div>
    </>
  );
}
