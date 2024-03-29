import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useChat from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import {Link} from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";

function SearchInput() {
  const [search, setSearch] = useState();
  const { setSelectedChat } = useChat();
  const { chats } = useGetConversation();
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
        className="flex items-center justify-center px-4 py-2 font-bold text-white bg-blue-400 border rounded-full hover:bg-blue-700"
      >
       <VscAccount className="scale-150" />
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
