import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useChat from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import {Link} from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { useAuthContext } from "../../context/authContext";

function SearchInput() {
  const [search, setSearch] = useState();
  const { setSelectedChat } = useChat();
  const { chats } = useGetConversation();
  const {authUser} = useAuthContext();
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
    <div className="flex flex-row gap-1">
      <Link
        to="/profile"
        className="flex items-center p-0 bg-transparent justify-center font-bold text-white bg-blue-400 border-none rounded-full "
      >
       <img src={authUser.profilePic} className="rounded-full w-10"  alt="" />
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
        <button type="submit" className="text-white btn btn-circle bg-sky-500">
          <IoSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
