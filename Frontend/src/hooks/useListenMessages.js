import { useEffect } from "react";
import {useSocketContex} from "../context/scoketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.wav";
import { useAuthContext } from "../context/authContext";
const useListenMessages = ()=>
{
    const { authUser } = useAuthContext();
   const {socket} = useSocketContex();
   const {messages,setMessages}= useConversation();
    const 
   useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        if(newMessage.senderId === authUser._id)
            return;
        newMessage.shouldShake= true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages,newMessage])
    })
    return ()=> socket?.off("newMessage");
   },[socket,setMessages,messages]);
}
export default useListenMessages;