import React, { useRef, useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { MdEmojiEmotions } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import uploadFile from "../../hooks/useFileUpload";
import useConversation from "../../zustand/useConversation";
import { MdAttachFile } from "react-icons/md";

function MessageInput() {
  const fileInputRef = useRef()
  const [showPicker, setShowPicker] = useState(false);
  const [file, setFile] = useState('')
  const [message, setMessage] = useState("");
  const { selectedChat } = useConversation()

  const onUploadClick = () => {
    fileInputRef.current.click()
  }
  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const { loading, sendMessage } = useSendMessage();
  const { loadingU, upload } = uploadFile();
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0])

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
    setShowPicker(false)
  };

  const getImage = async () => {
    if (file) {
      const data = new FormData()
      data.append("name", file.name)
      data.append("file", file)
      await upload(data)
      setFile('')
    }
  }


  useEffect(() => {
    getImage()
  }, [file]
  )
  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="relative bg-gray-700 rounded-md w-full gap-1 flex items-center justify-center">
          <span className="pl-2" onClick={() => setShowPicker(!showPicker)}>
            {!showPicker && <span className="cursor-point"><MdEmojiEmotions /></span>}
          </span>
          {showPicker && (
            <div className="absolute bottom-0 mb-10 left-0 z-10">
              {showPicker && <span onClick={() => setShowPicker(!showPicker)} className="cursor-pointer text-black"><FaChevronDown /></span>}
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                className="absolute inset-0 right-2 bottom-16"
              />
            </div>
          )}
          {!selectedChat.chatName && <div style={{ margin: "0px", maxWidth: "20px" }}>
            <button onClick={() => onUploadClick()} className="rounded bg-gray-700 text-white"><MdAttachFile /></button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </div>}
          <input
            type="text"
            className=" flex-1 text-sm rounded-lg block w-11/12 p-2.5 bg-gray-700 border-gray-600 text-white"
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
