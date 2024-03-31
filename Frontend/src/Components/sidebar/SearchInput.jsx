import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useChat from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../../context/authContext";
import CreateGroup from "../../modals/createGroup";

function SearchInput() {
  const [visibility,setVisibility] = useState(false);
  const [search, setSearch] = useState();
  const { setSelectedChat } = useChat();
  const { chats } = useGetConversation();
  const { authUser } = useAuthContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be 3 characters long");
    }
    const chat = chats.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (chat) {
      setSelectedChat(chat);
      setSearch("");
    }
  };

  return (
    <>
      <div className="flex flex-row gap-1 mb-4">
        <Link
          to="/profile"
          className="flex items-center pr-2 bg-transparent justify-center font-bold text-white bg-blue-400 rounded-full scale-125"
        >
          <img src={authUser.profilePic} className="rounded-full border-2 border-white w-10 hover:border-black" alt="" />
        </Link>
        <form onSubmit={handleSubmit} className="flex gap-2 item-center">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full input input-bordered"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit" className="text-white btn btn-circle bg-blue-700 border-2 border-black">
            <IoSearch />
          </button>
        </form>
      </div>
      <button className="text-white bg-black inline-block p-1 rounded-md mt-1 hover:bg-slate-900" onClick={()=>setVisibility(true)}>+ Create Group</button>
      <CreateGroup visibility={visibility} setVisibility={setVisibility} chats={chats} />
    </>
  );
}

export default SearchInput;
