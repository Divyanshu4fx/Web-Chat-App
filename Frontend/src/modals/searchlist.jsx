import React, { useState, useEffect } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";

function SearchList(props) {
    const [filteredChats, setFilteredChats] = useState([]);
    
    useEffect(() => {
        const filteredChats = props.chats.filter((chat) =>
            (chat.fullname?.toLowerCase().includes(props.search.toLowerCase())) ||
            (chat.chatName?.toLowerCase().includes(props.search.toLowerCase()))
        );
        setFilteredChats(filteredChats);
    }, [props.chats, props.search]);

    function handleClick(element) {
        props.setSelectedChat(element);
        props.setSearch("");
        props.setEnableSearch(false);
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-black opacity-50'></div>

            <form className='relative z-10 flex flex-col px-8 py-4 bg-white rounded-lg' style={{ minWidth: "350px", minHeight: "415px" }}>
                <button className='absolute top-0 right-0 px-1.5 py-1 m-1 bg-red-500 text-white rounded-md' onClick={(e) => { props.setEnableSearch(false) }}>X</button>
                <label className='label text-black'>Search :</label>
                <input className='input' type='text' placeholder='Search here...' value={props.search} onChange={(e) => { props.setSearch(e.target.value) }} />
                <div className='divider'></div>
                <div className='text-black' style={{ maxWidth: "300px", maxHeight: "250px", overflowY: "scroll", overflowX: "hidden" }}>
                    {filteredChats.map((element) => (
                        <div key={element._id} className='flex p-3 rounded-md flex-row items-center hover:bg-slate-400 cursor-pointer' onClick={() => handleClick(element)}>
                            <img className='inline w-12 h-12 rounded-full' src={element.profilePic || element.groupImage} alt="" />
                            <div className='p-1 flex-1'>
                                <h1 className='text-center'>{element.fullname || element.chatName}</h1>
                                <h1 className='text-center' style={{ textAlign: 'center' }}>{element.email}</h1>
                            </div>
                            <div className="ml-auto">
                                <button className=''><IoAddCircleOutline /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default SearchList;
