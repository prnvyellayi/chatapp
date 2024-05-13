/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Redis } from "@upstash/redis";
import { useCallback, useState } from "react";
import io from "socket.io-client";

let socket: any;

type response = { username: string; message: string; room: string };

export function CreateRoom({ setRooms, activeRoom }: any) {
  const [newRoom, setNewRoom] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false)

  const createRoom = useCallback(
    async (e: any) => {
      e.preventDefault();

      const redis = new Redis({
        url: "https://us1-gentle-oyster-38766.upstash.io",
        token:
          "AZduASQgYTBhZTBiMTQtYjQzMi00Zjc4LWEwZWQtZjgzYjQ1M2MzMTAwMTcxYzFjMzdiNzJlNDY5MWJmNWM2YmE1M2RkMzdmOGE=",
      });

      redis.set(newRoom, { messages: [], users: [] });
      setRooms((prev: any) => [...prev, newRoom]);
      socket = io(`http://localhost:8080`, {
        reconnectionDelay: 1000,
        reconnection: true,
        transports: ["websocket"],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
      });

      await socket.emit("newRoom", { newRoom }, (error: any) => {
        if (error) {
          alert(error);
        }
      });
      setOpen(false)
    },
    [newRoom]
  );

  return (
    <Dialog open={open} onOpenChange={() => setOpen(true)}>
      <DialogTrigger asChild>
        <button
          className={`w-full border-b-[1px] pl-[10px] justify-center bg-[#eae6df] border-gray-400 h-[60px] flex flex-col items-center text-black `}
        >
          <span className="text-lg">CREATE ROOM +</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
        <DialogHeader className="self-start">
          <DialogTitle>Add Room</DialogTitle>
          <DialogDescription>
            Type the name of the room you want to create...
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <div className="items-center">
            <Input
              id="name"
              value={newRoom}
              onChange={(e: any) => setNewRoom(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <button type="submit" onClick={createRoom} className="rounded-xl text-white bg-black py-3 px-4">
          Save changes
        </button>
      </DialogContent>
    </Dialog>
  );
}
