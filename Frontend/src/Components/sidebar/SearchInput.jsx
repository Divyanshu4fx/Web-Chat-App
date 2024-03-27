import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import useChat from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';
function SearchInput() {
  const [search,setSearch] = useState();
  const {setSelectedChat} = useChat();
  const {chats} = useGetConversation();
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) {return toast.error('Search term must be 3 characters long');}
    const chat = chats.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase()));
    if(chat)
    {
      setSelectedChat(chat);
      setSearch("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex item-center gap-2'>
      <input type="text" placeholder='Search...' className='input input-bordered rounded-full' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
      <IoSearch />
      </button>
    </form>
  )
}

export default SearchInput
