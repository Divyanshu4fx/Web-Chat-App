import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useChat from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../../context/authContext";
import CreateGroup from "../../modals/createGroup";
import SearchList from "../../modals/searchlist";
function SearchInput() {
  const [visibility, setVisibility] = useState(false);
  const [search, setSearch] = useState();
  const [enableSearch ,setEnableSearch] = useState(false);
  const { setSelectedChat } = useChat();
  const { chats, setChats } = useGetConversation();
  const { authUser } = useAuthContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setEnableSearch(true);
  //   if (!search) return;
  //   if (search.length < 3) {
  //     return toast.error("Search term must be 3 characters long");
  //   }
  //   const filteredChats = chats.filter((c) =>
  //     (c.fullname?.toLowerCase().includes(search.toLowerCase())) ||
  //     (c.chatName?.toLowerCase().includes(search.toLowerCase()))
  //   );
  //   // const chat = chats.find((c) =>
  //   //   c.fullname.toLowerCase().includes(search.toLowerCase())
  //   // );
  //   console.log(filteredChats);
  //   if (filteredChats) {
  //     setChats(filteredChats);
  //   }
  //   // if (chat) {
  //   //   setSelectedChat(chat);
  //   //   setSearch("");
  //   // }
    return;
  };

  return (
    <>
      {enableSearch && <SearchList setSelectedChat={setSelectedChat} chats={chats} enableSearch={enableSearch} search={search} setSearch={setSearch} setEnableSearch={setEnableSearch} />}
      <div className="flex flex-row gap-1 mb-4">
        <Link
          to="/profile"
          className="flex items-center pr-2 bg-transparent justify-center font-bold text-white bg-blue-400 rounded-full scale-125"
        >
          <img src={authUser.profilePic} className="rounded-full border-2 border-black w-10 hover:border-white" alt="" />
        </Link>
        <form onSubmit={handleSubmit} className="flex gap-2 item-center">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full  input input-bordered"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSubmit(e);
            }}
          />
          <button type="submit" className="text-white btn btn-circle bg-blue-700 border-2 border-black">
            <IoSearch />
          </button>
        </form>
      </div>
      <button className="text-white bg-black inline-block p-1 rounded-md mt-1 hover:bg-slate-900" onClick={() => setVisibility(true)}>+ Create Group</button>
      <CreateGroup visibility={visibility} setVisibility={setVisibility} chats={chats} />
    </>
  );
}

export default SearchInput;
