import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./components/constants/config";

const SocketContext = createContext();

export const getSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
