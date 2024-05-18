import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";
//SOCKET SHOULD GET CONNECTED WHEN THE USER NEED IT NOT WHEN USER LOGIN ...

//socket context
const SocketContext = createContext();

//custom hook to get the socket instance from context...
const getSocket = () => useContext(SocketContext);

//provider component for managing the socket instance
const SocketProvider = ({ children }) => {
  //   const socket = io("http://localhost:3000", { withCredentials: true });//we dont want the socket to be created everytime so we will wrap it inside useMemo
  const socket = useMemo(() => {
    return io(server, { withCredentials: true });
  }, []); // it wont change until there is changes in dependencies .

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, getSocket };

//socket is connect in app layout when the users detail is displayed
