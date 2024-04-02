import React, { useEffect } from 'react'
import Messages from './messages.jsx'
import MessageInput from './messageInput.jsx'
import { LuMessagesSquare } from "react-icons/lu";
import useChat from '../../zustand/useConversation.js';
import { useAuthContext } from '../../context/authContext.jsx';
function MessageContainer() {
  const { selectedChat, setSelectedChat } = useChat();
  console.log(selectedChat);
  useEffect(() => {
    return () => setSelectedChat(null);
  }, [setSelectedChat])
  if (selectedChat && !selectedChat.chatName) {
    return (
      <div className='md:min-w-[450px] flex flex-col'>
        {!selectedChat ? <NoChatSelected /> : (
          <>
            <div className='bg-slate-700 px-4 py-2 mb-2'>
              <span className='label-text text-lg font-bold text-white'>To : </span><span className='text-cyan-200 font-semibold'>{selectedChat.fullname}</span>
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
      <div className='md:min-w-[450px] flex flex-col max'>
        {!selectedChat ? <NoChatSelected /> : (
          <>
            <div className='bg-slate-700 px-4 py-2 mb-2'>
              <span className='label-text text-lg font-bold text-white'>To : </span><span className='text-cyan-200 font-semibold'>{selectedChat.chatName}</span>
              <div className='flex'>
                {selectedChat.participants.map((participant, idx) => (
                  <span  className='text-cyan-100 mx-0.5 p-0.5 text-xs rounded-lg ' key={idx}>{participant.fullname}</span>
                ))}
              </div>
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
      <div className='px-4 text-center sm:text-lg md:text-2xl text-black font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 <span className='underline'>{authUser.fullname}</span></p>
        <p>Select a chat to start messaging</p>
        <LuMessagesSquare className='text-4xl md:text-6xl text-center' />
      </div>
    </div>
  )
}

export default MessageContainer
