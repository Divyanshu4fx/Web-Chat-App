import React, { useEffect } from 'react'
import Messages from './messages.jsx'
import MessageInput from './messageInput.jsx'
import { LuMessagesSquare } from "react-icons/lu";
import useChat from '../../zustand/useConversation.js';
import { useAuthContext } from '../../context/authContext.jsx';
function MessageContainer() {
  const { selectedChat, setSelectedChat } = useChat();
  useEffect(() => {
    return () => setSelectedChat(null);
  }, [setSelectedChat])
  if (selectedChat && !selectedChat.chatName) {
    return (
      <div className='md:min-w-[450px] flex flex-col'>
        {!selectedChat ? <NoChatSelected /> : (
          <>
            <div className='bg-slate-500 px-4 py-2 mb-2'>
              <span className='label-text'>To : </span><span className='text-gray-900 font-bold'>{selectedChat.fullname}</span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    )
  }
  else {
    return (
      <div className='md:min-w-[450px] flex flex-col'>
        {!selectedChat ? <NoChatSelected /> : (
          <>
            <div className='bg-slate-500 px-4 py-2 mb-2'>
              <span className='label-text'>To : </span><span className='text-gray-900 font-bold'>{selectedChat.chatName}</span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    )
  }
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullname}</p>
        <p>Select a chat to start messaging</p>
        <LuMessagesSquare className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}

export default MessageContainer
