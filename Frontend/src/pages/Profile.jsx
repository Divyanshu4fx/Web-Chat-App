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
  console.log(user);
  const [editMode, setEditMode] = useState(false);
  const { loadingI, handleUpload } = useUpdateProfile();
  const { loadingD, handleData } = useUpdateData();
  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    await handleUpload(e);
    location.reload();
  };
  const handleDataUpdate = async (formData) => {
    await handleData(formData);
    location.reload();
  };
  return (
    <div className="flex flex-row h-full w-2/3 bg-opacity-0 border-2 border-white rounded-2xl shadow-md shadow-black backdrop-filter backdrop-blur-lg">
      <div className="flex flex-col border-r-2 border-white w-5/12">
        <Link
          to="/"
          className="p-2 m-4 bg-rose-500 border-2 border-white border rounded-full h-fit w-fit scale-150 text-white hover:text-black hover:border-black"
        >
          <IoMdHome />
        </Link>
        {/* <div className="p-4 m-4 bg-gradient-to-r from-purple-500 to-pink-500 border rounded-full h-14 w-14"></div> */}
        <div className="flex flex-col items-center justify-center p-5 text-black">
          <h1 className="p-2 mb-2 text-4xl font-bold text-center ">My Profile</h1>
          <form
            encType="multipart/form-data"
            onSubmit={handlePhotoUpload}
            className="flex flex-col"
          >
            <div className="relative m-2">
              <img
                src={user.profilePic}
                alt="Profile Image"
                className="rounded-full w-24 h-24 border-2 border-black"
              />
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
            {editMode && (
              <button
                type="submit"
                className="bg-violet-800 text-white text-lg font-bold p-2 shadow-md shadow-black rounded-lg mt-4 hover:bg-white hover:text-violet-800"
              >
                {loadingI ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </form>
          {!editMode && (
            <>
              <div className="flex-col text-3xl">{user.fullname}</div>
              <div className="flex-col text-2xl">@{user.username}</div>
			        <div className="flex-col text-1xl underline">{user.email}</div>         {/*to be checked later*/}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-5">
        {!editMode && (
          <button
            className="px-5 py-3 m-6 text-2xl font-bold text-white shadow-md shadow-black rounded-lg bg-red-500 hover:bg-rose-700"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
        {editMode && (
          <Form initialValues={{ ...user }} onFinish={handleDataUpdate} className="text-xl text-black">
            <Form.Item label="Full Name" name="fullname">
              <Input type="text" required placeholder="Enter Full Name" />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input type="text" required placeholder="Enter Username" />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group buttonStyle="solid" required>
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <button
              className="px-4 py-2 m-4 font-bold text-white bg-violet-800 shadow-md shadow-black rounded-lg hover:text-violet-800 hover:bg-white"
              type="submit"
            >
              {loadingD ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              className="px-4 py-2 m-4 font-bold text-white bg-neutral-800 border-2 shadow-md shadow-black border-black rounded-lg roundedbg-gray-500 hover:text-neutral-800 hover:bg-white"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </Form>
        )}
        <Link
          to="/reset"
          className="inline px-4 py-2 m-4 font-bold text-2xl text-white bg-red-500 hover:bg-rose-700 rounded-lg shadow-md shadow-black "
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}

export default Profile;
