import React from 'react'
import { useAuthContext } from '../../context/authContext';
import useConversation from "../../zustand/useConversation";
import { extractTime } from '../../utils/extractTime';
function Message({message}) {
    const {authUser} = useAuthContext();
    const {selectedChat} = useConversation();
    const fromMe = authUser._id === message.senderId;
    const messageClass = fromMe? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedChat?.profilePic;
    const chatColor = fromMe ? "bg-blue-500" : "";
    const formattedTime = extractTime(message.createdAt);
    const shakeClass = message.shouldShake ? "shake" : "";
    // console.log(authUser);
    // console.log(fromMe);
    return (
        <div className={`chat ${messageClass}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePic} alt="User Avatar" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${chatColor} ${shakeClass}`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    )
}
export default Message
