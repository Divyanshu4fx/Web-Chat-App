import React from 'react'
import useChat from '../../zustand/useConversation'
import { useSocketContex } from '../../context/scoketContext';
function Chat({ chat, emoji, lastIndex }) {
    const { selectedChat, setSelectedChat } = useChat();
    if (!chat.chatName) {
        const isSelected = selectedChat?._id === chat._id;
        const { onlineUsers } = useSocketContex();
        const isOnline = onlineUsers.includes(chat._id);
        return (
            <>
                <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-blue-600" : ""}`}
                    onClick={() => setSelectedChat(chat)}
                >
                    <div className={`avatar ${isOnline ? "online" : ""}`}>
                        <div className='w-12 rounded-full'>
                            <img src={chat.profilePic} alt='user avatar' />
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 '>
                        <div className='flex gap-3 justify-between'>
                            <p className='font-bold text-black text-lg'>
                                {chat.fullname}
                            </p>
                            <span className='text-xl'>
                                {emoji}
                            </span>
                        </div>
                    </div>
                </div>
                {!lastIndex && <div><hr className='border-t-1 border-white my-0 py-0 h-1' /></div>}
            </>
        )
    }
    else {
        const isSelected = selectedChat?._id === chat._id;
        return (
            <>
                <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-blue-600" : ""}`}
                    onClick={() => setSelectedChat(chat)}
                >
                    <div className={`avatar`}>
                        <div className='w-12 rounded-full'>
                            <img src={chat.groupImage} alt='user avatar' />
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 '>
                        <div className='flex gap-3 justify-between'>
                            <p className='font-bold text-black text-lg'>
                                {chat.chatName}
                            </p>
                            <span className='text-xl'>
                                {emoji}
                            </span>
                        </div>
                    </div>
                </div>
                {!lastIndex && <div><hr className='border-t-1 border-white my-0 py-0 h-1' /></div>}
            </>
        )
    }
}

export default Chat
