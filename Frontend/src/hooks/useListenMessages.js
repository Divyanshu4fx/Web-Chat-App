import { useEffect } from "react";
import {useSocketContex} from "../context/scoketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.wav"
const useListenMessages = ()=>
{
   const {socket} = useSocketContex();
   const {messages,setMessages}= useConversation();

   useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        newMessage.shouldShake= true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages,newMessage])
    })
    return ()=> socket?.off("newMessage");
   },[socket,setMessages,messages]);
}
export default useListenMessages;