import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/authContext';
import useConversation from "../../zustand/useConversation";
import useGetUser from "../../hooks/useGetUser";
import { extractTime } from '../../utils/extractTime';
import { IoMdDownload } from "react-icons/io";
function Message({ message }) {
    const { authUser } = useAuthContext();
    const { selectedChat } = useConversation();
    const { getUser } = useGetUser();
    const fromMe = authUser._id === message.senderId;
    const messageClass = fromMe ? "chat-end" : "chat-start";
    const chatColor = fromMe ? "bg-rose-500" : "";
    const formattedTime = extractTime(message.createdAt);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            if (selectedChat.chatName && !fromMe) {
                try {
                    setUserData(await getUser(message.senderId));
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };
        fetchUserData();
    }, [message]);
    if (!selectedChat.chatName) {
        const profilePic = fromMe ? authUser.profilePic : selectedChat?.profilePic;
        const shakeClass = message.shouldShake ? "shake" : "";
        return (
            <div>
                <div className={`chat ${messageClass}`}>
                    <div className='chat-image avatar'>
                        <div className='w-10 rounded-full'>
                            <img src={profilePic} alt="User Avatar" />
                        </div>
                    </div>
                    <div className='chat-footer text-white text-xs flex gap-1 items-center'>{formattedTime}</div>
                    {!message.isFileType && <div style={{ wordWrap: 'break-word' }} className={`chat-bubble text-white max-w-48 ${chatColor} ${shakeClass}`}>{message.message}</div>}
                    <div className='flex flex-row '>
                        {message.isFileType && <a style={{ wordWrap: 'break-word' }} className={`chat-bubble text-white ${chatColor} ${shakeClass} `}>{message.message}</a>}
                        {message.isFileType && !fromMe && <a href={`https://web-chat-app-deploy.onrender.com/api/messages/file/${message._id}`} className={`text-white border-2 rounded-full h-fit p-1 mx-1`}><IoMdDownload /></a>}
                    </div>
                </div>
            </div>
        )
    }
    else {
        let profilePic = null;
        let fullname = null;
        if (userData && !fromMe) {
            profilePic = userData.profilePic;
            fullname = userData.fullname;
        }
        else {
            profilePic = authUser.profilePic;
        }
        return (
            <div className={`chat ${messageClass}`}>
                <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                        <img src={profilePic} alt="User Avatar" />
                    </div>
                </div>
                <div className={`chat-bubble text-white ${chatColor} `}>{message.message}
                    <div className='text-white' style={{ fontSize: '8px' }}>{fullname}</div>
                </div>
                <div className='flex items-center gap-1 text-xs opacity-50 text-white'>{formattedTime}</div>
            </div>
        )
    }
}
export default Message