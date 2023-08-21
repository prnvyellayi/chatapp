"use client"

import React, { Dispatch, useState, createContext } from "react";

export const Context = createContext<{
  username: string;
  secret: string;
  setUsername: Function;
  setSecret: Function;
}>({ username: "", secret: "", setUsername: () => null, setSecret: () => null });

export const ContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");

  const value = {
    username,
    setUsername,
    secret,
    setSecret,
  };

  return <Context.Provider value={value}>
  {children}
</Context.Provider>
};
