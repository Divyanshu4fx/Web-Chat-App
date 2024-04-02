import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoAddCircleOutline } from "react-icons/io5";
import useCreateGroup from "../hooks/useCreateGroup";
function CreateGroup(props) {
    const [users, setUsers] = useState(props.chats.filter((object) => { if (!object.chatName && object._id !== "660913e18dba4e4ba213aafa") return object; }));
    const [selectedUser, setSelectedUser] = useState([]);
    const { loading, createGroup } = useCreateGroup();
    const [groupName, setGroupName] = useState("");
    function handleSearch(e) {
        const input = e.target.value.toLowerCase().trim();
        if (input === "") {
            setUsers(props.chats.filter((object) => { if (!object.chatName && object._id !== "660913e18dba4e4ba213aafa") return object; }));
            return;
        }
        const matchingNames = props.chats.filter((object) => {
            if (!object.chatName && object._id !== "660913e18dba4e4ba213aafa" && object.fullname.toLowerCase().includes(input)) return object;
        });
        setUsers(matchingNames);
    }

    function handleAdd(id) {
        const alreadySelected = selectedUser.find(user => user._id === id);
        if (alreadySelected) {
            toast.error('User already selected')
            return;
        }
        setSelectedUser([...selectedUser, props.chats.find(object => object._id === id)]);
    }

    function handleDelete(id) {
        const updatedSelectedUser = selectedUser.filter(user => user._id !== id);
        setSelectedUser(updatedSelectedUser);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createGroup(groupName, selectedUser);
        console.log(success);
        if (success) {
            location.reload();
        }
    }
    return (
        props.visibility && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='absolute inset-0 bg-black opacity-50'></div>

                <form className='relative z-10 flex flex-col px-8 py-4 bg-white rounded-lg' style={{ minWidth: "350px", minHeight: "415px" }}>
                    <button className='absolute top-0 right-0 px-1.5 py-1 m-1 bg-red-500 text-white rounded-md' onClick={(e) => { props.setVisibility(false) }}>X</button>
                    <label className='label text-black'>Group Name</label>
                    <input className='input' type='text' placeholder='Enter Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    <label className='label text-black'>Select Participants</label>
                    <input className='input' type='text' placeholder='Eg. John Doe' onChange={handleSearch} />
                    <button type='submit' className='text-white my-1 py-1 rounded-lg bg-slate-700' onClick={handleSubmit}>{loading ?<span className='loading loading-spinner'></span> : "Create Group"}</button>
                    <div className='flex cursor-pointer' style={{ overflowX: "auto", maxWidth: "300px", }}>
                        {selectedUser.map((element) => (
                            <span key={element._id} className='bg-red-500 text-xs p-1 mr-0.5 text-white rounded-lg' style={{ flexShrink: 0 }} onClick={() => handleDelete(element._id)}>
                                {element.fullname} X
                            </span>
                        ))}
                    </div>
                    <div className='divider my-1'></div>

                    <div className='text-black' style={{ maxWidth: "300px", maxHeight: "150px", overflowY: "scroll", overflowX: "hidden" }}>
                        {users.map((element) => (
                            <div key={element._id} className='flex p-3 rounded-md flex-row items-center hover:bg-slate-400 cursor-pointer' onClick={() => handleAdd(element._id)}>
                                <img className='inline w-12 h-12 rounded-full' src={element.profilePic} alt="" />
                                <div className='p-1 flex-1'>
                                    <h1 className='text-center'>{element.fullname}</h1>
                                    <h1 className='text-center' style={{ textAlign: 'center' }}>{element.email}</h1>
                                </div>
                                <div className="ml-auto"> {/* Use ml-auto class to move the icon to the right */}
                                    <button className=''><IoAddCircleOutline /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        )
    );
}

export default CreateGroup;


// const alreadySelected = selectedUser.find(user => user._id === id);
// if (alreadySelected) {
//     return;
// }
// setSelectedUser([...selectedUser, props.chats.find(object => object._id === id)]);