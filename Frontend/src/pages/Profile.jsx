import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { Form, Input, Radio } from "antd";
// import toast from "react-hot-toast";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import useUpdateProfile from "../hooks/useUpdateProfile.js";
import useUpdateData from "../hooks/useUpdateData.js";
function Profile() {
    const { authUser } = useAuthContext();
    const [user, setUser] = useState(authUser);
    const [editMode, setEditMode] = useState(false);
    const { loadingI,handleUpload } = useUpdateProfile();
    const {loadingD,handleData} = useUpdateData();
    const handlePhotoUpload = async (e) => {
        e.preventDefault();
        await handleUpload(e);
        location.reload();
    }
    const handleDataUpdate = async (formData) => {
        // setUser(formData);
        console.log(formData);
        await handleData(formData);
        location.reload();
    }
    return (
        <div className="flex flex-row h-full bg-opacity-0 rounded-2xl backdrop-filter backdrop-blur-lg">
            <Link to='/' className="block p-4 m-4 bg-blue-700 border rounded-full h-fit"><IoMdHome/></Link>
            <div className="flex flex-col items-center justify-center p-5 text-black border-r-2">
            <h1 className="p-2 text-2xl font-bold text-center">My Profile</h1>
                <form  encType="multipart/form-data" onSubmit={handlePhotoUpload} className="flex flex-col">
                    <div className="relative">
                    <img src={user.profilePic} alt="Profile Image" className="rounded-full max-w-24" />
                    {editMode && (
                        <label htmlFor="photo" className="cursor-pointer">
                            <BsPencilSquare className="absolute bottom-0 right-0" />
                        </label>
                    )}
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        name="profileImage"
                        id="photo"
                        accept=".jpg, .jpeg, .png"
                        />
                        {editMode && (<button type="submit" className="bg-blue-700 text-white text-base font-bold p-1 rounded-lg mt-2 px-1.5 hover:bg-white hover:text-blue-700">{loadingI ? <span className="loading loading-spinner"></span> : "Submit"}</button>)}
                </form>
                {!editMode && (
                    <>
                        <div className="flex-col">{user.fullname}</div>
                        <div className="flex-col">{user.username}</div>
                    </>
                )}
            </div>
            <div className="flex flex-col items-center justify-center flex-1 p-5">
                {!editMode && (
                    <button
                        className="px-2 m-4 font-bold text-white bg-blue-400 border rounded roundedbg-blue-500 hover:bg-blue-700"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </button>
                )}
                {editMode && (
                    <Form initialValues={{ ...user }} onFinish={handleDataUpdate}>
                        <Form.Item label="Full Name" name="fullname" >
                            <Input type="text" required placeholder="Enter Full Name" />
                        </Form.Item>
                        <Form.Item label="Username" name="username" >
                            <Input type="text" required placeholder="Enter Username" />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender" >
                            <Radio.Group buttonStyle="solid" required>
                                <Radio.Button value="male">Male</Radio.Button>
                                <Radio.Button value="female">Female</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <button
                            className="px-4 py-2 m-4 font-bold text-white bg-blue-400 border rounded roundedbg-blue-500 hover:bg-blue-700"
                            type="submit"
                        >
                           { loadingD ? <span className="loading loading-spinner"></span> :  "Save Changes"} 
                        </button>
                        <button
                            className="px-4 py-2 m-4 font-bold text-white bg-gray-400 border rounded roundedbg-gray-500 hover:bg-gray-700"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                    </Form>
                )}
                <Link
                    to="/reset"
                    className="inline px-4 py-2 font-bold text-white bg-blue-400 hover:bg-blue-700"
                >
                    Change Password
                </Link>
            </div>
        </div>
    );
}

export default Profile;
