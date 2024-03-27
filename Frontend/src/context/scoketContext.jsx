import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from 'socket.io-client'

const SocketContex = createContext();

export const useSocketContex = ()=>{
    return useContext(SocketContex);
}

export const SocketContexProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();
    useEffect(() => {
        if (authUser) {
            const Socket = io("http://localhost:8000",{
                query:{
                    userId : authUser._id
                }
            });
            setSocket(Socket);
            Socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })
            return () => Socket.close();
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])
    return <SocketContex.Provider value={{ socket, onlineUsers }}>{children}</SocketContex.Provider>
};