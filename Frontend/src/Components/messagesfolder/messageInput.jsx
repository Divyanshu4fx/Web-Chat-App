import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

import { FaChevronDown } from "react-icons/fa";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function MessageInput() {
  
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const { loading, sendMessage } = useSendMessage();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
    setShowPicker(false)
  };

  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="relative w-full gap-1">
          
          <span onClick={() => setShowPicker(!showPicker)}>
            {!showPicker && <span className="cursor-pointer">😀</span> }  
            {showPicker && <span className="cursor-pointer"><FaChevronDown /></span>}
          </span>
          {showPicker && (
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              className="absolute right-2 bottom-16"
            />
          )}

          <input
            type="text"
            className="border text-sm rounded-lg block w-11/12 p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message..."
            value={message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="absolute flex items-center inset-y-4 end-0 pe-3"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <IoSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
