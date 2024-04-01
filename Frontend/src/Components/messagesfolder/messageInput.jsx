import React, { useRef, useState ,useEffect } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { MdEmojiEmotions } from "react-icons/md";
import { FaChevronDown} from "react-icons/fa";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import  uploadFile from "../../hooks/useFileUpload";
import useConversation from "../../zustand/useConversation";


function MessageInput() {
  const fileInputRef = useRef()
  const [showPicker, setShowPicker] = useState(false);
  const [file, setFile] =useState('')
  const [message, setMessage] = useState("");
  const {selectedChat} = useConversation()

  const onUploadClick= () => {
    fileInputRef.current.click()
  }
  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const { loading, sendMessage } = useSendMessage();
  const {  upload } = uploadFile();
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleFileChange= (e) => {
      setFile(e.target.files[0])
      
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
    setShowPicker(false)
  };
  
  const getImage= async() => {
    if(file) {
      const data= new FormData()
      data.append("name", file.name)
      data.append("file", file)
      await upload(data)
      setFile('')
    }
  }
  
  
  useEffect(()=> {
    getImage()
   }, [file]
   )
  return (
    <div>
      {!selectedChat.chatName && <div>
        <button onClick={()=> onUploadClick()} className="rounded border p-2.5 bg-gray-700 border-gray-600 text-white mx-4">Send a file </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="invisible" />
      </div>}
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="relative w-full gap-1">
          <span onClick={() => setShowPicker(!showPicker)}>
            {!showPicker && <span className="cursor-pointer"><MdEmojiEmotions /></span> }  
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
