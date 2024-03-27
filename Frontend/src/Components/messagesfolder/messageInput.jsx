import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../hooks/useSendMessage';

function MessageInput() {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
          <input 
            type='text' 
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' 
            placeholder='Send a message...'
            value={message}
            onChange={handleChange}
          />
          <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            {loading ? <span className='loading loading-spinner'></span> : <IoSend />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
