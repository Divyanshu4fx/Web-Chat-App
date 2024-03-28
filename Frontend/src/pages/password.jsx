import React, { useState } from 'react'
import updatePassword from '../hooks/useUpdatePass';
import {Link} from "react-router-dom";
function PasswordRest() {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const { loading, handleReset } = updatePassword();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleReset(passwords);
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }
  return (
    <>
    <div className=' flex flex-col items-center p-5 backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <form className='flex flex-col ' onSubmit={handleSubmit}>
        <h1 className='text-center text-black text-3xl font-bold mb-2'>Password Reset</h1>
        <label className='label p-1 text-white'>Old Password </label>
        <input className='w-full input-bordered h-10 rounded p-3' placeholder='Enter Old Password' type='password' name="oldpassword" value={passwords.oldPassword} onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} />
        <label className='label p-1 text-md text-white'>New Password </label>
        <input className='w-full input-bordered h-10 rounded p-3' placeholder='Enter New Password' type='password' name="newPassword" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
        <label className='label p-1 text-md text-white'>Confirm New Password </label>
        <input className='w-full input-bordered h-10 rounded p-3' placeholder='Enter Confirm Password' type='password' name="confirmPassword" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} />
        <button type='submit' className='text-lg font-bold text-white bg-green-700 hover:bg-green-500 mt-2 rounded-md' >Confirm</button>
      </form>
        <Link to="/" className="px-1 py-1 w-1/2 inline font-bold mt-2  rounded-lg text-center text-white bg-blue-700 hover:bg-blue-400">Home</Link>
    </div>
    </>
  )
}

export default PasswordRest;
