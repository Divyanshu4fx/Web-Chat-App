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
                    {/* <div className={`chat-bubble text-white max-w-60 ${chatColor} ${shakeClass}`}>
                    <div style={{ wordWrap: 'break-word' }}>
                        {message.message}
                    </div>
                </div> */}
                    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
                    {!message.isFileType && <div style={{ wordWrap: 'break-word' }} className={`chat-bubble text-white ${chatColor} ${shakeClass}`}>{message.message}</div>}
                    <div className='flex flex-row '>
                        {message.isFileType && <a style={{ wordWrap: 'break-word' }} className={`chat-bubble text-white bg-cyan-500 ${shakeClass} `}>{message.message}</a>}
                        {message.isFileType && !fromMe && <a href={`http://localhost:8000/api/messages/file/${message._id}`} className={`  bg-cyan-500 border rounded-full h-fit p-1 mx-1`}><IoMdDownload /></a>}
                    </div>
                    <div className='flex items-center gap-1 text-xs opacity-50 chat-footer'>{formattedTime}</div>
                </div>
                <div className='chat-footer text-xs text-white flex gap-1 items-center'>{formattedTime}</div>
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
                <div className='flex items-center gap-1 text-xs opacity-50 chat-footer'>{formattedTime}</div>
            </div>
        )
    }
}
export default Message