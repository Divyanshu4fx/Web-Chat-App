import React, { useState } from "react";
import updatePassword from "../hooks/useUpdatePass";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
function PasswordRest() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { loading, handleReset } = updatePassword();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleReset(passwords);
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  return (
    <>
      <div className=" flex flex-col p-5 w-5/12 border-2 border-white rounded-xl shadow-md shadow-black backdrop-filter backdrop-blur-xl bg-opacity-0">
        <Link
          to="/"
          className="p-2 m-4 bg-violet-800 border-2 border-white border-dashed rounded-full h-fit w-fit scale-150 text-white hover:text-black hover:border-black"
        >
          <IoMdHome />
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="text-center text-black text-4xl font-bold mb-8 underline">
            Password Reset
          </h1>
          <form className="flex flex-col " onSubmit={handleSubmit}>
            <div className="my-1">
              <label className="label p-2 text-white font-semibold text-xl">
                Old Password :
              </label>
              <input
                className="w-full input-bordered h-10 rounded p-3"
                placeholder="Enter Old Password"
                type="password"
                name="oldpassword"
                value={passwords.oldPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, oldPassword: e.target.value })
                }
              />
            </div>
            <div className="my-1">
              <label className="label p-2 text-white font-semibold text-xl">
                New Password :
              </label>
              <input
                className="w-full input-bordered h-10 rounded p-3"
                placeholder="Enter New Password"
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
            </div>
            <div className="my-1">
              <label className="label p-2 text-white font-semibold text-xl">
                Confirm New Password :
              </label>
              <input
                className="w-full input-bordered h-10 rounded p-3"
                placeholder="Enter Confirm Password"
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center items-center mt-8">
              <button
                type="submit"
                className="text-2xl py-2 mb-4 w-4/5 font-semibold text-white bg-red-500 hover:bg-green-500 rounded-full border-2 border-black"
              >
                Confirm
              </button>
            </div>
          </form>
          {/* <Link
            to="/"
            className="px-1 py-1 w-1/2 inline font-bold mt-2 rounded-lg text-center text-white bg-blue-700 hover:bg-blue-400"
          >
            Home
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default PasswordRest;
