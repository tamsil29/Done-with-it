import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import settings from "../config/settings";

const useSocket = () => {
  const socket = io(settings.socketUrl);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return { socket };
};
export default useSocket;
